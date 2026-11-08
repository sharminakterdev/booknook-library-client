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
  const res = await fetch("http://localhost:8000/all-book");

  if (!res.ok) {
    throw new Error("Failed to fetch books");
  }

  const data: Book[] = await res.json();

  return (
    <section className="min-h-screen bg-[#F7F7F0] px-4 py-16 md:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[3px] text-[#A58B54]">
            Explore Our Collection
          </p>

          <h1 className="text-4xl font-bold text-[#153D35] md:text-5xl">
            Discover Your Next Read
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-gray-500">
            Explore our collection of books and find your next favorite story.
          </p>

          <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-[#C5A66B]" />
        </div>

        {/* Book Count */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#153D35]">
            All Books
          </h2>

          <span className="rounded-full bg-[#E5EDE8] px-4 py-2 text-sm font-semibold text-[#153D35]">
            {data.length} Books Found
          </span>
        </div>

        {/* Book Cards */}
        {data.length === 0 ? (
          <div className="rounded-2xl bg-white py-20 text-center">
            <h3 className="text-2xl font-bold text-[#153D35]">
              No Books Found
            </h3>
            <p className="mt-2 text-gray-500">
              Please check back later for new books.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data.map((book) => (
              <div
                key={book._id}
                className="group overflow-hidden rounded-2xl border border-[#E8E5DA] bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                {/* Cover Image */}
                <div className="relative flex h-64 items-center justify-center overflow-hidden bg-[#F0F0E8] p-5">
                  {book.coverImage ? (
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="h-full w-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="text-gray-400">No Cover Available</div>
                  )}

                  <span className="absolute left-4 top-4 rounded-full bg-[#153D35] px-3 py-1.5 text-xs font-semibold text-white">
                    {book.category}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-5">
                  <h3 className="mb-2 line-clamp-1 text-lg font-bold text-[#153D35] transition-colors group-hover:text-[#B18A4A]">
                    {book.title}
                  </h3>

                  <p className="mb-4 text-sm text-gray-500">
                    By {book.author}
                  </p>

                  <div className="mb-5 flex items-center justify-between border-t border-gray-100 pt-4">
                    <span className="text-sm text-gray-500">
                      Total Copies
                    </span>

                    <span className="font-bold text-[#153D35]">
                      {book.totalCopies}
                    </span>
                  </div>

                  <Link
                    href={`/all-books/${book._id}`}
                    className="block w-full rounded-xl bg-[#153D35] py-3 text-center text-sm font-semibold text-white transition-all hover:bg-[#B18A4A]"
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
