import React from "react";

export default function PaginationBar({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <nav style={styles.navContainer}>
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        style={{
          ...styles.navButton,
          cursor: currentPage === 1 ? "not-allowed" : "pointer",
          opacity: currentPage === 1 ? 0.5 : 1,
        }}
      >
        &lt;
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          style={{
            ...styles.pageButton,
            ...(page === currentPage ? styles.activePage : {}),
          }}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        style={{
          ...styles.navButton,
          cursor: currentPage === totalPages ? "not-allowed" : "pointer",
          opacity: currentPage === totalPages ? 0.5 : 1,
        }}
      >
        &gt;
      </button>
    </nav>
  );
}

const styles = {
  navContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "16px 0",
  },
  navButton: {
    padding: "6px 12px",
    margin: "0 4px",
    fontSize: 16,
    backgroundColor: "#e0e0e0",
    border: "1px solid #ccc",
    borderRadius: 4,
    color: "#333",
  },
  pageButton: {
    padding: "6px 12px",
    margin: "0 4px",
    fontSize: 16,
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: 4,
    color: "#333",
    cursor: "pointer",
  },
  activePage: {
    backgroundColor: "#1976d2",
    color: "#fff",
    borderColor: "#1976d2",
    fontWeight: 500,
  },
};
