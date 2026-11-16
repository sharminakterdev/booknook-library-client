
import { Suspense } from "react";
import { connection } from "next/server";

import { HeroSlider } from "@/components/home/HeroSlider";
import NewArrivals from "@/components/home/NewArrivals";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ReaderReviews from "@/components/home/ReaderReviews";

interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  coverImage: string;
}

async function getLatestBooks(): Promise<Book[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/books/latest`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch latest books");
    }

    return await res.json();
  } catch (error) {
    console.error("Latest Books Error:", error);
    return [];
  }
}

async function LatestBooksSection() {
  await connection();

  const books = await getLatestBooks();

  return <NewArrivals books={books} />;
}

export default function Home() {
  return (
    <main>
      <HeroSlider />

      <Suspense
        fallback={
          <section className="py-16 text-center">
            <p className="text-gray-500">Loading latest books...</p>
          </section>
        }
      >
        <LatestBooksSection />
      </Suspense>

      <WhyChooseUs />

      <ReaderReviews />
    </main>
  );
}


