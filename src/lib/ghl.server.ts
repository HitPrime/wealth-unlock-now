// GoHighLevel (LeadConnector) REST helpers. Uses plain fetch so it builds and runs on
// the Cloudflare Workers target (the MCP SDK does not). Carries a private token, so it
// must only ever execute on the server.

const GHL_API = "https://services.leadconnectorhq.com";
const GHL_VERSION = "2021-07-28";
const STARTER_KIT_TAG = "tradingkit";

if (typeof window !== "undefined") {
  throw new Error("ghl.server.ts must never run in the browser.");
}

function getCredentials() {
  const token = process.env.GHL_MCP_PIT;
  const locationId = process.env.GHL_MCP_LOCATION_ID;
  if (!token || !locationId) {
    throw new Error(
      "GHL credentials missing. Set GHL_MCP_PIT and GHL_MCP_LOCATION_ID in the environment.",
    );
  }
  return { token, locationId };
}

async function ghlPost(
  path: string,
  token: string,
  body: Record<string, unknown>,
): Promise<Record<string, unknown>> {
  const res = await fetch(`${GHL_API}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Version: GHL_VERSION,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  let json: Record<string, unknown> = {};
  try {
    json = text ? (JSON.parse(text) as Record<string, unknown>) : {};
  } catch {
    json = { raw: text };
  }
  if (!res.ok) {
    throw new Error(`GHL ${path} failed: ${res.status} ${JSON.stringify(json).slice(0, 400)}`);
  }
  return json;
}

export interface ContactFields {
  firstName?: string;
  lastName?: string;
  email: string;
  country?: string;
  source?: string;
}

// Create or update a contact (GHL de-dupes by email) and return its id.
async function upsertContact(
  token: string,
  locationId: string,
  fields: ContactFields,
): Promise<string> {
  const upsert = await ghlPost("/contacts/upsert", token, { locationId, ...fields });
  const contact = (upsert.contact ?? {}) as Record<string, unknown>;
  const contactId = (contact.id ?? contact._id) as string | undefined;
  if (!contactId) {
    throw new Error(`No contact id in upsert response: ${JSON.stringify(upsert).slice(0, 400)}`);
  }
  return contactId;
}

// Append tags (does not overwrite existing ones).
async function addTags(token: string, contactId: string, tags: string[]): Promise<void> {
  if (tags.length === 0) return;
  await ghlPost(`/contacts/${contactId}/tags`, token, { tags });
}

// Starter Kit modal opt-in (name + email only).
export async function tagStarterKitLead(lead: {
  name: string;
  email: string;
}): Promise<{ contactId: string }> {
  const { token, locationId } = getCredentials();
  const contactId = await upsertContact(token, locationId, {
    firstName: lead.name,
    email: lead.email,
    source: "Trading Starter Kit landing page",
  });
  await addTags(token, contactId, [STARTER_KIT_TAG]);
  return { contactId };
}

// Lead Magnet Step 1: capture the contact and fire the kit-delivery workflow.
export async function captureLeadMagnet(lead: {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
}): Promise<{ contactId: string }> {
  const { token, locationId } = getCredentials();
  const contactId = await upsertContact(token, locationId, {
    firstName: lead.firstName,
    lastName: lead.lastName,
    email: lead.email,
    country: lead.country,
    source: "Lead Magnet opt-in",
  });
  await addTags(token, contactId, [STARTER_KIT_TAG]);
  return { contactId };
}

// Lead Magnet Step 2: enrich the same contact with trader-profile segment tags.
export async function addProfileTags(contactId: string, tags: string[]): Promise<void> {
  const { token } = getCredentials();
  await addTags(token, contactId, tags);
}

// Waitlist capture for not-yet-purchasable offers (VIP, merch, Swell Point).
export async function captureInterest(email: string, tag: string): Promise<void> {
  const { token, locationId } = getCredentials();
  const contactId = await upsertContact(token, locationId, { email, source: `Interest: ${tag}` });
  await addTags(token, contactId, [tag]);
}

// Swell Point buy-page capture (pre-Stripe). The TradingView username + referral are kept in
// `source` so nothing is lost before proper fulfillment fields exist.
export async function captureSwellPoint(input: {
  email: string;
  tradingViewUsername: string;
  referralCode?: string;
}): Promise<void> {
  const { token, locationId } = getCredentials();
  const parts = ["Swell Point", `TV: ${input.tradingViewUsername}`];
  if (input.referralCode) parts.push(`ref: ${input.referralCode}`);
  const contactId = await upsertContact(token, locationId, {
    email: input.email,
    source: parts.join(" | "),
  });
  await addTags(token, contactId, ["swellpoint-interest"]);
}

// Admin: upsert a single contact with optional tags.
export async function adminUpsertContact(input: {
  email: string;
  firstName?: string;
  lastName?: string;
  tags?: string[];
}): Promise<void> {
  const { token, locationId } = getCredentials();
  const contactId = await upsertContact(token, locationId, {
    email: input.email,
    firstName: input.firstName,
    lastName: input.lastName,
    source: "Admin import",
  });
  await addTags(token, contactId, input.tags ?? []);
}
