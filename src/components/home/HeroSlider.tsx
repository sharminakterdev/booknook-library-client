import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import Link from 'next/link';
import { useRef } from 'react';

export function HeroSlider() {
  const swiperRef = useRef<any>(null);

  const prevSlide = () => {
    if (swiperRef.current) swiperRef.current.slidePrev();
  };

  const nextSlide = () => {
    if (swiperRef.current) swiperRef.current.slideNext();
  };

  return (
    <section className="relative overflow-hidden mb-12 max-w-7xl mx-auto">
      <Swiper
        ref={swiperRef}
        loop
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        spaceBetween={30}
        navigation={{ enabled: true }}
        pagination={{ clickable: true }}
        className="hero-slider"
      >
        {/* Slide 1 */}
        <SwiperSlide className="hero-slider__slide bg-teal-50 rounded-2xl p-8 shadow-2xl flex flex-col justify-center min-h-[460px] relative">
          <img
            src="https://picsum.photos/seed/book/1/800/500?random=1"
            alt="Curated collection of books"
            className="w-full h-48 object-cover rounded-xl mb-6 border-2 border-white/20"
          />
          <div className="flex flex-col items-center text-center max-w-2xl">
            <h2 className="text-5xl font-serif text-teal-900 mb-4 tracking-tighter">
              Discover Your Next Read
            </h2>
            <p className="text-teal-600 text-lg mb-8 leading-relaxed max-w-xl">
              Explore a curated collection of literary treasures handpicked for curious readers who appreciate timeless stories and fresh voices alike.
            </p>
            <Link
              href="/books"
              className="inline-block bg-teal-600 text-white font-medium rounded-full px-8 py-3 hover:bg-teal-500 transition-colors duration-200"
            >
              Browse Books
            </Link>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide className="hero-slider__slide bg-teal-50 rounded-2xl p-8 shadow-2xl flex flex-col justify-center min-h-[460px] relative">
          <img
            src="https://picsum.photos/seed/book/2/800/500?random=2"
            alt="Timeless classics on display"
            className="w-full h-48 object-cover rounded-xl mb-6 border-2 border-white/20"
          />
          <div className="flex flex-col items-center text-center max-w-2xl">
            <h2 className="text-5xl font-serif text-teal-900 mb-4 tracking-tighter">
              Timeless Classics
            </h2>
            <p className="text-teal-600 text-lg mb-8 leading-relaxed max-w-xl">
              From Austen to Hemingway, rediscover the stories that have shaped literature for generations and continue to inspire readers today.
            </p>
            <Link
              href="/books"
              className="inline-block bg-teal-600 text-white font-medium rounded-full px-8 py-3 hover:bg-teal-500 transition-colors duration-200"
            >
              Browse Books
            </Link>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide className="hero-slider__slide bg-teal-50 rounded-2xl p-8 shadow-2xl flex flex-col justify-center min-h-[460px] relative">
          <img
            src="https://picsum.photos/seed/book/3/800/500?random=3"
            alt="Modern authors and contemporary literature"
            className="w-full h-48 object-cover rounded-xl mb-6 border-2 border-white/20"
          />
          <div className="flex flex-col items-center text-center max-w-2xl">
            <h2 className="text-5xl font-serif text-teal-900 mb-4 tracking-tighter">
              Modern Voices
            </h2>
            <p className="text-teal-600 text-lg mb-8 leading-relaxed max-w-xl">
              Discover fresh perspectives from today's most exciting contemporary authors and literary innovators pushing boundaries.
            </p>
            <Link
              href="/books"
              className="inline-block bg-teal-600 text-white font-medium rounded-full px-8 py-3 hover:bg-teal-500 transition-colors duration-200"
            >
              Browse Books
            </Link>
          </div>
        </SwiperSlide>

        {/* Navigation arrows inside Swiper */}
        <div
          className="swiper-button-prev absolute top-1/2 -left-4 -translate-y-1/2 bg-teal-100 text-teal-600 rounded-full p-2 hover:bg-teal-200 transition-colors"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          ←
        </div>
        <div
          className="swiper-button-next absolute top-1/2 right-4 -translate-y-1/2 bg-teal-100 text-teal-600 rounded-full p-2 hover:bg-teal-200 transition-colors"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          →
        </div>
      </Swiper>
    </section>
  );
}