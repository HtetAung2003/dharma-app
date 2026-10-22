// context/AuthContext.tsx (နမူနာ)
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../services/firebaseConfig';

interface UserData {
  fullName?: string;
  email?: string;
  createdAt?: string;
}
const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      try {
        if (firebaseUser) {
          // Firestore မှ User Data (FullName) ကို ဆွဲယူမည်
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          }
        } else {
          setUser(null);
          setUserData(null);
        }
      } catch (error) {
        console.warn('Failed to load authenticated user data', error);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, userData, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
