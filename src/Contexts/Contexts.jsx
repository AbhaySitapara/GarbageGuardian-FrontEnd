import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const AuthContext = createContext();

// Create a provider component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null); // State for token
  

  // When the component mounts, fetch the token from local storage
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        const decodedToken = JSON.parse(atob(storedToken.split('.')[1])); // Decode JWT token
        setUser(decodedToken); // Save the user data globally
        setToken(storedToken); // Save the token globally
        console.log(decodedToken);
      } catch (error) {
        console.error("Invalid token", error);
        localStorage.removeItem('token'); // Clear invalid token
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
