
import { HeroSlider } from "@/components/home/HeroSlider";
import NewArrivals from "@/components/home/NewArrivals";
// import WhyChooseUs from "@/components/home/WhyChooseUs";
// import HowBorrowingWorks from "@/components/home/HowBorrowingWorks";

interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  coverImage: string;
}

async function getLatestBooks(): Promise<Book[]> {
  try {
    const res = await fetch("http://localhost:8000/books/latest", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch latest books");
    }

    return await res.json();
  } catch (error) {
    console.error("Latest Books Error:", error);
    return [];
  }
}

export default async function Home() {
  const books = await getLatestBooks();

  return (
    <main>
      {/* Hero Banner */}
      <HeroSlider />

      {/* Dynamic New Arrivals */}
      <NewArrivals books={books} />

     

      
    </main>
  );
}
