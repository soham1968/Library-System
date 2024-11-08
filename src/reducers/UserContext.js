import React, { createContext, useContext, useEffect, useReducer } from "react";
import { auth } from "../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";

import userReducer from "./userReducer";

const UserContext = createContext({
  state: { user: null, loading: true },
  dispatch: () => null,
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, {
    user: null,
    loading: true,
  });

  useEffect(() => {
    dispatch({ type: "SET_LOADING", payload: true });
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser && !state.user) {
        try {
          const token = await firebaseUser.getIdToken();
          localStorage.setItem("token", token);
          const response = await fetch("/api/auth", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: firebaseUser.email,
              token,
              firebaseUID: firebaseUser.uid,
            }),
          });
          const data = await response.json();
          dispatch({ type: "SET_USER", payload: data });
          dispatch({ type: "SET_LOADING", payload: false });
        } catch (error) {
          console.error("Error validating token:", error);
          dispatch({ type: "SET_LOADING", payload: false });
          dispatch({ type: "CLEAR_USER" });
        }
      } else {
        dispatch({ type: "CLEAR_USER" });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
