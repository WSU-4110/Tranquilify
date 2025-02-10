import React, { createContext, useState } from 'react';

export const AuthContext = createContext({
  userToken: null,
  signIn: () => {},
  signOut: () => {},
});

export function AuthProvider({ children }) {
  const [userToken, setUserToken] = useState(null);

  // This function will be called on successful login
  const signIn = (token) => {
    setUserToken(token);
  };

  // You can also implement signOut to clear the token
  const signOut = () => {
    setUserToken(null);
  };

  return (
    <AuthContext.Provider value={{ userToken, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
