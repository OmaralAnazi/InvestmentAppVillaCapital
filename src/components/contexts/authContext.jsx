import { useContext, useState, useEffect, createContext } from "react";
import { auth } from "../../util/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Loading from "../layout/Loading";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const initializeUser = (user) => {
    if (user && user.emailVerified) {
      setUserLoggedIn(true);
      setCurrentUser({ ...user });
    } else {
      setUserLoggedIn(false);
      setCurrentUser(null);
    }
    setLoading(false);
  };

  const value = {
    userLoggedIn,
    currentUser,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={value}>{loading ? <Loading /> : children}</AuthContext.Provider>;
}
