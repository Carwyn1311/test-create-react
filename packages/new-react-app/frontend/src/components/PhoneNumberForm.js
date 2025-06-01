import React, { useState } from "react";
import { apiPost } from "../api";

export default function PhoneNumberForm({ onSent }) {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!phone.trim()) {
      setError("Vui lòng nhập số điện thoại.");
      return;
    }
    try {
      setLoading(true);
      await apiPost("/api/send-code", { phoneNumber: phone.trim() });
      onSent(phone.trim());
    } catch (err) {
      setError(err.message || "Có lỗi, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f6fb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: 32,
          width: 360,
          borderRadius: 10,
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 24 }}>Đăng nhập</h2>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div style={{ marginBottom: 16 }}>
            <label
              htmlFor="phone"
              style={{ display: "block", marginBottom: 8, fontWeight: 500 }}
            >
              Số điện thoại
            </label>
            <input
              id="phone"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Ví dụ: 0912345678"
              required
              style={{
                width: "100%",
                padding: "10px 12px",
                fontSize: 16,
                border: "1px solid #bbb",
                borderRadius: 4,
                outline: "none",
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
              background: "#1976d2",
              color: "#fff",
              border: "none",
              borderRadius: 4,
              fontSize: 17,
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Đang gửi mã..." : "Gửi mã qua SMS"}
          </button>
          {error && (
            <div
              style={{
                marginTop: 16,
                color: "#b71c1c",
                background: "#ffeaea",
                borderRadius: 4,
                padding: "10px 14px",
                fontSize: 15,
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
