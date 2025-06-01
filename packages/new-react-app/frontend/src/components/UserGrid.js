import React from "react";
import UserCard from "./UserCard";

export default function UserGrid({ users, loading }) {
  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
      </div>
    );
  }

  if (!users.length) {
    return (
      <p style={{ textAlign: "center", marginTop: 32, color: "#555" }}>
        Chưa có kết quả nào.
      </p>
    );
  }

  return (
    <div style={styles.grid}>
      {users.map((u) => (
        <UserCard key={u.id} user={u} />
      ))}
    </div>
  );
}

const styles = {
  grid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: 16,
    padding: "0 8px",
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: 32,
  },
  spinner: {
    width: 48,
    height: 48,
    border: "5px solid #f3f3f3",
    borderTop: "5px solid #1976d2",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  // Thêm keyframes cho spinner
  "@keyframes spin": {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
};
