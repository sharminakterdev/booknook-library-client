"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

interface Book {
  _id: string;
  title: string;
  author: string;
  coverImage: string;
  totalCopies: number;
  availableCopies?: number;
}

interface Props {
  book: Book;
}

const BorrowButton = ({ book }: Props) => {
  const { data: session, isPending } = authClient.useSession();

  const [isOpen, setIsOpen] = useState(false);
  const [returnDate, setReturnDate] = useState("");
  const [loading, setLoading] = useState(false);

  const user = session?.user;
  const availableCopies = book.availableCopies ?? book.totalCopies;

  const getMinDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 1);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const handleBorrow = async () => {
    if (!user) {
      toast.error("Please login to borrow a book!");
      return;
    }

    if (!returnDate) {
      toast.error("Please select a return date!");
      return;
    }

    if (new Date(returnDate) <= new Date(getMinDate())) {
      toast.error("Please select a valid return date!");
      return;
    }

    if (availableCopies <= 0) {
      toast.error("This book is not available!");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:8000/borrows", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookId: book._id,
          bookTitle: book.title,
          author: book.author,
          coverImage: book.coverImage,
          borrowerName: user.name,
          borrowerEmail: user.email,
          returnDate,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to borrow book!");
        return;
      }

      toast.success("Book borrowed successfully!");
      setIsOpen(false);
      setReturnDate("");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Borrow Button */}
      <button
        type="button"
        disabled={isPending || availableCopies <= 0}
        onClick={() => {
          if (!user) {
            toast.error("Please login first!");
            return;
          }

          setIsOpen(true);
        }}
        className="mt-8 w-full rounded-xl bg-[#153D35] py-4 font-semibold text-white transition hover:bg-[#245B4D] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {availableCopies <= 0
          ? "Currently Unavailable"
          : "Borrow This Book"}
      </button>

      {/* Borrow Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#153D35]">
                Borrow Book
              </h2>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-2xl text-gray-500 hover:text-red-500"
              >
                &times;
              </button>
            </div>

            {/* Book Information */}
            <div className="mb-5 rounded-xl bg-[#F7F7F0] p-4">
              <h3 className="font-bold text-[#153D35]">
                {book.title}
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                By {book.author}
              </p>
            </div>

            {/* Borrower Name */}
            <div className="mb-4">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Borrower Name
              </label>

              <input
                type="text"
                value={user?.name || ""}
                readOnly
                className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-gray-600 outline-none"
              />
            </div>

            {/* Borrower Email */}
            <div className="mb-4">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Email Address
              </label>

              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-gray-600 outline-none"
              />
            </div>

            {/* Return Date */}
            <div className="mb-6">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Return Date
              </label>

              <input
                type="date"
                min={getMinDate()}
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#153D35]"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                disabled={loading}
                className="w-1/2 rounded-xl border border-gray-300 py-3 font-semibold text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleBorrow}
                disabled={loading}
                className="w-1/2 rounded-xl bg-[#153D35] py-3 font-semibold text-white hover:bg-[#245B4D] disabled:opacity-60"
              >
                {loading ? "Processing..." : "Confirm Borrow"}
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default BorrowButton;