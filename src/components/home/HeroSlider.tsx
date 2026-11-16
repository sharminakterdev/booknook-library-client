
"use client";

import dynamic from "next/dynamic";

const HeroSliderContent = dynamic(
  () => import("./HeroSliderContent"),
  {
    ssr: false,
    loading: () => (
      <section className="min-h-[480px] bg-[#153D35] md:min-h-[580px]" />
    ),
  }
);

export function HeroSlider() {
  return <HeroSliderContent />;
}
