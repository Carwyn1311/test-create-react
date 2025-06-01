import React, { useState, useEffect } from "react";

export default function ProfileModal({ phone, onClose }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFav = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/getUserProfile?phoneNumber=${phone}`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setFavorites(data.favorite_github_users || []);
      } catch {
        setFavorites([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFav();
  }, [phone]);

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button onClick={onClose} style={styles.closeButton}>
          ×
        </button>
        <h3 style={{ marginTop: 0, marginBottom: 8 }}>Thông tin cá nhân</h3>
        <p style={{ margin: "4px 0", fontSize: 14 }}>
          <strong>Số điện thoại:</strong> {phone}
        </p>
        <p style={{ margin: "16px 0 8px", fontWeight: 500 }}>Danh sách GitHub đã thích</p>

        {loading ? (
          <div style={{ textAlign: "center", margin: "16px 0" }}>Loading...</div>
        ) : favorites.length === 0 ? (
          <p style={{ fontSize: 14, color: "#555" }}>Chưa có profile nào được thích.</p>
        ) : (
          <ul style={styles.list}>
            {favorites.map((u) => (
              <li key={u.id} style={styles.listItem}>
                <img
                  src={u.avatar_url}
                  alt={u.login}
                  style={styles.avatar}
                />
                <div>
                  <a
                    href={u.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.link}
                  >
                    {u.login}
                  </a>
                  <p style={styles.subText}>
                    Repos: {u.public_repos} | Followers: {u.followers}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    background: "#fff",
    borderRadius: 8,
    padding: 24,
    width: 360,
    maxHeight: "80vh",
    overflowY: "auto",
    position: "relative",
    boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
  },
  closeButton: {
    position: "absolute",
    top: 8,
    right: 8,
    background: "none",
    border: "none",
    fontSize: 22,
    cursor: "pointer",
    color: "#555",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  listItem: {
    display: "flex",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    marginRight: 12,
    objectFit: "cover",
  },
  link: {
    fontSize: 16,
    color: "#1976d2",
    textDecoration: "none",
    fontWeight: 500,
  },
  subText: {
    margin: "4px 0 0",
    fontSize: 14,
    color: "#555",
  },
};
