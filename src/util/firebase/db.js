import { db } from "./firebase";
import { doc, setDoc, getDoc, updateDoc, collection, getDocs } from "firebase/firestore";

export async function saveUserToDatabase(user) {
  const simplifiedUser = {
    id: user.uid, 
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    investments: [] 
  };
  
  const userRef = doc(db, "users", simplifiedUser.id);
  try {
    await setDoc(userRef, simplifiedUser);
  } catch (ex) {
    console.error("Error saving user to Firestore:", ex);
    throw new Error("Failed to save user data.");
  }
}

export async function getUserFromDatabase(userId) {
  try {
    const userRef = doc(db, "users", userId); 
    const userSnapshot = await getDoc(userRef);
    if (!userSnapshot.exists()) {
      throw new Error("User not found."); // ensure to rethrow it in the catch block
    } 
    const userData = userSnapshot.data();
    return userData;
  } catch (ex) {
    console.error("Error fetching user data from Firestore:", ex);
    if (ex.message === "User not found.")
        throw ex;
    throw new Error("Failed to fetch user data.");
  }
}

export async function addInvestmentToUser(userId, investment, investedAmount) {
  if (investedAmount < investment.minimumInvestmentAmount) {
    throw new Error(`Minimum investment: $${investment.minimumInvestmentAmount}.`);
  }

  const today = new Date().toISOString().split("T")[0]; // Format: "YYYY-MM-DD"

  const simplifiedInvestment = {
    id: investment.id,
    picUrl: investment.picUrl,
    name: investment.name,
    description: investment.description,
    date: today,
    investedAmount: investedAmount,
    potentialReturnsAtDate: { min: investment.potentialReturns.min, max: investment.potentialReturns.max },
  };

  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      throw new Error("User not found."); // ensure to rethrow it in the catch block 
    }
    const userData = userSnap.data();
    await updateDoc(userRef, {
      investments: [...(userData.investments || []), simplifiedInvestment] 
    });
  } catch (ex) {
    console.error("Error adding investment to user:", ex);
    if (ex.message === "User not found.")
        throw ex;
    throw new Error("Failed to add investment to user.");
  }
}

export async function getAllInvestmentsFromDatabase() {
  try {
    const investmentsCollectionRef = collection(db, "investments");
    const investmentsSnapshot = await getDocs(investmentsCollectionRef);
    const investments = investmentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return investments;
  } catch (ex) {
    console.error("Error fetching investments from Firestore:", ex);
    throw new Error("Failed to load investments.");
  }
}

export async function getInvestmentFromDatabase(investmentId) {
  try {
    const investmentRef = doc(db, "investments", investmentId); 
    const investmentSnapshot = await getDoc(investmentRef); 
    if (!investmentSnapshot.exists()) {
      throw new Error("Investment not found."); // ensure to rethrow it in the catch block 
    }
    const investmentData = investmentSnapshot.data();
    return investmentData;
  } catch (ex) {
    console.error("Error fetching investment data from Firestore:", ex);
    if (ex.message === "Investment not found.")
        throw ex;
    throw new Error("Failed to fetch investment data.");
  }
}