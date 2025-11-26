import { createContext, useContext, useState, useEffect, useMemo } from "react";
import type { ReactNode } from "react";

interface UserType {
  id: string;
  fullName: string;
  phoneNumber: string;
  address: string;
  dateOfBirth: string;
  profileImageUrl: string | null;
  churchTitle: string;
  confessionFather: string;
  role: string;
}

interface AuthContextType {
  token: string | null;
  user: UserType | null;
  setAuth: (token: string | null, user: UserType | null) => void;
  clearToken: () => void;
}

// Export AuthContext
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("authUser");
    if (storedToken) {
      setToken(storedToken);
    }
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const setAuth = (newToken: string | null, newUser: UserType | null) => {
    setToken(newToken);
    setUser(newUser);
    if (newToken) {
      localStorage.setItem("authToken", newToken);
    } else {
      localStorage.removeItem("authToken");
    }
    if (newUser) {
      localStorage.setItem("authUser", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("authUser");
    }
  };

  const clearToken = () => {
    setAuth(null, null);
  };

  const value = useMemo(
    () => ({ token, user, setAuth, clearToken }),
    [token, user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
