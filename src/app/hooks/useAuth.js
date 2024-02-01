import { useState, useEffect, useContext, createContext } from 'react';
import { FIREBASE_AUTH } from '../Config/FirebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

// Utworzenie kontekstu auth
const AuthContext = createContext();

// Hook do używania kontekstu
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider, który będzie owijał główną część aplikacji
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Oczyszczenie subskrypcji przy odmontowywaniu komponentu
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
