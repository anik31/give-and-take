import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile
} from "firebase/auth";
import { auth } from "config/firebase-config";
import { useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const loginUser = async(email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
    setIsLoggedIn(true);
    navigate(location?.state?.from?.pathname || "/");
  };

  const signUpUser = async({email, password, displayName}) => {
    await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser,{displayName});
    setIsLoggedIn(true);
    navigate(location?.state?.from?.pathname || "/");
  };

  const logoutUser = async() => {
    await signOut(auth);
    navigate("/login");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, loggedInUser => setUser(loggedInUser));
    return () => unsubscribe();
  }, []);

  useEffect(()=>{
    if(user){
      setIsLoggedIn(true);
    }
  },[user]);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, loginUser, signUpUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };