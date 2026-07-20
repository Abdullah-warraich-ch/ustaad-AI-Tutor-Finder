import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  updateProfile 
} from "firebase/auth";

// Your Firebase web application configuration loaded strictly from .env
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Singleton initialization to prevent duplicate app instances in Next.js HMR
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

/**
 * Refactored Sign Up function
 * @param {string} email 
 * @param {string} password 
 * @param {string} displayName 
 * @returns {Promise<{user: object, error: null|string}>}
 */
export async function signUpUser(email, password, displayName = "") {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName && userCredential.user) {
      await updateProfile(userCredential.user, { displayName });
    }
    return { user: userCredential.user, error: null };
  } catch (err) {
    console.error("Firebase SignUp Error:", err);
    return { user: null, error: formatAuthError(err.code || err.message) };
  }
}

/**
 * Refactored Sign In function
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<{user: object, error: null|string}>}
 */
export async function signInUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (err) {
    console.error("Firebase SignIn Error:", err);
    return { user: null, error: formatAuthError(err.code || err.message) };
  }
}

/**
 * Refactored Sign Out function
 */
export async function logoutUser() {
  try {
    await signOut(auth);
    return { success: true, error: null };
  } catch (err) {
    console.error("Firebase Logout Error:", err);
    return { success: false, error: err.message };
  }
}

/**
 * Helper utility to map Firebase error codes to user-friendly messages
 */
function formatAuthError(code) {
  switch (code) {
    case "auth/email-already-in-use":
      return "An account with this email already exists.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/weak-password":
      return "Password should be at least 6 characters long.";
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Invalid email or password. Please check your credentials.";
    default:
      return "Authentication failed. Please try again.";
  }
}
