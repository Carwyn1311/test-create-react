import React, { useState } from "react";
import { apiPost } from "../api";

export default function CodeVerificationForm({ phone, onVerified }) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!code.trim()) {
      setError("Vui lòng nhập mã truy cập.");
      return;
    }
    try {
      setLoading(true);
      await apiPost("/api/verify-code", {
        phoneNumber: phone,
        accessCode: code.trim(),
      });
      localStorage.setItem("phone", phone);
      onVerified(phone);
    } catch (err) {
      setError(
        err?.response?.data?.error ||
        err.message ||
        "Mã không đúng hoặc đã hết hạn."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f4f6fb",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div style={{
        background: "#fff",
        padding: 32,
        width: 360,
        borderRadius: 10,
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)"
      }}>
        <h2 style={{ textAlign: "center", marginBottom: 24 }}>Nhập mã đã gửi đến {phone}</h2>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div style={{ marginBottom: 16 }}>
            <label
              htmlFor="code"
              style={{ display: "block", marginBottom: 8, fontWeight: 500 }}
            >
              Mã truy cập
            </label>
            <input
              id="code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="6 chữ số"
              required
              maxLength={6}
              style={{
                width: "100%",
                padding: "10px 12px",
                fontSize: 16,
                border: "1px solid #bbb",
                borderRadius: 4,
                outline: "none"
              }}
              autoFocus
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "10px 0",
              background: "#2b68d6",
              color: "#fff",
              border: "none",
              borderRadius: 4,
              fontSize: 17,
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer"
            }}
          >
            {loading ? "Đang xác thực..." : "Xác thực"}
          </button>
          {error && (
            <div
              style={{
                marginTop: 16,
                color: "#b71c1c",
                background: "#ffeaea",
                borderRadius: 4,
                padding: "10px 14px",
                fontSize: 15
              }}
            >
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
