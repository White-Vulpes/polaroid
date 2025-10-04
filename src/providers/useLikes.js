import React, { createContext, useContext, useState, useCallback } from "react";

const LikesContext = createContext(null);

export function LikesProvider({ children }) {
  const [liked, setLiked] = useState([]);

  const handleLiked = useCallback((photoId) => {
    console.log("Toggling Like for:", photoId);
    console.log("Current Likes:", liked);
    if (liked.includes(photoId)) {
      console.log("Minus Like")
      fetch(`https://white-vulpes.hasura.app/v1/graphql`, {
        method: 'POST',
        body: JSON.stringify({
          query: `mutation MyMutation($p_name: String = "", $p_category: String = "", $p_website_id: uuid = "") {
            minus_likes(args: {p_category: $p_category, p_name: $p_name, p_website_id: $p_website_id}) {
              id
            }
          }`,
          variables: { p_name: photoId.split('/').pop(), p_category: photoId.split('/')[3], p_website_id: "123e4567-e89b-12d3-a456-426614174000" }
        }),
        headers: { 'Content-Type': 'application/json', 'x-hasura-role': 'client' }
      }).then(res => res.json()).then(console.log).catch(console.error);
    }
    else {
      console.log("Add Like")
      fetch(`https://white-vulpes.hasura.app/v1/graphql`, {
        method: 'POST',
        body: JSON.stringify({
          query: `mutation MyMutation($p_name: String = "", $p_category: String = "", $p_website_id: uuid = "") {
            add_likes(args: {p_category: $p_category, p_name: $p_name, p_website_id: $p_website_id}) {
              id
            }
          }`,
          variables: { p_name: photoId.split('/').pop(), p_category: photoId.split('/')[3], p_website_id: "123e4567-e89b-12d3-a456-426614174000" }
        }),
        headers: { 'Content-Type': 'application/json', 'x-hasura-role': 'client' }
      }).then(res => res.json()).then(console.log).catch(console.error);
    }
    setLiked((prev) =>
      prev.includes(photoId)
        ? prev.filter((id) => id !== photoId)
        : [...prev, photoId]
    );
  }, [liked]);

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
