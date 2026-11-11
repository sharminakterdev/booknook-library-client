import Image from "next/image";
import Link from "next/link";

interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  coverImage: string;
}

interface Props {
  books: Book[];
}

const NewArrivals = ({ books }: Props) => {
  return (
    <section className="bg-[#F7F7F0] px-5 py-20">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-12 text-center">
          <p className="font-semibold uppercase tracking-[3px] text-[#A58B50]">
            Fresh From Our Library
          </p>

          <h2 className="mt-3 text-3xl font-bold text-[#153D35] md:text-4xl">
            New Arrivals
          </h2>

          <p className="mt-3 text-gray-500">
            Discover the latest additions to our collection.
          </p>
        </div>

        {/* Books */}
        {books.length === 0 ? (
          <div className="rounded-2xl bg-white py-16 text-center text-gray-500">
            No books available yet.
          </div>
        ) : (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <div
                key={book._id}
                className="overflow-hidden rounded-2xl bg-white text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-72 items-center justify-center bg-[#E8EFE9] p-5">
                  <Image
                    src={book.coverImage}
                    alt={book.title}
                    width={200}
                    height={260}
                    className="h-full max-h-64 w-auto rounded-lg object-contain shadow-md"
                  />
                </div>

                <div className="p-6">
                  <span className="rounded-full bg-[#E8EFE9] px-3 py-1 text-xs font-semibold text-[#153D35]">
                    {book.category}
                  </span>

                  <h3 className="mt-4 line-clamp-1 text-xl font-bold text-[#153D35]">
                    {book.title}
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    By {book.author}
                  </p>

                  <Link
                    href={`/books/${book._id}`}
                    className="mt-5 block rounded-xl bg-[#153D35] py-3 text-center font-semibold text-white transition hover:bg-[#245B4D]"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* See All Books Button */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/all-books"
            className="inline-flex items-center gap-2 rounded-xl bg-[#183D35] px-8 py-3.5 font-semibold text-white transition hover:bg-[#285B4D]"
          >
            See All Books
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
