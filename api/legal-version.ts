export const config = { runtime: "edge" };

// ─── UPDATE THESE WHEN YOU PUBLISH A NEW VERSION ───────────────────────────
const CURRENT_VERSION = {
  terms_version:       "October 12, 2026",
  terms_url:           "https://www.cassiuscuvee.com/terms",
  terms_archive_url:   "https://www.cassiuscuvee.com/terms-v20261012",
  privacy_url:         "https://www.cassiuscuvee.com/privacy",
  privacy_archive_url: "https://www.cassiuscuvee.com/privacy-v20261012",
};
// ───────────────────────────────────────────────────────────────────────────

export default async function handler() {
  return new Response(JSON.stringify(CURRENT_VERSION), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-store",
    },
  });
}
