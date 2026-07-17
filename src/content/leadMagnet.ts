// Data model for the Lead Magnet trader-profile step. Each option maps to a GHL tag
// so segments are immediately usable in workflows. The "goal" question is intentionally
// framed around learning and commitment, NOT income amounts, to keep the funnel ad-safe.

export interface ProfileOption {
  value: string;
  label: string;
  tag: string;
}

export interface ProfileQuestion {
  id: string;
  label: string;
  hint?: string;
  type: "single" | "multi";
  options: ProfileOption[];
}

export const TRADER_PROFILE: ProfileQuestion[] = [
  {
    id: "experience",
    label: "Experience level",
    type: "single",
    options: [
      { value: "none", label: "I have never traded anything in my life", tag: "exp-none" },
      {
        value: "no-ta",
        label: "I have some experience but never used technical analysis on a chart",
        tag: "exp-no-ta",
      },
      {
        value: "free-indicators",
        label: "I have looked at charts and used free indicators before",
        tag: "exp-free-indicators",
      },
      {
        value: "advanced",
        label: "I already know how to trade, I'm looking for advanced strategies",
        tag: "exp-advanced",
      },
    ],
  },
  {
    id: "goal",
    label: "What are you hoping to get out of this?",
    type: "single",
    options: [
      {
        value: "explore",
        label: "I just want to understand how trading actually works",
        tag: "goal-explore",
      },
      {
        value: "skill",
        label: "I want to build a real, repeatable skill on the side",
        tag: "goal-skill",
      },
      {
        value: "serious",
        label: "I want to get serious and treat this like a craft",
        tag: "goal-serious",
      },
      {
        value: "mastery",
        label: "I want to go as deep as it takes to master it",
        tag: "goal-mastery",
      },
    ],
  },
  {
    id: "age",
    label: "Age range",
    type: "single",
    options: [
      { value: "u21", label: "Under 21", tag: "age-under-21" },
      { value: "21-30", label: "21 to 30", tag: "age-21-30" },
      { value: "31-40", label: "31 to 40", tag: "age-31-40" },
      { value: "41-50", label: "41 to 50", tag: "age-41-50" },
      { value: "51+", label: "51+", tag: "age-51-plus" },
    ],
  },
  {
    id: "markets",
    label: "What do you want to trade?",
    hint: "Select all that apply",
    type: "multi",
    options: [
      { value: "crypto", label: "Crypto", tag: "trade-crypto" },
      { value: "stocks", label: "Stocks", tag: "trade-stocks" },
      { value: "unsure", label: "Not sure yet", tag: "trade-unsure" },
    ],
  },
  {
    id: "setup",
    label: "Current setup",
    hint: "Select all that apply",
    type: "multi",
    options: [
      { value: "tradingview", label: "I have a TradingView account", tag: "setup-tradingview" },
      { value: "coinbase", label: "I have a Coinbase account", tag: "setup-coinbase" },
      { value: "kraken", label: "I have a Kraken account", tag: "setup-kraken" },
      { value: "phemex", label: "I trade on Phemex", tag: "setup-phemex" },
      { value: "prop", label: "I use a prop firm", tag: "setup-prop-firm" },
      { value: "leverage", label: "I have a leverage trading platform", tag: "setup-leverage" },
      { value: "none", label: "None of the above", tag: "setup-none" },
    ],
  },
  {
    id: "hours",
    label: "How many hours per week can you dedicate?",
    type: "single",
    options: [
      { value: "lt5", label: "Less than 5 hours", tag: "hours-lt-5" },
      { value: "5-10", label: "5 to 10 hours", tag: "hours-5-10" },
      { value: "10-20", label: "10 to 20 hours", tag: "hours-10-20" },
      { value: "20+", label: "20+ hours", tag: "hours-20-plus" },
    ],
  },
  {
    id: "timeline",
    label: "How soon do you want to get going?",
    type: "single",
    options: [
      { value: "exploring", label: "I'm just exploring for now", tag: "time-exploring" },
      { value: "3mo", label: "Within the next 3 months", tag: "time-3-months" },
      { value: "now", label: "I'm ready to start immediately", tag: "time-immediate" },
    ],
  },
];

// Collect the GHL tags for the answers the user has selected.
export function collectProfileTags(
  answers: Record<string, string | string[]>,
): string[] {
  const tags: string[] = [];
  for (const question of TRADER_PROFILE) {
    const answer = answers[question.id];
    if (!answer) continue;
    const values = Array.isArray(answer) ? answer : [answer];
    for (const value of values) {
      const option = question.options.find((o) => o.value === value);
      if (option) tags.push(option.tag);
    }
  }
  return tags;
}
