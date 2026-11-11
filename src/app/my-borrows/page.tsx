
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

const API_URL = "http://localhost:8000";

interface Borrow {
  _id: string;
  bookId: string;
  bookTitle: string;
  coverImage: string;
  borrowerName: string;
  borrowerEmail: string;
  borrowDate: string;
  returnDate: string;
  status: string;
}

export default function MyBorrowsPage() {
  const { data: session, isPending } = authClient.useSession();

  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [loading, setLoading] = useState(true);
  const [returningId, setReturningId] = useState<string | null>(null);

  const email = session?.user?.email;

  useEffect(() => {
    if (!email) {
      if (!isPending) setLoading(false);
      return;
    }

    const fetchBorrows = async () => {
      try {
        const res = await fetch(
          `${API_URL}/borrows?email=${encodeURIComponent(email)}`,
          { cache: "no-store" }
        );

        if (!res.ok) throw new Error("Failed to load borrowed books");

        const data = await res.json();
        setBorrows(data);
      } catch {
        toast.error("Could not load borrowed books");
      } finally {
        setLoading(false);
      }
    };

    fetchBorrows();
  }, [email, isPending]);

  const handleReturn = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to return this book?"
    );

    if (!confirmed) return;

    try {
      setReturningId(id);

      const res = await fetch(`${API_URL}/borrows/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Return failed");

      setBorrows((prev) => prev.filter((book) => book._id !== id));
      toast.success("Book returned successfully!");
    } catch {
      toast.error("Failed to return book");
    } finally {
      setReturningId(null);
    }
  };

  const formatDate = (date: string) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (isPending || loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#F7F7F0]">
        <p className="font-semibold text-[#153D35]">
          Loading borrowed books...
        </p>
      </div>
    );
  }

  if (!email) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#F7F7F0] px-5">
        <div className="rounded-2xl bg-white p-8 text-center shadow-md">
          <h2 className="text-2xl font-bold text-[#153D35]">
            Please Login
          </h2>
          <p className="mt-2 text-gray-500">
            Login to see your borrowed books.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F7F0] px-4 py-12 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#A58B50]">
            Your Reading Journey
          </p>

          <h1 className="mt-2 text-3xl font-bold text-[#153D35] md:text-4xl">
            My Borrows
          </h1>

          <p className="mt-3 text-gray-600">
            Manage your borrowed books in one place.
          </p>
        </div>

        <div className="mb-6 rounded-2xl bg-[#153D35] p-6 text-white">
          <p className="text-sm text-gray-200">Total Borrowed Books</p>
          <h2 className="mt-2 text-3xl font-bold">
            {borrows.length}
          </h2>
        </div>

        {borrows.length === 0 ? (
          <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
            <div className="text-5xl">📚</div>
            <h2 className="mt-5 text-2xl font-bold text-[#153D35]">
              No Borrowed Books Yet
            </h2>
            <p className="mt-2 text-gray-500">
              Books you borrow will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[750px] text-left">
                <thead className="bg-[#E8EFE9] text-sm text-[#153D35]">
                  <tr>
                    <th className="px-6 py-5">Book</th>
                    <th className="px-6 py-5">Borrow Date</th>
                    <th className="px-6 py-5">Return Date</th>
                    <th className="px-6 py-5 text-center">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {borrows.map((book) => (
                    <tr key={book._id} className="hover:bg-[#FAFAF6]">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <Image
                            src={book.coverImage}
                            alt={book.bookTitle}
                            width={55}
                            height={75}
                            className="h-[75px] w-[55px] rounded-lg object-cover"
                          />
                          <span className="font-semibold text-[#153D35]">
                            {book.bookTitle}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-5 text-sm text-gray-600">
                        {formatDate(book.borrowDate)}
                      </td>

                      <td className="px-6 py-5 text-sm text-gray-600">
                        {formatDate(book.returnDate)}
                      </td>

                      <td className="px-6 py-5 text-center">
                        <button
                          onClick={() => handleReturn(book._id)}
                          disabled={returningId === book._id}
                          className="rounded-lg bg-[#153D35] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#245B4E] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {returningId === book._id
                            ? "Returning..."
                            : "Return Book"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
