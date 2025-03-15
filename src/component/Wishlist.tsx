// src/component/Wishlist.tsx
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import BookData from "./BookData";
import { useWishlist } from "../component/WishlistContext";
import { FaTrash } from "react-icons/fa";

const Wishlist: React.FC = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <BookData>
      {({ books, loading, error }) => {
        if (loading) {
          return (
            <div className="min-h-screen bg-white">
              <Navbar showSearchAndIcons={true} />
              <div className="container mx-auto px-4 py-2">
                <p className="text-gray-500 text-center mt-6">Loading wishlist...</p>
              </div>
            </div>
          );
        }

        if (error) {
          return (
            <div className="min-h-screen bg-white">
              <Navbar showSearchAndIcons={true} />
              <div className="container mx-auto px-4 py-2">
                <p className="text-red-500 text-center mt-6">{error}</p>
              </div>
            </div>
          );
        }

        const wishlistBooks = books.filter((book: { id: number | string }) =>
          wishlist.includes(book.id)
        );

        return (
          <div className="min-h-screen bg-white">
            <Navbar showSearchAndIcons={true} />
            
            <div className="container mx-auto px-4 py-2">
              <div className="mb-2">
                <Link to="/home" className="text-blue-700 hover:underline">Home</Link>
                <span>/My Wishlist</span>
              </div>
              
              {/* Wishlist heading in gray container */}
              <div className="bg-gray-200 p-4 mb-4 w-1022 h-55">
                <h1 className="text-xl font-medium">My Wishlist ({wishlistBooks.length})</h1>
              </div>

              {wishlistBooks.length > 0 ? (
                <div className="bg-white">
                  {wishlistBooks.map((book: { id: number | string; title: string; author: string; price: number; image: string; discountPrice: number }) => (
                    <div key={book.id} className="border-b py-4 flex items-center">
                      {/* Book Image */}
                      <Link to={`/book/${book.id}`} className="flex-shrink-0">
                        <img 
                          src={book.image} 
                          alt={book.title} 
                          className="w-24 h-32 object-cover"
                        />
                      </Link>

                      {/* Book Details - to the right of image */}
                      <div className="ml-4 flex-grow">
                        <Link 
                          to={`/book/${book.id}`} 
                          className="block text-xl font-medium text-purple-800 hover:underline mb-1"
                        >
                          {book.title}
                        </Link>
                        <p className="text-sm mb-1">by <Link to={`/author/${book.id}`} className="text-purple-800">{book.author}</Link></p>
                        <p>
                          <span className="font-medium">Rs. {book.price}</span>{" "}
                          <span className="line-through text-gray-500">Rs. {book.discountPrice}</span>
                        </p>
                      </div>

                      {/* Remove Button - at extreme right */}
                      <button
                        onClick={() => removeFromWishlist(book.id)}
                        className="ml-auto text-gray-500 hover:text-gray-700"
                      >
                        <FaTrash size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center mt-6">Your wishlist is empty.</p>
              )}
            </div>
            
            <div className="mt-auto py-2 text-sm">
              Copyright © 2020, Bookstore Private Limited. All Rights Reserved
            </div>
          </div>
        );
      }}
    </BookData>
  );
};

export default Wishlist;