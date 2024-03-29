import { auth } from "./firebase";
import { saveUserToDatabase } from "./db";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  sendEmailVerification,
} from "firebase/auth";

export async function doCreateUserWithEmailAndPassword(displayName, email, password, confirmPassword) {
  if (!/^[a-zA-Z\s]+$/.test(displayName)) throw new Error("Name should contain letters only.");
  if (password.length < 6) throw new Error("Password should be 6 characters at least.");
  if (password !== confirmPassword) throw new Error("Password doesn't match the confirm password.");

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: displayName });
    await saveUserToDatabase(userCredential.user);
    return userCredential;
  } catch (ex) {
    console.error(ex);
    if (ex.code === "auth/email-already-in-use")
        throw new Error("This email is already in use.");
    if (ex.code === "auth/weak-password")
        throw new Error("The password is too weak.");
    if (ex.code === "auth/network-request-failed")
        throw new Error("Network error. Please check your connection and try again.");
    if (ex.code === "auth/invalid-email")
      throw new Error("Invalid email address.");
    throw new Error("An unexpected error occurred. Please try again.");
  }
}

export async function doSignInWithEmailAndPassword(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    if (!userCredential.user.emailVerified) {
      await sendEmailVerification(userCredential.user);
      throw new Error("Email not verified."); // ensure to rethrow it in the catch block
    }
    return userCredential;
  } catch (ex) {
    console.error(ex);
    if (ex.message === "Email not verified.")
      throw ex;
    if (ex.code === "auth/invalid-email")
        throw new Error("Invalid email address.");
    if (ex.code === "auth/user-disabled")
        throw new Error("This account has been disabled.");
    if (ex.code === "auth/user-not-found" || ex.code === "auth/invalid-credential")
        throw new Error("Invalid email or password.");
    if (ex.code === "auth/network-request-failed")
        throw new Error("Network error. Please check your connection and try again.");
    throw new Error("An error occurred during sign-in. Please try again.");
  }
}

export async function doSignOut() {
  try {
    await auth.signOut();
  } catch (ex) {
    console.error("Error signing out:", ex);
    throw new Error("Failed to sign out. Please try again.");
  }
}

export async function doPasswordReset(email) {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (ex) {
    console.error("Error sending password reset email:", ex);
    if (ex.code === "auth/invalid-email") 
          throw new Error("Invalid email address.");
    throw new Error("Failed to send password reset email. Please try again.");
  }
}

export async function doSendEmailVerification() {
  try {
    await sendEmailVerification(auth.currentUser, {
      url: `${window.location.origin}/account`,
    });
  } catch (ex) {
    console.error("Error sending email verification:", ex);
    throw new Error("Failed to send email verification. Please try again.");
  }
}
