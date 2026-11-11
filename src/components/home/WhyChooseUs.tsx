import {
  BookOpen,
  Heart,
  Users,
  Clock,
} from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Wide Book Collection",
    description:
      "Explore a diverse collection of books across different genres and categories.",
  },
  {
    icon: Heart,
    title: "For Every Reader",
    description:
      "Whether you love fiction or knowledge, find books that match your interests.",
  },
  {
    icon: Users,
    title: "Reader Community",
    description:
      "Join a community of passionate readers and discover your next favorite book.",
  },
  {
    icon: Clock,
    title: "Easy Borrowing",
    description:
      "Borrow your favorite books with a simple and convenient process.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-white px-5 py-20">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-14 text-center">
          <p className="font-semibold uppercase tracking-[3px] text-[#A58B50]">
            The BookNook Experience
          </p>

          <h2 className="mt-3 text-3xl font-bold text-[#153D35] md:text-4xl">
            Why Choose BookNook?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-gray-500">
            More than a library, BookNook is a place where every reader
            can discover, explore and enjoy the magic of books.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="group rounded-2xl border border-[#E8E5DA] bg-[#F7F7F0] p-7 text-center transition duration-300 hover:-translate-y-2 hover:shadow-lg"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#153D35] text-white transition group-hover:bg-[#A58B50]">
                  <Icon size={30} strokeWidth={1.7} />
                </div>

                <h3 className="mt-6 text-lg font-bold text-[#153D35]">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-500">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;