import React, { useState, useEffect } from "react";

export default function NavBar({
  onSearchSubmit,
  onViewProfile,
  onLogout,
  initialQuery,
}) {
  const [searchTerm, setSearchTerm] = useState(initialQuery);

  useEffect(() => {
    setSearchTerm(initialQuery);
  }, [initialQuery]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearchSubmit(searchTerm.trim());
      e.preventDefault();
    }
  };

  return (
    <header style={styles.header}>
      <div style={styles.title}>Ứng dụng của tôi</div>

      <div style={styles.searchContainer}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Tìm người dùng GitHub..."
          style={styles.searchInput}
        />
        <button
          type="button"
          onClick={() => onSearchSubmit(searchTerm.trim())}
          style={styles.searchButton}
        >
          Tìm
        </button>
      </div>

      <div style={styles.actions}>
        <button type="button" onClick={onViewProfile} style={styles.iconButton}>
          {/* Bạn có thể thay bằng <img src="profile-icon.svg" /> nếu có icon */}
          Profile
        </button>
        <button type="button" onClick={onLogout} style={styles.iconButton}>
          {/* Bạn có thể thay bằng <img src="logout-icon.svg" /> nếu có icon */}
          Logout
        </button>
      </div>
    </header>
  );
}

const styles = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1976d2",
    padding: "0 16px",
    height: 56,
    color: "#fff",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: 20,
    fontWeight: 500,
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
    maxWidth: 600,
    margin: "0 16px",
  },
  searchInput: {
    flexGrow: 1,
    padding: "8px 12px",
    fontSize: 16,
    border: "1px solid #ccc",
    borderRadius: "4px 0 0 4px",
    outline: "none",
  },
  searchButton: {
    padding: "8px 16px",
    fontSize: 16,
    backgroundColor: "#388e3c",
    border: "none",
    color: "#fff",
    borderRadius: "0 4px 4px 0",
    cursor: "pointer",
  },
  actions: {
    display: "flex",
    alignItems: "center",
  },
  iconButton: {
    background: "none",
    border: "none",
    color: "#fff",
    fontSize: 16,
    marginLeft: 12,
    cursor: "pointer",
    padding: "8px",
  },
};
