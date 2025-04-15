import React, { createContext, useState } from 'react';

export const AuthContext = createContext({
  userToken: '',
  firstName : '',
  lastName : '',
  signIn: () => {},
  signOut: () => {},
});

export function AuthProvider({ children }) {

  const [userToken, setUserToken] = useState('');

  const [firstName, setFirstName] = useState('');

  const [lastName, setLastName] = useState('');


  // This function will be called on successful login
  const signIn = (token) => { 

    setUserToken(token);
  };

  const user = (fName, lName) =>{

    setFirstName(fName);

    setLastName(lName);
  }

  // You can also implement signOut to clear the token
  const signOut = () => {
    setUserToken('');
  };

  return (
    <AuthContext.Provider value={{ userToken, firstName, lastName, signIn, signOut, user }}>
      {children}
    </AuthContext.Provider>
  );
}
