import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { auth } from '../config/firebase';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Sign Up Function (Create new user)
  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // 2. Login Function (Sign in existing user)
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // 3. Logout Function
  function logout() {
    return signOut(auth);
  }

  // 4. Auth State Listener (Runs once on mount)
  // This checks if Firebase remembers the user from a previous session
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false); // Stop loading once we know the status
    });

    return unsubscribe; // Cleanup subscription on unmount
  }, []);

  const value = {
    currentUser,
    // We keep 'isAuthenticated' so your existing ProtectedRoutes still work!
    isAuthenticated: !!currentUser, 
    signup,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {/* We only render the app after we check if the user is logged in */}
      {!loading && children}
    </AuthContext.Provider>
  );
};