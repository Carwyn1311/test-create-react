
import admin from "firebase-admin";
import fs from "fs";
import path from "path";


const serviceAccountPath = path.resolve("serviceAccountKey.json");
const serviceAccountJSON = JSON.parse(
  fs.readFileSync(serviceAccountPath, "utf-8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountJSON),
});


export const db = admin.firestore();