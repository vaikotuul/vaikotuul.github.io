
import React, { createContext, useState, useContext, ReactNode } from "react";
import { useToast } from "@/components/ui/use-toast";

type User = {
  id: string;
  username: string;
  role: "admin" | "user";
};

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const MOCK_USERS = [
  { id: "1", username: "admin", password: "admin123", role: "admin" as const },
  { id: "2", username: "user", password: "user123", role: "user" as const },
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();
  
  // Check if user is stored in localStorage on initial load
  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Simulating API call with mock data
    const foundUser = MOCK_USERS.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      toast({
        title: "Login successful",
        description: `Welcome, ${username}!`,
      });
      return true;
    }
    
    toast({
      variant: "destructive",
      title: "Login failed",
      description: "Invalid username or password",
    });
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
