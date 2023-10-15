import { createContext, useEffect, useState } from "react";
import React from 'react'

export let authContext = createContext();



export default function AuthProvider({children}) {
    const [token, setToken] = useState(null)
    
    useEffect(function() {
      if (localStorage.getItem('token') !== null) {
        setToken(localStorage.getItem('token'));
       
    };
    }, []);
    
  return <authContext.Provider value={{token, setToken}}>
    {children}
  </authContext.Provider>
}
