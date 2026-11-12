// import Image from 'next/image';
// import React from 'react';

// const DetailPage = async({params}) => {
// const {id}=await params
// const res=await fetch(`http://localhost:8000/books/${id}`)
// const book =await res.json()
//     return (
//         <div>
//             <div>
// <Image
//         src={book.coverImage}
//         alt=""
//         height={400}
//         width={400}
//       />

//             </div>
//         </div>
//     );
// };

// export default DetailPage ;
import Image from "next/image";
import BorrowButton from "@/components/books/BorrowButton";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  coverImage: string;
  description: string;
  totalCopies: number;
  availableCopies?: number;
}

const DetailPage = async ({ params }: Props) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:8000/books/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch book details");
  }

  const rawBook = await res.json();

const book: Book = {
  ...rawBook,
  totalCopies: Number(rawBook.totalCopies),
  availableCopies: Number(
    rawBook.availableCopies ?? rawBook.totalCopies
  ),
};

  return (
    <div className="min-h-screen bg-[#F7F7F0] px-5 py-12">
      <div className="mx-auto max-w-5xl rounded-3xl bg-white p-6 shadow-lg md:p-10">
        <div className="grid items-center gap-10 md:grid-cols-2">

          {/* Book Image */}
          <div className="flex justify-center rounded-2xl bg-[#F7F7F0] p-8">
            <Image
              src={book.coverImage}
              alt={book.title}
              width={350}
              height={450}
              className="max-h-[450px] rounded-xl object-contain shadow-md"
            />
          </div>

          {/* Book Information */}
          <div>
            <span className="rounded-full bg-[#E8EFE9] px-4 py-2 text-sm font-semibold text-[#153D35]">
              {book.category}
            </span>

            <h1 className="mt-6 text-3xl font-bold text-[#153D35] md:text-4xl">
              {book.title}
            </h1>

            <p className="mt-4 text-lg text-gray-600">
              By{" "}
              <span className="font-semibold text-[#153D35]">
                {book.author}
              </span>
            </p>

            <div className="my-6 h-px bg-gray-200" />

            <h2 className="mb-3 text-lg font-bold text-[#153D35]">
              About This Book
            </h2>

            <p className="leading-8 text-gray-600">
              {book.description}
            </p>

            <div className="mt-6 space-y-3 text-sm text-gray-600">
              <p>
                <span className="font-semibold text-[#153D35]">
                  Total Copies:
                </span>{" "}
                {book.totalCopies}
              </p>

              <p>
                <span className="font-semibold text-[#153D35]">
                  Available Copies:
                </span>{" "}
                {book.availableCopies ?? book.totalCopies}
              </p>
            </div>

            {/* Borrow Button & Modal */}
            <BorrowButton book={book} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;