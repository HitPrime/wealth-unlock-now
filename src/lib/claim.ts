import { createServerFn } from "@tanstack/react-start";

const EMAIL_RE = /.+@.+\..+/;
// Segment tags are generated from a fixed option list, so restrict to that shape as a guard.
const TAG_RE = /^[a-z0-9-]+$/;

export interface ClaimInput {
  name: string;
  email: string;
}

// Starter Kit modal opt-in.
export const claimStarterKit = createServerFn({ method: "POST" })
  .validator((input: ClaimInput): ClaimInput => {
    const name = input?.name?.trim() ?? "";
    const email = input?.email?.trim().toLowerCase() ?? "";
    if (!name) throw new Error("Name is required.");
    if (!EMAIL_RE.test(email)) throw new Error("A valid email is required.");
    return { name, email };
  })
  .handler(async ({ data }) => {
    const { tagStarterKitLead } = await import("./ghl.server");
    await tagStarterKitLead(data);
    return { ok: true as const };
  });

export interface LeadCaptureInput {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
}

// Lead Magnet Step 1: capture the contact immediately so a Step 2 drop-off is not lost.
export const captureLead = createServerFn({ method: "POST" })
  .validator((input: LeadCaptureInput): LeadCaptureInput => {
    const firstName = input?.firstName?.trim() ?? "";
    const lastName = input?.lastName?.trim() ?? "";
    const email = input?.email?.trim().toLowerCase() ?? "";
    const country = input?.country?.trim() ?? "";
    if (!firstName || !lastName) throw new Error("First and last name are required.");
    if (!EMAIL_RE.test(email)) throw new Error("A valid email is required.");
    if (!country) throw new Error("Country is required.");
    return { firstName, lastName, email, country };
  })
  .handler(async ({ data }) => {
    const { captureLeadMagnet } = await import("./ghl.server");
    return captureLeadMagnet(data);
  });

export interface ProfileInput {
  contactId: string;
  tags: string[];
}

// Lead Magnet Step 2: attach trader-profile segment tags to the captured contact.
export const saveTraderProfile = createServerFn({ method: "POST" })
  .validator((input: ProfileInput): ProfileInput => {
    const contactId = input?.contactId?.trim() ?? "";
    const tags = Array.isArray(input?.tags)
      ? input.tags.filter((t) => typeof t === "string" && TAG_RE.test(t))
      : [];
    if (!contactId) throw new Error("Missing contact reference.");
    return { contactId, tags };
  })
  .handler(async ({ data }) => {
    const { addProfileTags } = await import("./ghl.server");
    await addProfileTags(data.contactId, data.tags);
    return { ok: true as const };
  });

// Fixed whitelist so this public endpoint can only apply known interest tags.
const INTEREST_TAGS: Record<string, string> = {
  vip: "vip-interest",
  merch: "merch-interest",
  swellpoint: "swellpoint-interest",
};

export interface InterestInput {
  email: string;
  interest: string;
}

// Waitlist capture for offers that aren't purchasable yet.
export const captureInterest = createServerFn({ method: "POST" })
  .validator((input: InterestInput): InterestInput => {
    const email = input?.email?.trim().toLowerCase() ?? "";
    const interest = input?.interest ?? "";
    if (!EMAIL_RE.test(email)) throw new Error("A valid email is required.");
    if (!INTEREST_TAGS[interest]) throw new Error("Unknown interest.");
    return { email, interest };
  })
  .handler(async ({ data }) => {
    const { captureInterest: capture } = await import("./ghl.server");
    await capture(data.email, INTEREST_TAGS[data.interest]);
    return { ok: true as const };
  });

export interface SwellPointInput {
  email: string;
  tradingViewUsername: string;
  referralCode: string;
}

// Swell Point reservation (pre-Stripe): capture the buyer's email + TradingView username.
export const reserveSwellPoint = createServerFn({ method: "POST" })
  .validator((input: SwellPointInput): SwellPointInput => {
    const email = input?.email?.trim().toLowerCase() ?? "";
    const tradingViewUsername = (input?.tradingViewUsername ?? "").trim().slice(0, 80);
    const referralCode = (input?.referralCode ?? "").trim().slice(0, 40);
    if (!EMAIL_RE.test(email)) throw new Error("A valid email is required.");
    if (!tradingViewUsername) throw new Error("Your TradingView username is required.");
    return { email, tradingViewUsername, referralCode };
  })
  .handler(async ({ data }) => {
    const { captureSwellPoint } = await import("./ghl.server");
    await captureSwellPoint(data);
    return { ok: true as const };
  });

function sanitizeTags(raw: string): string[] {
  return raw
    .split(",")
    .map((t) => t.trim().toLowerCase().slice(0, 40))
    .filter(Boolean)
    .slice(0, 20);
}

function parseEmails(raw: string): string[] {
  const emails = raw
    .split(/[\s,;]+/)
    .map((e) => e.trim().toLowerCase())
    .filter((e) => EMAIL_RE.test(e));
  return Array.from(new Set(emails)).slice(0, 100);
}

export interface AdminAddInput {
  email: string;
  firstName: string;
  lastName: string;
  tags: string;
}

// Admin: add one contact to GHL. NOTE: currently unauthenticated by request.
export const adminAddContact = createServerFn({ method: "POST" })
  .validator((input: AdminAddInput) => {
    const email = input?.email?.trim().toLowerCase() ?? "";
    if (!EMAIL_RE.test(email)) throw new Error("A valid email is required.");
    return {
      email,
      firstName: (input?.firstName ?? "").trim().slice(0, 80),
      lastName: (input?.lastName ?? "").trim().slice(0, 80),
      tags: sanitizeTags(input?.tags ?? ""),
    };
  })
  .handler(async ({ data }) => {
    const { adminUpsertContact } = await import("./ghl.server");
    await adminUpsertContact({
      email: data.email,
      firstName: data.firstName || undefined,
      lastName: data.lastName || undefined,
      tags: data.tags,
    });
    return { ok: true as const };
  });

export interface AdminBulkInput {
  emails: string;
  tag: string;
}

// Admin: bulk-push a pasted list of emails to GHL (max 100 per run).
export const adminBulkAddContacts = createServerFn({ method: "POST" })
  .validator((input: AdminBulkInput) => ({
    emails: input?.emails ?? "",
    tag: (input?.tag ?? "").trim().toLowerCase().slice(0, 40),
  }))
  .handler(async ({ data }) => {
    const emails = parseEmails(data.emails);
    const tags = data.tag ? [data.tag] : [];
    const { adminUpsertContact } = await import("./ghl.server");
    let added = 0;
    let failed = 0;
    for (const email of emails) {
      try {
        await adminUpsertContact({ email, tags });
        added += 1;
      } catch {
        failed += 1;
      }
    }
    return { total: emails.length, added, failed };
  });
