import { Camera, BookOpen, ChefHat, Search } from "lucide-react";

export const SITE_STATS = [
  { label: "Free Scans", val: "10/mo" },
  { label: "Recipes Generated", val: "1M+" },
  { label: "Cost to Start", val: "$0" },
  { label: "App Store Rating", val: "4.9" },
];

export const FEATURES = [
  {
    title: "Scan Your Pantry",
    description:
      "Photo recognition that actually works. Know what you have instantly.",
    icon: Camera,
    limit: "10 scans/mo free",
  },
  {
    title: "AI Chef Suggestions",
    description:
      "Turn random ingredients into a gourmet meal. Zero food waste.",
    icon: ChefHat,
    limit: "5 meals/mo free",
  },
  {
    title: "Search Any Dish",
    description:
      "Find any recipe instantly. Filter by cuisine, time, or dietary needs.",
    icon: Search,
    limit: "Unlimited searches",
  },
  {
    title: "Digital Cookbook",
    description: "Save your favorites. Export as PDF. Share with family.",
    icon: BookOpen,
    limit: "3 saves/mo free",
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: "01",
    title: "Scan",
    desc: "Point camera at fridge. AI identifies ingredients.",
  },
  {
    step: "02",
    title: "Select",
    desc: "Choose a generated recipe based on your mood.",
  },
  {
    step: "03",
    title: "Savor",
    desc: "Follow simple steps. Eat delicious food.",
  },
];

// Helper function for category emojis
export function getCategoryEmoji(category) {
  const emojiMap = {
    Beef: "🥩",
    Chicken: "🍗",
    Dessert: "🍰",
    Lamb: "🍖",
    Miscellaneous: "🍴",
    Pasta: "🍝",
    Pork: "🥓",
    Seafood: "🦐",
    Side: "🥗",
    Starter: "🥟",
    Vegan: "🥬",
    Vegetarian: "🥕",
    Breakfast: "🍳",
    Goat: "🐐",
  };
  return emojiMap[category] || "🍽️";
}

// Helper function for country flags
export const COUNTRY_FLAGS = [
  { country: "American", emoji: "🗽" },
  { country: "British", emoji: "👑" },
  { country: "Canadian", emoji: "🍁" },
  { country: "Chinese", emoji: "🐉" },
  { country: "Croatian", emoji: "⚽" },
  { country: "Dutch", emoji: "🌷" },
  { country: "Egyptian", emoji: "🐫" },
  { country: "Filipino", emoji: "🌴" },
  { country: "French", emoji: "🥐" },
  { country: "Greek", emoji: "🏛️" },
  { country: "Indian", emoji: "🪷" },
  { country: "Irish", emoji: "☘️" },
  { country: "Italian", emoji: "🍕" },
  { country: "Jamaican", emoji: "🌴" },
  { country: "Japanese", emoji: "🥢" },
  { country: "Kenyan", emoji: "🦒" },
  { country: "Malaysian", emoji: "🌺" },
  { country: "Mexican", emoji: "🌮" },
  { country: "Moroccan", emoji: "🕌" },
  { country: "Polish", emoji: "🦅" },
  { country: "Portuguese", emoji: "🚢" },
  { country: "Russian", emoji: "❄️" },
  { country: "Spanish", emoji: "💃" },
  { country: "Thai", emoji: "🛕" },
  { country: "Tunisian", emoji: "🏜️" },
  { country: "Turkish", emoji: "🧿" },
  { country: "Ukrainian", emoji: "🌻" },
  { country: "Vietnamese", emoji: "🍜" },
  { country: "Algerian", emoji: "🏜️" },
  { country: "Argentinian", emoji: "⚽" },
  { country: "Australian", emoji: "🦘" },
  { country: "Norwegian", emoji: "❄️" },
  { country: "Saudi Arabian", emoji: "🕋" },
  { country: "Slovakian", emoji: "🏔️" },
  { country: "Syrian", emoji: "🏛️" },
  { country: "Uruguayan", emoji: "⚽" },
  { country: "Venezuelan", emoji: "🌞" },
];

export function getCountryFlag(country) {
  const emojiMap = Object.fromEntries(
    COUNTRY_FLAGS.map((entry) => [entry.country, entry.emoji]),
  );

  return emojiMap[country] ?? "🌍";
}
