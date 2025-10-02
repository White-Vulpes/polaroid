import React, { createContext, useContext, useState, useCallback } from "react";

const LikesContext = createContext(null);

export function LikesProvider({ children }) {
  const [liked, setLiked] = useState([]);

  const handleLiked = useCallback((photoId) => {
    setLiked((prev) =>
      prev.includes(photoId)
        ? prev.filter((id) => id !== photoId)
        : [...prev, photoId]
    );
  }, []);

  const getLiked = useCallback(
    (photoId) => liked.includes(photoId),
    [liked]
  );

  return (
    <LikesContext.Provider value={{ liked, handleLiked, getLiked }}>
      {children}
    </LikesContext.Provider>
  );
}

export function useLikes() {
  const context = useContext(LikesContext);
  if (!context) {
    throw new Error("useLikes must be used within a LikesProvider");
  }
  return context;
}
