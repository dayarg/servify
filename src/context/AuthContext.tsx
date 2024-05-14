import { createContext, useState, useEffect, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  UserCredential,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/config";

interface AuthContextType {
    signUp: (email: string, password: string) => Promise<UserCredential>;
    logIn: (email: string, password: string) => Promise<UserCredential>;
    authGoogle: () => Promise<UserCredential>;
    logOut: () => Promise<void>;
    currentUser: User | null;
}

const AuthContext = createContext<AuthContextType>({
    signUp: async (email: string, password: string) => ({} as UserCredential),
    logIn: async (email: string, password: string) => ({} as UserCredential),
    authGoogle: async () => ({} as UserCredential),
    logOut: async () => {},
    currentUser: null,
});

export const useAuth = () => useContext(AuthContext);
export const AuthProvider = (props: any) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => {
      unsuscribe();
    }
  }, []);

  const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const logIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const authGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }

  const logOut = () => signOut(auth);

  const value = { signUp, logIn, authGoogle, logOut, currentUser };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};
