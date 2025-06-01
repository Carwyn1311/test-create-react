// src/firebase.js
import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  arrayUnion, 
  arrayRemove 
} from "firebase/firestore";

// Thay thế config bên dưới bằng thông số của bạn từ Firebase Console
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  // … các thông số khác
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Hàm trả DocumentRef cho collection "favorites" → doc id = phone
function getFavoritesDocRef(phone) {
  return doc(db, "favorites", phone);
}

// Lấy mảng favorites (mảng object { id, login }) theo phone
export async function fetchFavoritesByPhone(phone) {
  const docRef = getFavoritesDocRef(phone);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    return data.favorite_github_users || [];
  } else {
    return [];
  }
}

// Thêm một đối tượng { id, login } vào mảng favorite_github_users
export async function addFavorite(phone, userObj) {
  const docRef = getFavoritesDocRef(phone);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    await updateDoc(docRef, {
      favorite_github_users: arrayUnion(userObj)
    });
  } else {
    await setDoc(docRef, {
      favorite_github_users: [userObj]
    });
  }
}

// Xóa một đối tượng { id, login } khỏi mảng favorite_github_users
export async function removeFavorite(phone, userObj) {
  const docRef = getFavoritesDocRef(phone);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    await updateDoc(docRef, {
      favorite_github_users: arrayRemove(userObj)
    });
  }
}

export { db };
