import React, { useContext, useState, useEffect } from "react";
import { auth, methods } from "./firebase";

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();

  //Set le user courant une seule fois
  useEffect(() => {
    const unsubscribe = methods.onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);

      if (user) {
        const accessToken = user.accessToken;
        setToken(accessToken);
        //console.log("token", accessToken);
      }

      setLoading(false);

      //console.log(user.uid)
    });

    //unsubscribe la methode onAuthStateChanged quand le component est unmounted
    return unsubscribe;
  }, []);

  const signup = async (email, password, name) => {
    await methods.createUserWithEmailAndPassword(auth, email, password, name);
    methods.updateProfile(auth.currentUser, { displayName: name });
  };

  const login = (email, password) => {
    return methods.signInWithEmailAndPassword(auth, email, password);
    
  };

  const logout = () => {
    return methods.signOut(auth);
  };

  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  };

  const updateEmail = async (email) => {
    try{
     await methods.updateEmail(auth.currentUser, email);
    }catch(err){
      console.log(err.message)
     } 
  };

  const updatePassword = async (password) => {
    try{
      await methods.updatePassword(auth.currentUser, password);
    }catch(err){
      console.log(err.message)
    }
  };

  const updateProfile = async (name) => {
    try{
      await methods.updateProfile(auth.currentUser, { displayName: name });
    }catch(err){
      console.log(err.message)
    }
  }

  const value = {
    currentUser,
    token,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
