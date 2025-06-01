import React, { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";

export default function UserCard({ user }) {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const isFav = favorites.some((u) => u.id === user.id);

  return (
    <div style={styles.card}>
      <div style={styles.avatarContainer}>
        <img
          src={user.avatar_url}
          alt={user.login}
          style={styles.avatar}
        />
      </div>
      <div style={styles.content}>
        <h4 style={{ margin: "8px 0 4px" }}>{user.login}</h4>
        <p style={styles.text}>ID: {user.id}</p>
        <p style={styles.text}>Repos: {user.public_repos} | Followers: {user.followers}</p>
      </div>
      <div style={styles.actions}>
        <button
          style={styles.viewButton}
          onClick={() => window.open(user.html_url, "_blank")}
        >
          Xem
        </button>
        <button
          style={styles.favButton}
          onClick={() => toggleFavorite(user)}
        >
          {isFav ? "♥" : "♡"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    width: 260,
    margin: 8,
    borderRadius: 8,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    overflow: "hidden",
    background: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatarContainer: {
    marginTop: 16,
    marginBottom: 8,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: "50%",
    objectFit: "cover",
  },
  content: {
    textAlign: "center",
    padding: "0 16px 8px",
  },
  text: {
    margin: "4px 0",
    fontSize: 14,
    color: "#555",
  },
  actions: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 16px",
    borderTop: "1px solid #eee",
    marginTop: "auto",
  },
  viewButton: {
    padding: "6px 12px",
    fontSize: 14,
    backgroundColor: "#1976d2",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
  },
  favButton: {
    padding: "6px 12px",
    fontSize: 18,
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#e53935",
  },
};
