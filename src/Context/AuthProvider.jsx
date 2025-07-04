import { 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut 
} from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext';
import { auth } from '../Firebase/Firebase.init';

const AuthProvider = ({children}) => {

  const [loading, setLoading]=useState(true);
  const [user, setUser]=useState(null);


  const createUser = async(email, password)=>{
    setLoading(true);
  return createUserWithEmailAndPassword(auth, email, password);
  }
  const signInWithGoogle =async()=>{
    const Provider = new GoogleAuthProvider;
    return signInWithPopup(auth, Provider);
  }
  const SignInUser =async(email, password)=>{
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }
  const SignOut =async()=>{
    setLoading(true);
    return signOut(auth)
  }


  useEffect(()=>{
    const unSubscribe =onAuthStateChanged(auth, currentUser =>{
      setUser(currentUser);
      console.log("change the user",currentUser);
      setLoading(false)
    })
    return ()=>{
      unSubscribe()
    } 
  },[])

  const AuthInfo={
    user,
    loading,
    createUser,
    signInWithGoogle,
    SignInUser,
    SignOut
  }

  return (
    <AuthContext.Provider value={AuthInfo}>
     {children}
    </AuthContext.Provider>
  )
};

export default AuthProvider;