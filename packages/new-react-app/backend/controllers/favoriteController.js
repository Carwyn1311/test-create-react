import admin from "firebase-admin";
import { db } from "../utils/firebaseAdmin.js";

export const likeGithubUser = async (req, res) => {
  try {
    const { phoneNumber, githubUser } = req.body;
    if (!phoneNumber || !githubUser || !githubUser.id) {
      return res
        .status(400)
        .json({ error: "Thiếu phoneNumber hoặc githubUser không hợp lệ." });
    }

    const favRef = db.collection("favorites").doc(phoneNumber);

    await favRef.set(
      {
        favorite_github_users: admin.firestore.FieldValue.arrayUnion(
          githubUser
        ),
      },
      { merge: true }
    );

    return res.json({ success: true });
  } catch (error) {
    console.error("Lỗi likeGithubUser:", error);
    return res
      .status(500)
      .json({ error: "Lỗi server khi like GitHub user." });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const { phoneNumber } = req.query;
    if (!phoneNumber) {
      return res.status(400).json({ error: "Thiếu tham số phoneNumber." });
    }

    const favRef = db.collection("favorites").doc(phoneNumber);
    const docSnap = await favRef.get();

    if (!docSnap.exists) {
      return res.json({ favorite_github_users: [] });
    }

    const data = docSnap.data();
    return res.json({
      favorite_github_users: data.favorite_github_users || [],
    });
  } catch (error) {
    console.error("Lỗi getUserProfile:", error);
    return res
      .status(500)
      .json({ error: "Lỗi server khi lấy danh sách favorites." });
  }
};