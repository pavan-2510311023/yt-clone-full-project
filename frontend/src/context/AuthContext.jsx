import React, { createContext, useReducer, useContext } from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
};

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

// ✅ Export custom hook
export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
