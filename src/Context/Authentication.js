import jwtDecode from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import React from 'react'

export let authContext = createContext();



export default function AuthProvider({children}) {
    const [token, setToken] = useState(null)
    const [name, setName] = useState(null)
    
    useEffect(function() {
      if (localStorage.getItem('token') !== null) {
        setToken(localStorage.getItem('token'));
        let res =jwtDecode(localStorage.getItem('token'))
        setName(res.name)
       
    };
    }, []);
    
  return <authContext.Provider value={{token, setToken, name}}>
    {children}
  </authContext.Provider>
}
