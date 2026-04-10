import { useActor } from "@caffeineai/core-infrastructure";
import { useCallback, useEffect, useState } from "react";
import { createActor } from "../backend";

const STORAGE_KEY = "studenthub_user";

interface StoredUser {
  id: string;
  email: string;
}

interface AuthState {
  user: StoredUser | null;
  isAuthenticated: boolean;
}

function loadStoredUser(): StoredUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredUser;
    if (parsed.id && parsed.email) return parsed;
    return null;
  } catch {
    return null;
  }
}

/** Wait up to `ms` milliseconds for a condition to become true, polling every 100ms. */
async function waitFor(condition: () => boolean, ms: number): Promise<boolean> {
  const deadline = Date.now() + ms;
  while (Date.now() < deadline) {
    if (condition()) return true;
    await new Promise((r) => setTimeout(r, 100));
  }
  return false;
}

export function useAuth() {
  const { actor, isFetching } = useActor(createActor);

  const [authState, setAuthState] = useState<AuthState>(() => {
    const stored = loadStoredUser();
    return { user: stored, isAuthenticated: stored !== null };
  });

  useEffect(() => {
    const stored = loadStoredUser();
    setAuthState({ user: stored, isAuthenticated: stored !== null });
  }, []);

  const login = useCallback(
    async (
      email: string,
      password: string,
    ): Promise<{ success: boolean; error?: string }> => {
      // If actor isn't ready yet, wait up to 4s for it to initialize
      if (!actor || isFetching) {
        const ready = await waitFor(() => !!actor && !isFetching, 4000);
        if (!ready || !actor) {
          return {
            success: false,
            error:
              "Still connecting to the server. Please wait a moment and try again.",
          };
        }
      }
      try {
        const result = await actor.loginStudent(email, password);
        if (result.ok) {
          const user: StoredUser = { id: result.ok.id, email: result.ok.email };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
          setAuthState({ user, isAuthenticated: true });
          return { success: true };
        }
        return {
          success: false,
          error: result.err ?? "Invalid email or password.",
        };
      } catch (e) {
        console.error("Login error:", e);
        return {
          success: false,
          error: "An unexpected error occurred. Please try again.",
        };
      }
    },
    [actor, isFetching],
  );

  const register = useCallback(
    async (
      email: string,
      password: string,
    ): Promise<{ success: boolean; error?: string }> => {
      // If actor isn't ready yet, wait up to 4s for it to initialize
      if (!actor || isFetching) {
        const ready = await waitFor(() => !!actor && !isFetching, 4000);
        if (!ready || !actor) {
          return {
            success: false,
            error:
              "Still connecting to the server. Please wait a moment and try again.",
          };
        }
      }
      try {
        const result = await actor.registerStudent(email, password);
        if (result.ok) {
          const user: StoredUser = { id: result.ok.id, email: result.ok.email };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
          setAuthState({ user, isAuthenticated: true });
          return { success: true };
        }
        return {
          success: false,
          error: result.err ?? "Registration failed. Please try again.",
        };
      } catch (e) {
        console.error("Register error:", e);
        return {
          success: false,
          error: "An unexpected error occurred. Please try again.",
        };
      }
    },
    [actor, isFetching],
  );

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setAuthState({ user: null, isAuthenticated: false });
  }, []);

  return {
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    isFetching,
    actor,
    login,
    register,
    logout,
  };
}
