"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slides = [
  {
    subtitle: "DISCOVER YOUR NEXT STORY",
    title: "Every Book Opens a New World",
    description:
      "Explore fascinating stories, discover new ideas, and find your next favorite book in our digital library.",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2000",
  },
  {
    subtitle: "A WORLD OF KNOWLEDGE",
    title: "Read More. Dream Bigger.",
    description:
      "Expand your knowledge and imagination with our collection of inspiring books and timeless stories.",
    image:
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=2000",
  },
  {
    subtitle: "YOUR NEXT FAVORITE BOOK",
    title: "Stories Worth Sharing",
    description:
      "Find meaningful stories, explore different categories, and make every reading moment special.",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=2000",
  },
];

export function HeroSlider() {
  return (
    <section className="w-full">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        loop
        pagination={{ clickable: true }}
        className="book-hero-swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative flex min-h-[480px] items-center bg-cover bg-center px-6 py-20 md:min-h-[580px] md:px-16 lg:px-24"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#102E25]/95 via-[#102E25]/75 to-[#102E25]/10" />

              <div className="relative z-10 max-w-2xl text-white">
                <p className="mb-5 text-sm font-semibold tracking-[4px] text-[#C5E5A0]">
                  {slide.subtitle}
                </p>

                <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
                  {slide.title}
                </h1>

                <p className="mb-9 max-w-xl text-base leading-8 text-gray-200 md:text-lg">
                  {slide.description}
                </p>

                <Link
                  href="/books"
                  className="inline-flex items-center gap-3 rounded-full bg-[#C5E5A0] px-8 py-4 font-semibold text-[#173C2D] transition hover:bg-white"
                >
                  Browse Books
                  <span>→</span>
                </Link>
              </div>

              <div className="absolute bottom-12 right-10 z-10 hidden text-7xl font-bold text-white/30 md:block">
                0{index + 1}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .book-hero-swiper .swiper-pagination {
          bottom: 25px !important;
        }

        .book-hero-swiper .swiper-pagination-bullet {
          width: 28px;
          height: 5px;
          border-radius: 10px;
          background: #ffffff;
          opacity: 0.5;
        }

        .book-hero-swiper .swiper-pagination-bullet-active {
          width: 45px;
          background: #c5e5a0;
          opacity: 1;
        }
      `}</style>
    </section>
  );
}