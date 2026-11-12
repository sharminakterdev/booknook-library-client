import { Star, Quote, Sparkles } from "lucide-react";

const reviews = [
  {
    name: "Sarah Ahmed",
    role: "Book Lover",
    review:
      "BookNook has made finding my favorite books so easy. I love exploring the amazing collection!",
    initial: "S",
    badge: "Verified Reader",
  },
  {
    name: "Rahim Hasan",
    role: "Regular Reader",
    review:
      "A wonderful platform for book lovers. The borrowing process is simple and the collection is great.",
    initial: "R",
    badge: "Book Enthusiast",
  },
  {
    name: "Nusrat Jahan",
    role: "Student",
    review:
      "I found so many interesting books here. BookNook is now my favorite place to discover new stories.",
    initial: "N",
    badge: "Active Member",
  },
];

const ReaderReviews = () => {
  return (
    <section className="relative overflow-hidden bg-[#FAF8F5] px-6 py-28 lg:py-36">
      {/* Background Aesthetic Blur Circles */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-[#A58B50]/10 to-[#153D35]/10 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#A58B50]/30 bg-white px-4 py-1.5 shadow-sm">
            <Sparkles size={15} className="text-[#A58B50]" />
            <span className="text-xs font-bold uppercase tracking-[3px] text-[#153D35]">
              Community Stories
            </span>
          </div>

          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-[#153D35] md:text-5xl lg:text-6xl">
            Loved By Book Lovers
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-base text-gray-500 md:text-lg">
            Discover what makes BookNook special through the genuine experiences 
            of our vibrant community.
          </p>
        </div>

        {/* Review Cards Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((item, index) => (
            <div
              key={index}
              className="group relative flex flex-col justify-between rounded-3xl border border-[#E8E2D2] bg-white p-8 shadow-xl shadow-[#153D35]/5 transition-all duration-500 hover:-translate-y-3 hover:border-[#A58B50] hover:shadow-2xl hover:shadow-[#153D35]/10"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-8 right-8 h-1 rounded-full bg-gradient-to-r from-transparent via-[#A58B50]/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div>
                {/* Header: Quote Icon & Stars */}
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FAF8F5] border border-[#E8E2D2] text-[#153D35] transition-transform duration-500 group-hover:rotate-12 group-hover:bg-[#153D35] group-hover:text-white">
                    <Quote size={22} />
                  </div>
                  <div className="flex gap-1 rounded-full bg-[#FAF8F5] px-3 py-1.5 border border-[#E8E2D2]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className="fill-[#C5A66B] text-[#C5A66B]"
                      />
                    ))}
                  </div>
                </div>

                {/* Review Text */}
                <p className="mt-6 text-base leading-relaxed text-gray-600 font-normal">
                  "{item.review}"
                </p>
              </div>

              {/* User Profile Footer */}
              <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-6">
                <div className="flex items-center gap-4">
                  {/* Avatar with Gradient Ring */}
                  <div className="relative">
                    <div className="absolute -inset-0.5 rounded-full bg-gradient-to-tr from-[#153D35] to-[#C5A66B] opacity-75 blur-xs transition group-hover:opacity-100" />
                    <div className="relative flex h-13 w-13 items-center justify-center rounded-full bg-[#153D35] text-lg font-bold text-white shadow-md">
                      {item.initial}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-[#153D35] text-base">
                      {item.name}
                    </h3>
                    <p className="text-xs font-medium text-gray-400">
                      {item.role}
                    </p>
                  </div>
                </div>

                {/* Badge Tag */}
                <span className="rounded-full bg-[#FAF8F5] border border-[#E8E2D2] px-3 py-1 text-[10px] font-semibold tracking-wider text-[#A58B50] uppercase">
                  {item.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReaderReviews;