import React, { useState } from "react";

export default function SearchBar({ onSearchSubmit }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim().length === 0) return;
    onSearchSubmit(query.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "inline-flex", width: "60%", marginBottom: 16 }}
    >
      <input
        type="text"
        placeholder="Tìm GitHub user..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          flex: "1 1 auto",
          padding: "8px 12px",
          fontSize: 16,
          border: "1px solid #ccc",
          borderRadius: "4px 0 0 4px",
          outline: "none",
        }}
      />
      <button
        type="submit"
        style={{
          padding: "8px 12px",
          fontSize: 16,
          backgroundColor: "#61dafb",
          border: "1px solid #61dafb",
          borderRadius: "0 4px 4px 0",
          cursor: "pointer",
        }}
      >
        Tìm
      </button>
    </form>
  );
}
