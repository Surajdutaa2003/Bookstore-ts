// src/component/BookData.tsx
import React, { useState, useEffect } from "react";
import { getBooks } from "./api";
import bookStoreImage from "../assests1/Books.png";

interface Book {
  id: number | string;
  title: string;
  author: string;
  price: number;
  image: string;
  discountPrice: number;
  rating: number;
}

interface ApiBook {
  _id: string;
  bookName: string;
  author: string;
  price: number;
  quantity: number;
  bookImage?: string | null;
  discountPrice: number;
  description: string;
  [key: string]: any;
}

interface BookDataProps {
  children: (props: {
    books: Book[];
    loading: boolean;
    error: string | null;
  }) => React.ReactNode;
}

const BookData: React.FC<BookDataProps> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const fetchedBooks = await getBooks();
        const mappedBooks: Book[] = fetchedBooks.map((apiBook: ApiBook) => ({
          id: apiBook._id,
          title: apiBook.bookName,
          author: apiBook.author,
          price: apiBook.price,
          image: apiBook.bookImage || bookStoreImage,
          discountPrice: apiBook.discountPrice || apiBook.price * 1.2,
          rating: 4.0,
        }));
        setBooks(mappedBooks);
      } catch (err) {
        setError((err as Error).message || "Failed to load books");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  return <>{children({ books, loading, error })}</>;
};

export default BookData;