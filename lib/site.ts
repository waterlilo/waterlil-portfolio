export const site = {
  name: "Waterlil",
  tagline: "High-retention edits for creators & brands",
  heroHeadline: "Edits that feel expensive — and sell.",
  heroSub:
    "Short-form, long-form, reels, ads, YouTube. Clean pacing, sharp story, strong retention.",
  email: "waterlil@email.com",
  links: {
    telegram: "https://t.me/yourhandle",
    instagram: "https://instagram.com/yourhandle",
    x: "https://x.com/yourhandle"
  }
} as const;

export const softwareBadges = [
  "Premiere Pro",
  "After Effects",
  "Photoshop",
  "Blender"
] as const;

export type Category = "Long-form" | "Short-form" | "Ads / UGC" | "Motion / VFX";

export const categories: { id: "All" | Category; label: string }[] = [
  { id: "All", label: "All" },
  { id: "Long-form", label: "Long-form" },
  { id: "Short-form", label: "Short-form" },
  { id: "Ads / UGC", label: "Ads / UGC" },
  { id: "Motion / VFX", label: "Motion / VFX" }
];
