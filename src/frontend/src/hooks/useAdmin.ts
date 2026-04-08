import { useCallback, useEffect, useState } from "react";

const ADMIN_EMAIL = "basharatbashir033@gmail.com";
const SESSION_KEY = "studenthub-admin-session";

interface AdminSession {
  isAdmin: boolean;
  email: string;
  loginTime: number;
}

export function useAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (raw) {
        const session: AdminSession = JSON.parse(raw);
        // Session valid for 8 hours
        const age = Date.now() - session.loginTime;
        if (session.isAdmin && age < 8 * 60 * 60 * 1000) {
          setIsAdmin(true);
        } else {
          sessionStorage.removeItem(SESSION_KEY);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate async check
      await new Promise((resolve) => setTimeout(resolve, 400));
      if (email === ADMIN_EMAIL && password === "admin123") {
        const session: AdminSession = {
          isAdmin: true,
          email,
          loginTime: Date.now(),
        };
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
        setIsAdmin(true);
        return true;
      }
      setError("Invalid email or password");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    setIsAdmin(false);
  }, []);

  return { isAdmin, isLoading, error, login, logout };
}
