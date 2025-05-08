
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { user, logout, isAdmin } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-room-primary">Room Control Hub</span>
          </Link>
          
          {user && (
            <div className="hidden md:flex items-center space-x-4">
              {isAdmin ? (
                <>
                  <Link to="/admin" className="text-gray-600 hover:text-room-primary transition-colors">
                    Admin Dashboard
                  </Link>
                </>
              ) : (
                <Link to="/room" className="text-gray-600 hover:text-room-primary transition-colors">
                  Room Control
                </Link>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="hidden md:inline text-sm text-gray-600">
                Logged in as <span className="font-semibold">{user.username}</span> ({user.role})
              </span>
              <Button variant="outline" onClick={logout}>
                Log out
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button>Log in</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
