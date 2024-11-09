import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export const useAuth = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("Token found, isAuthenticated set to true");
    }
  }, []);

  const login = async (email: string, password: string) => {
    setError(null);
    try {
      const response = await axios.post("/api/signin", { email, password });
      localStorage.setItem("token", response.data.token);
      console.log("Login successful, isAuthenticated set to true");
      router.push("/");
    } catch (error) {
      setError("Failed to login");
      console.error("Failed to login", error);
    }
  };

  const signUp = async (email: string, password: string) => {
    setError(null);
    try {
      const response = await axios.post("/api/signup", { email, password });
      localStorage.setItem("token", response.data.token);
      console.log("Sign up successful, isAuthenticated set to true");
      router.push("/");
    } catch (error) {
      setError("Failed to sign up");
      console.error("Failed to sign up", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/signin");
  };

  return { login, signUp, logout, error };
};
