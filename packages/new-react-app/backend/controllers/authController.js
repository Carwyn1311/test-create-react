import { db } from "../utils/firebaseAdmin.js";

import dotenv from "dotenv";
dotenv.config();

function generateSixDigitCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export const sendCode = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
      return res.status(400).json({ error: "Thiếu số điện thoại." });
    }

    const code = generateSixDigitCode();
    const docRef = db.collection("access_codes").doc(phoneNumber);
    await docRef.set({ code });

    console.log(`Đã lưu mã ${code} cho ${phoneNumber}`);
    return res.json({ success: true });
  } catch (error) {
    console.error("Lỗi sendCode:", error);
    return res.status(500).json({ error: "Lỗi server khi tạo mã." });
  }
};

export const verifyCode = async (req, res) => {
  try {
    const { phoneNumber, accessCode } = req.body;
    if (!phoneNumber || !accessCode) {
      return res.status(400).json({ error: "Thiếu số điện thoại hoặc mã." });
    }

    const docRef = db.collection("access_codes").doc(phoneNumber);
    const docSnap = await docRef.get();
    if (!docSnap.exists) {
      return res.status(404).json({ error: "Số điện thoại chưa được đăng ký." });
    }

    const data = docSnap.data();
    if (data.code !== accessCode) {
      return res.status(401).json({ error: "Mã không đúng hoặc hết hạn." });
    }

    await docRef.set({ code: "" }, { merge: true });

    return res.json({ success: true });
  } catch (error) {
    console.error("Lỗi verifyCode:", error);
    return res.status(500).json({ error: "Lỗi server khi xác thực mã." });
  }
};