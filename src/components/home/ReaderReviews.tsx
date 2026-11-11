import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Sarah Ahmed",
    role: "Book Lover",
    review:
      "BookNook has made finding my favorite books so easy. I love exploring the amazing collection!",
    initial: "S",
  },
  {
    name: "Rahim Hasan",
    role: "Regular Reader",
    review:
      "A wonderful platform for book lovers. The borrowing process is simple and the collection is great.",
    initial: "R",
  },
  {
    name: "Nusrat Jahan",
    role: "Student",
    review:
      "I found so many interesting books here. BookNook is now my favorite place to discover new stories.",
    initial: "N",
  },
];

const ReaderReviews = () => {
  return (
    <section className="bg-[#F7F7F0] px-5 py-20">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-14 text-center">
          <p className="font-semibold uppercase tracking-[3px] text-[#A58B50]">
            Words From Our Readers
          </p>

          <h2 className="mt-3 text-3xl font-bold text-[#153D35] md:text-4xl">
            What Our Readers Say
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-gray-500">
            Discover what makes BookNook special through the experiences
            of our lovely readers.
          </p>
        </div>

        {/* Review Cards */}
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-[#E8E5DA] bg-white p-8 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-lg"
            >
              <Quote
                size={35}
                className="mx-auto text-[#C5A66B]"
              />

              {/* Stars */}
              <div className="mt-5 flex justify-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={17}
                    className="fill-[#C5A66B] text-[#C5A66B]"
                  />
                ))}
              </div>

              <p className="mt-5 min-h-24 text-sm leading-7 text-gray-600">
                "{item.review}"
              </p>

              {/* User Info */}
              <div className="mt-6 border-t border-gray-100 pt-6">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#153D35] text-xl font-bold text-white">
                  {item.initial}
                </div>

                <h3 className="mt-3 font-bold text-[#153D35]">
                  {item.name}
                </h3>

                <p className="mt-1 text-sm text-gray-400">
                  {item.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReaderReviews;