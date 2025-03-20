import React, { createContext, useState } from 'react';

export const AuthContext = createContext({
  uid: null,
  signIn: () => {},
  signOut: () => {},
});

export function AuthProvider({ children }) {
  const [uid, setUID] = useState(null);

  // This function will be called on successful login
  const signIn = (token) => {
    setUID(token);
  };

  // You can also implement signOut to clear the token
  const signOut = () => {
    setUID(null);
  };

  return (
    <AuthContext.Provider value={{ uid, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
