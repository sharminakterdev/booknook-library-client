// import React from 'react';

// const AllBook = async () => {
//     const res=await fetch('http://localhost:8000/all-book')
//     const data=await res.json()
//     console.log(data)

//     return (
//         <div>
           
            
//         </div>
//     );
// };

// export default AllBook;

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server"; // connection() ব্যবহার করা হয়েছে

interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  coverImage: string;
  totalCopies: number;
  availableCopies?: number;
  description?: string;
}

const AllBook = async () => {
  // এটি পেজটিকে ডায়নামিক রেন্ডার করতে সাহায্য করবে (cacheComponents এর সাথে সামঞ্জস্যপূর্ণ)
  await connection();

  const res = await fetch("http://localhost:8000/books", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch books");
  }

  const data: Book[] = await res.json();

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-[#FAF8F5] via-[#F4F0E8] to-[#EFECE4] px-4 py-20 md:px-8">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-[#153D35]/5 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-14 text-center">
          <span className="inline-block rounded-full bg-[#153D35]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[3px] text-[#153D35]">
            Explore Our Collection
          </span>

          <h1 className="mt-4 text-4xl font-extrabold text-[#153D35] md:text-5xl lg:text-6xl">
            Discover Your Next Read
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-base text-gray-600 md:text-lg">
            Explore our curated selection of books and find your next favorite story.
          </p>

          <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-[#A58B54] to-[#C5A66B]" />
        </div>

        {/* Book Count Bar */}
        <div className="mb-8 flex items-center justify-between rounded-2xl border border-[#E8E2D2] bg-white/70 px-6 py-4 shadow-sm backdrop-blur-md">
          <h2 className="text-xl font-bold text-[#153D35]">All Books</h2>

          <span className="rounded-full bg-[#153D35] px-4 py-1.5 text-xs font-bold tracking-wider text-white">
            {data.length} {data.length === 1 ? "Book Found" : "Books Found"}
          </span>
        </div>

        {/* Book Cards Grid */}
        {data.length === 0 ? (
          <div className="rounded-3xl border border-[#E8E2D2] bg-white/80 py-24 text-center shadow-sm backdrop-blur-md">
            <h3 className="text-2xl font-bold text-[#153D35]">No Books Found</h3>
            <p className="mt-2 text-gray-500">
              Please check back later for new additions to our collection.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data.map((book) => (
              <div
                key={book._id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#E8E2D2] bg-white p-5 shadow-lg shadow-[#153D35]/5 transition-all duration-500 hover:-translate-y-2 hover:border-[#A58B54]/50 hover:shadow-2xl hover:shadow-[#153D35]/15"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative flex h-72 w-full items-center justify-center overflow-hidden rounded-2xl bg-[#FAF8F5]">
                    {book.coverImage ? (
                      <Image
                        src={book.coverImage}
                        alt={book.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="text-sm font-medium text-gray-400">
                        No Cover Available
                      </div>
                    )}

                    {/* Category Badge */}
                    <span className="absolute left-3 top-3 rounded-full bg-[#153D35]/90 px-3 py-1 text-[11px] font-semibold text-white shadow-sm backdrop-blur-md">
                      {book.category}
                    </span>
                  </div>

                  {/* Card Main Info */}
                  <div className="mt-5">
                    <h3 className="line-clamp-1 text-lg font-bold text-[#153D35] transition-colors group-hover:text-[#A58B54]">
                      {book.title}
                    </h3>

                    <p className="mt-1 text-sm font-medium text-gray-500">
                      By {book.author}
                    </p>
                  </div>
                </div>

                {/* Copies & Action Button */}
                <div className="mt-6">
                  <div className="mb-4 flex items-center justify-between border-t border-gray-100 pt-4 text-xs font-semibold">
                    <span className="text-gray-400 uppercase tracking-wider">
                      Total Copies
                    </span>
                    <span className="rounded-md bg-[#FAF8F5] px-2.5 py-1 text-sm font-bold text-[#153D35]">
                      {book.totalCopies}
                    </span>
                  </div>

                  <Link
                    href={`/books/${book._id}`}
                    className="flex w-full items-center justify-center rounded-xl bg-[#153D35] py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-[#A58B54] hover:shadow-lg hover:shadow-[#A58B54]/20"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AllBook;