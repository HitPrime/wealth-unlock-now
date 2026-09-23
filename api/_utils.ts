/**
 * Returns today's date string (YYYY-MM-DD) in Pacific Time.
 * Automatically handles PDT (UTC-7, Mar–Nov) and PST (UTC-8, Nov–Mar).
 */
export function getPacificDate(): string {
  return new Date().toLocaleDateString("en-CA", {
    timeZone: "America/Los_Angeles",
  });
}
