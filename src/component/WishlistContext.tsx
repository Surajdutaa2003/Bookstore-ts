// src/context/WishlistContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface WishlistContextType {
  wishlist: (number | string)[];
  addToWishlist: (id: number | string) => void;
  removeFromWishlist: (id: number | string) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<(number | string)[]>([]);

  const addToWishlist = (id: number | string) => {
    setWishlist((prev) => [...prev, id]);
  };

  const removeFromWishlist = (id: number | string) => {
    setWishlist((prev) => prev.filter((itemId) => itemId !== id));
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};