
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

type UserType = "student" | "institution" | null;

interface User {
  id: string;
  name: string;
  email: string;
  type: UserType;
}

interface AuthContextValue {
  user: User | null;
  userType: UserType;
  login: (email: string, password: string, type: UserType) => Promise<void>;
  register: (name: string, email: string, password: string, type: UserType) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Initialize user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // In a real app, this would make API calls to your backend
  const login = async (email: string, password: string, type: UserType) => {
    try {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // For demo purposes, any credentials will work
      const userData = {
        id: Math.random().toString(36).substring(2, 15),
        name: email.split('@')[0], // Use part of email as name for demo
        email,
        type
      };
      
      setUser(userData);
      
      // Store in localStorage
      localStorage.setItem("user", JSON.stringify(userData));
      
      toast({
        title: "Logged in successfully",
        description: `Welcome back!`,
      });
      
      // Redirect based on user type
      if (type === "student") {
        navigate("/student/dashboard");
      } else {
        navigate("/institution/dashboard");
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, type: UserType) => {
    try {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // For demo purposes, registration always succeeds
      const userData = {
        id: Math.random().toString(36).substring(2, 15),
        name,
        email,
        type
      };
      
      setUser(userData);
      
      // Store in localStorage
      localStorage.setItem("user", JSON.stringify(userData));
      
      toast({
        title: "Registration successful",
        description: `Your ${type} account has been created.`,
      });
      
      // Redirect based on user type
      if (type === "student") {
        navigate("/student/dashboard");
      } else {
        navigate("/institution/dashboard");
      }
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
    toast({
      title: "Logged out",
      description: "You have been signed out successfully.",
    });
  };

  const value = {
    user,
    userType: user?.type || null,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
