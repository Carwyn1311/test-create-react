import React, { createContext, useEffect, useState } from "react";

export const FavoritesContext = createContext({
  favorites: [],
  loading: true,
  toggleFavorite: () => {}
});

export function FavoritesProvider({ phone, children }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = async () => {
    if (!phone) {
      setFavorites([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `/api/getUserProfile?phoneNumber=${encodeURIComponent(phone)}`
      );
      if (!res.ok) {
        throw new Error(`Lỗi server ${res.status}`);
      }
      const json = await res.json();
      setFavorites(json.favorite_github_users || []);
    } catch (err) {
      console.error("Lỗi loadFavorites:", err);
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, [phone]);

  const toggleFavorite = async (userObj) => {
    if (!phone) return;
    const exists = favorites.some((u) => u.id === userObj.id);
    try {
      await fetch("/api/likeGithubUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: phone, githubUser: userObj })
      });
      await loadFavorites();
    } catch (err) {
      console.error("Lỗi toggleFavorite:", err);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, loading, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}
