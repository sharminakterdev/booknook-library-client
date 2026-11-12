
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface Book {
  _id: string;
  title: string;
  author: string;
  coverImage: string;
  totalCopies: number;
  availableCopies?: number;
}

interface BorrowRecord {
  _id: string;
  bookId: string;
  borrowerEmail: string;
  status?: string;
}

interface Props {
  book: Book;
}

const BorrowButton = ({ book }: Props) => {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [isOpen, setIsOpen] = useState(false);
  const [returnDate, setReturnDate] = useState("");
  const [loading, setLoading] = useState(false);

  // No Double Borrow states
  const [alreadyBorrowed, setAlreadyBorrowed] = useState(false);
  const [checkingBorrow, setCheckingBorrow] = useState(true);

  const user = session?.user;

 const availableCopies = Number(
  book.availableCopies ?? book.totalCopies
);

  // Check whether the user already borrowed this book
  useEffect(() => {
    let active = true;

    const checkExistingBorrow = async () => {
      if (isPending) return;

      if (!user?.email) {
        setAlreadyBorrowed(false);
        setCheckingBorrow(false);
        return;
      }

      try {
        setCheckingBorrow(true);

        const res = await fetch(
          `${API_URL}/borrows?email=${encodeURIComponent(user.email)}`,
          { cache: "no-store" }
        );

        if (!res.ok) {
          throw new Error("Failed to check borrow status");
        }

        const borrows: BorrowRecord[] = await res.json();

        const exists = borrows.some(
  (borrow) =>
    String(borrow.bookId) === String(book._id) &&
    borrow.borrowerEmail?.toLowerCase() === user.email?.toLowerCase()
);
    

        if (active) {
          setAlreadyBorrowed(exists);
        }
      } catch (error) {
        console.error("Borrow Check Error:", error);
      } finally {
        if (active) {
          setCheckingBorrow(false);
        }
      }
    };

    checkExistingBorrow();

    return () => {
      active = false;
    };
  }, [user?.email, book._id, isPending]);

  const getMinDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 1);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // Borrow Book
  const handleBorrow = async () => {
    if (!user) {
      toast.error("Please login to borrow a book!");
      return;
    }

    if (alreadyBorrowed) {
      toast.error("You have already borrowed this book!");
      return;
    }

    if (!returnDate) {
      toast.error("Please select a return date!");
      return;
    }

    if (returnDate < getMinDate()) {
      toast.error("Please select a valid return date!");
      return;
    }

    if (availableCopies <= 0) {
      toast.error("This book is not available!");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/borrows`, {
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

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        if (res.status === 409) {
          setAlreadyBorrowed(true);
        }

        throw new Error(
          data?.message || "Failed to borrow book!"
        );
      }

      setAlreadyBorrowed(true);
      setIsOpen(false);
      setReturnDate("");

      toast.success("Book borrowed successfully!");

      // Refresh book details and available copies
      router.refresh();
    } catch (error) {
      console.error("Borrow Error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong!"
      );
    } finally {
      setLoading(false);
    }
  };

  const unavailable = availableCopies <= 0;

  const buttonDisabled =
    isPending ||
    checkingBorrow ||
    unavailable ||
    alreadyBorrowed;

  return (
    <>
      {/* Available Copies */}
      <div className="mt-6 rounded-xl border border-[#E5EDE8] bg-[#F7F7F0] p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">
            Total Copies
          </span>

          <span className="font-semibold text-[#153D35]">
            {book.totalCopies}
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">
            Available Copies
          </span>

          <span
            className={`font-semibold ${
              unavailable ? "text-red-500" : "text-[#153D35]"
            }`}
          >
            {availableCopies}
          </span>
        </div>
      </div>

      {/* Borrow Button */}
      <button
        type="button"
        disabled={buttonDisabled}
        onClick={() => {
          if (!user) {
            toast.error("Please login first!");
            return;
          }

          if (alreadyBorrowed) {
            toast.error("You have already borrowed this book!");
            return;
          }

          setIsOpen(true);
        }}
        className="mt-4 w-full rounded-xl bg-[#153D35] py-4 font-semibold text-white transition hover:bg-[#245B4D] disabled:cursor-not-allowed disabled:bg-gray-400 disabled:opacity-80"
      >
        {isPending || checkingBorrow
          ? "Checking..."
          : unavailable
          ? "Not Available"
          : alreadyBorrowed
          ? "Already Borrowed"
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

              <p className="mt-2 text-sm text-gray-600">
                Available Copies: {availableCopies}
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
                className="w-1/2 rounded-xl border border-gray-300 py-3 font-semibold text-gray-600 hover:bg-gray-100 disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleBorrow}
                disabled={loading || unavailable || alreadyBorrowed}
                className="w-1/2 rounded-xl bg-[#153D35] py-3 font-semibold text-white hover:bg-[#245B4D] disabled:cursor-not-allowed disabled:opacity-60"
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
