import fs from "fs";
import path from "path";
import { execFileSync } from "child_process";

// ─── Config ──────────────────────────────────────────────────────────────────
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const SITE_URL     = "https://www.cassiuscuvee.com";
// Commit before this push (github.event.before). Used to spot legal text that changed
// without a new "Last Updated" date. Empty or all zeros = no previous commit to compare.
const BEFORE_SHA   = process.env.BEFORE_SHA || "";

// Problems that must not pass silently. The workflow fails (red X + GitHub email)
// when any are found, so a missed date never goes unnoticed.
const problems = [];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function extractDateFrom(content) {
  // Match "Last Updated:</strong> Month D, YYYY"
  const match = content.match(/Last Updated.*?>\s*([\w]+ \d+, \d+)/);
  return match ? match[1].trim() : null;
}

function extractDate(filePath) {
  return extractDateFrom(fs.readFileSync(filePath, "utf8"));
}

// The visible legal text only (from Section 1 to the end, JSX tags removed), so edits to
// SEO tags, styling or code don't count as a change to the terms themselves.
function legalText(content) {
  const i = content.indexOf('id="section-1"');
  if (i < 0) return null;
  return content
    .slice(i)
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/\{" "\}/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function previousVersion(filePath) {
  if (!BEFORE_SHA || /^0+$/.test(BEFORE_SHA)) return null;
  try {
    return execFileSync("git", ["show", `${BEFORE_SHA}:${filePath}`], { encoding: "utf8" });
  } catch {
    return null; // file didn't exist before this push
  }
}

// Fails the run if the legal text changed but "Last Updated" did not.
function checkDateWasUpdated(filePath, label, currentDate) {
  const before = previousVersion(filePath);
  if (!before) return;
  const now = fs.readFileSync(filePath, "utf8");
  const textChanged = legalText(before) !== legalText(now);
  if (textChanged && extractDateFrom(before) === currentDate) {
    problems.push(
      `${label}: the text changed but "Last Updated" is still "${currentDate}". ` +
        `Change the date to today's date (e.g. "November 20, 2026") and push again, ` +
        `otherwise no archive is made and forms keep recording the old version.`,
    );
  }
}

function dateToSlug(dateStr) {
  // "October 12, 2026" → "20261012"
  const d = new Date(dateStr);
  if (isNaN(d)) return null;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}${m}${day}`;
}

function archiveExists(slug, doc) {
  return fs.existsSync(path.join("src/routes", `${doc}-v${slug}.tsx`));
}

function createArchive(doc, slug, sourceFile) {
  const content = fs.readFileSync(sourceFile, "utf8");
  const archiveName = `${doc}-v${slug}`;
  const routePath   = `/${archiveName}`;
  const fnName      = doc === "terms" ? `TermsPageV${slug}` : `PrivacyPageV${slug}`;
  const tocFn       = doc === "terms" ? `TocSidebarV${slug}` : `TocSidebarV${slug}`;
  const tocMFn      = doc === "terms" ? `TocMobileV${slug}` : `TocMobileV${slug}`;

  // Replace route, component name, noindex, add banner
  let archive = content
    .replace(/createFileRoute\("\/terms"\)/, `createFileRoute("${routePath}")`)
    .replace(/createFileRoute\("\/privacy"\)/, `createFileRoute("${routePath}")`)
    .replace(/component: TermsPage/, `component: ${fnName}`)
    .replace(/component: PrivacyPage/, `component: ${fnName}`)
    .replace(/"index, follow"/, '"noindex"')
    .replace(/function TermsPage\(\)/, `function ${fnName}()`)
    .replace(/function PrivacyPage\(\)/, `function ${fnName}()`)
    .replace(/function TocSidebar\(\)/, `function ${tocFn}()`)
    .replace(/<TocSidebar \/>/, `<${tocFn} />`)
    .replace(/function TocMobile\(\)/, `function ${tocMFn}()`)
    .replace(/<TocMobile \/>/, `<${tocMFn} />`);

  // Add archive banner after first <div id="top"
  const banner = `
      {/* Archive banner */}
      <div className="bg-yellow-500/10 border-b border-yellow-500/30 px-6 py-3 text-center">
        <p className="text-sm text-yellow-300/90">
          <strong>Archived Version</strong> &mdash; ${doc === "terms" ? "Terms and Conditions" : "Privacy Policy"} as of <strong>${slug.slice(0,4)}-${slug.slice(4,6)}-${slug.slice(6,8)}</strong>.{" "}
          <a href="/${doc}" className="underline underline-offset-2 hover:text-yellow-200">View current &rarr;</a>
        </p>
      </div>`;

  archive = archive.replace(
    '<div id="top" className="min-h-screen bg-background text-foreground">',
    `<div id="top" className="min-h-screen bg-background text-foreground">${banner}`
  );

  const outPath = path.join("src/routes", `${archiveName}.tsx`);
  fs.writeFileSync(outPath, archive, "utf8");
  console.log(`Created archive: ${outPath}`);
  return routePath;
}

async function updateSupabase(doc, versionDate, archiveUrl, liveUrl) {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.log("No Supabase credentials — skipping DB update");
    return;
  }

  // Upsert into legal_versions table. A network error here must not stop the archive
  // pages and api/legal-version.ts from being updated, so it is caught and logged.
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/legal_versions`, {
      method: "POST",
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        "Prefer": "resolution=merge-duplicates",
      },
      body: JSON.stringify({
        document: doc,
        version_date: versionDate,
        archive_url: archiveUrl,
        live_url: liveUrl,
      }),
    });

    if (res.ok) {
      console.log(`Supabase updated for ${doc}: ${archiveUrl}`);
    } else {
      console.error(`Supabase error: ${await res.text()}`);
    }
  } catch (err) {
    console.error(`Supabase request failed for ${doc}: ${err.message}`);
  }
}

function updateLegalVersion(termsDate, termsSlug, privacyDate, privacySlug) {
  const filePath = "api/legal-version.ts";
  const content = fs.readFileSync(filePath, "utf8");

  const updated = content
    .replace(/terms_version:\s*"[^"]*"/, `terms_version:       "${termsDate}"`)
    .replace(/terms_archive_url:\s*"[^"]*"/, `terms_archive_url:   "${SITE_URL}/terms-v${termsSlug}"`)
    .replace(/privacy_archive_url:\s*"[^"]*"/, `privacy_archive_url: "${SITE_URL}/privacy-v${privacySlug}"`);

  fs.writeFileSync(filePath, updated, "utf8");
  console.log("Updated api/legal-version.ts");
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  let termsSlug = null, privacySlug = null;
  let termsDate = null, privacyDate = null;

  // Process terms
  const termsFile = "src/routes/terms.tsx";
  if (fs.existsSync(termsFile)) {
    termsDate = extractDate(termsFile);
    if (!termsDate || !dateToSlug(termsDate)) {
      problems.push(
        `Terms: could not read the "Last Updated" date. Write it exactly like "November 20, 2026" (month name, day, comma, year).`,
      );
    } else {
      checkDateWasUpdated(termsFile, "Terms", termsDate);
    }
    if (termsDate) {
      termsSlug = dateToSlug(termsDate);
      console.log(`Terms date: ${termsDate} → slug: ${termsSlug}`);

      if (termsSlug) {
        if (!archiveExists(termsSlug, "terms")) {
          createArchive("terms", termsSlug, termsFile);
        } else {
          console.log(`Terms archive already exists for ${termsSlug} — skipping file creation`);
        }
        // Always update Supabase and legal-version.ts
        await updateSupabase(
          "terms",
          termsDate,
          `${SITE_URL}/terms-v${termsSlug}`,
          `${SITE_URL}/terms`
        );
      }
    }
  }

  // Process privacy
  const privacyFile = "src/routes/privacy.tsx";
  if (fs.existsSync(privacyFile)) {
    privacyDate = extractDate(privacyFile);
    if (!privacyDate || !dateToSlug(privacyDate)) {
      problems.push(
        `Privacy: could not read the "Last Updated" date. Write it exactly like "November 20, 2026" (month name, day, comma, year).`,
      );
    } else {
      checkDateWasUpdated(privacyFile, "Privacy", privacyDate);
    }
    if (privacyDate) {
      privacySlug = dateToSlug(privacyDate);
      console.log(`Privacy date: ${privacyDate} → slug: ${privacySlug}`);

      if (privacySlug) {
        if (!archiveExists(privacySlug, "privacy")) {
          createArchive("privacy", privacySlug, privacyFile);
        } else {
          console.log(`Privacy archive already exists for ${privacySlug} — skipping file creation`);
        }
        // Always update Supabase and legal-version.ts
        await updateSupabase(
          "privacy",
          privacyDate,
          `${SITE_URL}/privacy-v${privacySlug}`,
          `${SITE_URL}/privacy`
        );
      }
    }
  }

  if (problems.length) {
    console.error("\n❌ Legal pages need attention:\n- " + problems.join("\n- "));
    // ::error:: shows the message on the GitHub Actions summary page.
    for (const p of problems) console.log(`::error::${p}`);
    process.exitCode = 1;
    return;
  }

  // Update legal-version.ts
  if (termsSlug && privacySlug) {
    updateLegalVersion(termsDate, termsSlug, privacyDate, privacySlug);
  }

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
