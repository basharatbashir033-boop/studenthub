import { useActor } from "@caffeineai/core-infrastructure";
import { useCallback, useEffect, useState } from "react";
import { createActor } from "../backend";

const SESSION_KEY = "studenthub-admin-session";

interface AdminSession {
  isAdmin: boolean;
  loginTime: number;
}

export function useAdmin() {
  const { actor, isFetching } = useActor(createActor);
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

  const login = useCallback(
    async (email: string, password: string) => {
      if (!actor || isFetching) {
        setError("Backend not ready. Please try again.");
        return false;
      }
      setIsLoading(true);
      setError(null);
      try {
        const ok = await actor.adminLogin(email, password);
        if (ok) {
          const session: AdminSession = {
            isAdmin: true,
            loginTime: Date.now(),
          };
          sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
          setIsAdmin(true);
          return true;
        }
        setError("Invalid email or password");
        return false;
      } catch {
        setError("Login failed. Please try again.");
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [actor, isFetching],
  );

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    setIsAdmin(false);
  }, []);

  return { isAdmin, isLoading, error, login, logout };
}
