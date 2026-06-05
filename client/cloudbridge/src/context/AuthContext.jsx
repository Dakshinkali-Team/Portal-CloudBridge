/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import {
  AUTH_CHANGE_EVENT,
  clearAuthSession,
  getAuthSession,
  getDefaultRouteForRole,
  persistAuthSession,
} from "../utils/auth";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => getAuthSession());

  useEffect(() => {
    const syncAuth = () => {
      setAuth(getAuthSession());
    };

    window.addEventListener(AUTH_CHANGE_EVENT, syncAuth);
    window.addEventListener("storage", syncAuth);

    return () => {
      window.removeEventListener(AUTH_CHANGE_EVENT, syncAuth);
      window.removeEventListener("storage", syncAuth);
    };
  }, []);

  const signIn = ({ token, role }) => {
    const nextAuth = persistAuthSession({ token, role });
    setAuth(nextAuth);
    return nextAuth;
  };

  const signOut = () => {
    clearAuthSession();
    setAuth(getAuthSession());
  };

  const refreshAuth = () => {
    setAuth(getAuthSession());
  };

  return (
    <AuthContext.Provider
      value={{
        ...auth,
        defaultRoute: getDefaultRouteForRole(auth.role),
        signIn,
        signOut,
        refreshAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
