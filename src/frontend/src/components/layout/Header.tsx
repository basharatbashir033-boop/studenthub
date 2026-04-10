import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "@tanstack/react-router";
import { GraduationCap, LogOut, Menu, Moon, Sun } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";
import { useAppStore } from "../../store/useAppStore";

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { setSidebarOpen } = useAppStore();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate({ to: "/login" });
  }

  return (
    <header
      className="sticky top-0 z-50 w-full bg-card border-b border-border shadow-subtle"
      data-ocid="main-header"
    >
      <div className="flex h-14 items-center gap-3 px-4 md:px-6">
        {/* Mobile menu trigger */}
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0 md:hidden"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open navigation menu"
          data-ocid="mobile-menu-trigger"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 shrink-0 transition-smooth hover:opacity-80"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <GraduationCap className="h-5 w-5 text-primary" />
          </div>
          <span className="font-display text-lg font-semibold tracking-tight">
            <span className="text-foreground">Student</span>
            <span className="text-primary">Hub</span>
          </span>
        </Link>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* User email — shown when authenticated */}
          {isAuthenticated && user && (
            <span
              className="hidden sm:inline-block max-w-[160px] truncate text-xs text-muted-foreground"
              title={user.email}
              data-ocid="header-user-email"
            >
              {user.email}
            </span>
          )}

          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            data-ocid="theme-toggle"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>

          {/* Admin link */}
          {isAuthenticated && (
            <Link to="/admin">
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:flex text-xs h-8"
                data-ocid="admin-nav-btn"
              >
                Admin
              </Button>
            </Link>
          )}

          {/* Logout button */}
          {isAuthenticated && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              aria-label="Sign out"
              data-ocid="header-logout"
              className="text-muted-foreground hover:text-foreground"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
