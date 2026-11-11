
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Loader2,
} from "lucide-react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

const API_URL = "http://localhost:8000";

interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  coverImage?: string;
  image?: string;
  description: string;
  totalCopies: number;
}

interface BookForm {
  title: string;
  author: string;
  category: string;
  coverImage: string;
  description: string;
  totalCopies: number;
}

const MyBookPage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [deletingBook, setDeletingBook] = useState<Book | null>(null);

  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [formData, setFormData] = useState<BookForm>({
    title: "",
    author: "",
    category: "",
    coverImage: "",
    description: "",
    totalCopies: 1,
  });

  // Fetch My Books
  useEffect(() => {
    if (isPending) return;

    if (!user?.email) {
      router.push("/login");
      return;
    }

    const fetchBooks = async () => {
      try {
        const res = await fetch(
          `${API_URL}/my-books/${encodeURIComponent(user.email)}`,
          { cache: "no-store" }
        );

        const data = await res.json();
        setBooks(data);
      } catch {
        toast.error("Failed to load books");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [user?.email, isPending, router]);

  // Search
  const filteredBooks = books.filter((book) => {
    const search = searchTerm.toLowerCase();

    return (
      book.title.toLowerCase().includes(search) ||
      book.author.toLowerCase().includes(search) ||
      book.category.toLowerCase().includes(search)
    );
  });

  // Open Edit Modal
  const handleEdit = (book: Book) => {
    setEditingBook(book);

    setFormData({
      title: book.title,
      author: book.author,
      category: book.category,
      coverImage: book.coverImage || book.image || "",
      description: book.description || "",
      totalCopies: book.totalCopies,
    });
  };

  // Form Change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "totalCopies" ? Number(value) : value,
    }));
  };

  // Update Book API
  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!editingBook) return;

    try {
      setUpdating(true);

      const res = await fetch(`${API_URL}/books/${editingBook._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        toast.error("Failed to update book");
        return;
      }

      setBooks((prev) =>
        prev.map((book) =>
          book._id === editingBook._id
            ? { ...book, ...formData }
            : book
        )
      );

      setEditingBook(null);
      toast.success("Book updated successfully!");
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setUpdating(false);
    }
  };

  // Delete Book API
  const handleDelete = async () => {
    if (!deletingBook) return;

    try {
      setDeleting(true);

      const res = await fetch(`${API_URL}/books/${deletingBook._id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        toast.error("Failed to delete book");
        return;
      }

      setBooks((prev) =>
        prev.filter((book) => book._id !== deletingBook._id)
      );

      setDeletingBook(null);
      toast.success("Book deleted successfully!");
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setDeleting(false);
    }
  };

  if (isPending || loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#F8F6EF]">
        <Loader2 className="h-9 w-9 animate-spin text-[#285B43]" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F6EF] px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#244632]">
              My Books
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Manage your personal book collection.
            </p>
          </div>

          <Link
            href="/add-book"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#285B43] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1B4230]"
          >
            <Plus size={18} />
            Add New Book
          </Link>
        </div>

        {/* Search */}
        <div className="relative mt-8">
          <Search
            size={19}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search by title, author or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-[#E5E2D7] bg-white py-3.5 pl-12 pr-4 text-sm text-gray-700 outline-none transition focus:border-[#285B43]"
          />
        </div>

        {/* Book List */}
        <div className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#244632]">
              Your Collection
            </h2>

            <span className="text-sm text-gray-500">
              {filteredBooks.length} Books
            </span>
          </div>

          {books.length === 0 ? (
            <div className="rounded-xl border border-[#E5E2D7] bg-white px-5 py-16 text-center">
              <BookOpen size={42} className="mx-auto text-[#8BA18E]" />

              <h3 className="mt-4 text-lg font-semibold text-[#244632]">
                No Books Found!
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                You have not added any books yet.
              </p>

              <Link
                href="/add-book"
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#285B43] px-5 py-3 text-sm font-semibold text-white hover:bg-[#1B4230]"
              >
                <Plus size={17} />
                Add Your First Book
              </Link>
            </div>
          ) : filteredBooks.length === 0 ? (
            <div className="rounded-xl bg-white p-10 text-center text-sm text-gray-500">
              No matching books found.
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBooks.map((book) => (
                <div
                  key={book._id}
                  className="flex flex-col gap-4 rounded-xl border border-[#E5E2D7] bg-white p-4 shadow-sm transition hover:shadow-md sm:flex-row sm:items-center"
                >
                  {/* Book Image */}
                  <div className="relative h-36 w-full shrink-0 overflow-hidden rounded-lg bg-[#F0EEE5] sm:h-32 sm:w-24">
                    {book.coverImage || book.image ? (
                      <Image
                        src={book.coverImage || book.image || ""}
                        alt={book.title}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[#8BA18E]">
                        <BookOpen size={35} />
                      </div>
                    )}
                  </div>

                  {/* Book Details */}
                  <div className="min-w-0 flex-1">
                    <span className="inline-block rounded-full bg-[#EEF3EB] px-3 py-1 text-xs font-semibold text-[#376849]">
                      {book.category}
                    </span>

                    <h3 className="mt-2 text-lg font-bold text-[#244632]">
                      {book.title}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      By {book.author}
                    </p>

                    <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                      {book.description}
                    </p>

                    <p className="mt-2 text-sm font-semibold text-[#376849]">
                      Total Copies: {book.totalCopies}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex shrink-0 items-center gap-2 border-t border-[#EEEEEA] pt-3 sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0">
                    <button
                      onClick={() => handleEdit(book)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#D7E4D7] bg-[#EEF3EB] px-4 py-2.5 text-sm font-semibold text-[#285B43] transition hover:bg-[#DDEBDD] sm:flex-none"
                    >
                      <Pencil size={16} />
                      Edit
                    </button>

                    <button
                      onClick={() => setDeletingBook(book)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#F0D9D1] bg-[#FBF0EC] px-4 py-2.5 text-sm font-semibold text-[#B45440] transition hover:bg-[#F6E1D9] sm:flex-none"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {editingBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
          <div className="my-auto w-full max-w-lg rounded-2xl bg-[#FCFBF6] p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#244632]">
                Edit Book
              </h2>

              <button
                onClick={() => setEditingBook(null)}
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={21} />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4">
              {[
                { label: "Book Title", name: "title" },
                { label: "Author Name", name: "author" },
                { label: "Category", name: "category" },
                { label: "Cover Image URL", name: "coverImage" },
                { label: "Total Copies", name: "totalCopies", type: "number" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="mb-1.5 block text-sm font-semibold text-[#244632]">
                    {field.label}
                  </label>

                  <input
                    name={field.name}
                    type={field.type || "text"}
                    min={field.type === "number" ? 1 : undefined}
                    required
                    value={formData[field.name as keyof BookForm]}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-[#E0E3D9] bg-white px-4 py-3 text-sm outline-none focus:border-[#285B43]"
                  />
                </div>
              ))}

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-[#244632]">
                  Description
                </label>

                <textarea
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full resize-none rounded-lg border border-[#E0E3D9] bg-white px-4 py-3 text-sm outline-none focus:border-[#285B43]"
                />
              </div>

              <button
                type="submit"
                disabled={updating}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#285B43] py-3 text-sm font-semibold text-white hover:bg-[#1B4230] disabled:opacity-60"
              >
                {updating && (
                  <Loader2 size={17} className="animate-spin" />
                )}
                {updating ? "Updating..." : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingBook && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-[#FCFBF6] p-7 text-center shadow-xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#FBECE7] text-[#B45440]">
              <Trash2 size={25} />
            </div>

            <h2 className="mt-4 text-xl font-bold text-[#244632]">
              Delete this book?
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Are you sure you want to delete{" "}
              <strong className="text-[#244632]">
                {deletingBook.title}
              </strong>
              ?
            </p>

            <div className="mt-7 flex gap-3">
              <button
                onClick={() => setDeletingBook(null)}
                disabled={deleting}
                className="flex-1 rounded-lg border border-[#E0E3D9] py-3 text-sm font-semibold text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#B45440] py-3 text-sm font-semibold text-white hover:bg-[#963D2D] disabled:opacity-60"
              >
                {deleting && (
                  <Loader2 size={16} className="animate-spin" />
                )}
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default MyBookPage;

