/**
 * Setup script - spusti cez: node seed.cjs
 */

const { initializeApp } = require("firebase/app");
const { getFunctions, httpsCallable } = require("firebase/functions");

const firebaseConfig = {
  apiKey: "AIzaSyCQr6Q8-TPvqQ51BN6eUiOZh-ZkGA6PlY0",
  authDomain: "monsterpizza.firebaseapp.com",
  projectId: "monsterpizza",
  storageBucket: "monsterpizza.firebasestorage.app",
  messagingSenderId: "264674141304",
  appId: "1:264674141304:web:420f1866ef658cb31fb98d",
};

const app = initializeApp(firebaseConfig);
const functions = getFunctions(app, "europe-west1");

async function seedProducts() {
  console.log("Seeding products...");
  
  const seedProductsFn = httpsCallable(functions, "seedProducts");
  const result = await seedProductsFn();
  
  console.log("Result:", result.data);
  console.log("\nDone! Products seeded.");
  process.exit(0);
}

seedProducts().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
