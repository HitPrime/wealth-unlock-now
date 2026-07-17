// The 6-step value ladder shown on /offers. Copy is education/tools framed, no income claims.
export interface LadderStep {
  step: number;
  name: string;
  price: string;
  tagline: string;
  points: string[];
  cta: { label: string; href?: string; soon?: boolean };
}

export const VALUE_LADDER: LadderStep[] = [
  {
    step: 1,
    name: "The Trading Starter Kit",
    price: "Free",
    tagline: "Start here. Three downloads to get you oriented. No card required.",
    points: [
      "The Trader's Blueprint",
      "The Trading Commandments + Glossary",
      "The First Trade Walkthrough",
    ],
    cta: { label: "Get the free kit", href: "/unlock" },
  },
  {
    step: 2,
    name: "Trading Fast-Start",
    price: "$17",
    tagline: "A short video course that gets your platforms set up and your first chart read.",
    points: [
      "Set up TradingView and add free indicators",
      "Read your first candlestick chart",
      "Get going on a prop firm and a leverage platform",
      "Move crypto: wallets, exchanges, the basics",
    ],
    cta: { label: "Coming soon", soon: true },
  },
  {
    step: 3,
    name: "Swell Point Indicator",
    price: "$199",
    tagline: "A proprietary professional indicator for TradingView, with built-in referral rewards.",
    points: [
      "Professional indicator on your TradingView charts",
      "Earn 10% cash back when someone uses your referral code",
      "Your referrals get 5% off at checkout",
    ],
    cta: { label: "Get Swell Point", href: "/swell-point" },
  },
  {
    step: 4,
    name: "Full Trading Course",
    price: "$999",
    tagline: "The end-to-end education: setup, tools, exchanges, and strategy.",
    points: [
      "Broker and platform setup, start to finish",
      "Swell Point and other indicators in depth",
      "Best exchanges and prop firms",
      "Strategy courses",
    ],
    cta: { label: "Coming soon", soon: true },
  },
  {
    step: 5,
    name: "VIP Membership",
    price: "$49/mo",
    tagline: "Stay close to the work with live setups and direct access.",
    points: [
      "Live trade setups",
      "Prediction market picks (Polymarket / Kalshi)",
      "Q&A and direct access to Cassius",
    ],
    cta: { label: "See the VIP Zone", href: "/vip" },
  },
  {
    step: 6,
    name: "1-on-1 Consulting",
    price: "$500/hr",
    tagline: "The highest-touch option: custom strategy sessions over Zoom.",
    points: ["Custom, one-on-one strategy sessions", "Book a time that works for you"],
    cta: { label: "Coming soon", soon: true },
  },
];
