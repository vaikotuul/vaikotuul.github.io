
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { RoomProvider } from "@/context/RoomContext";
import Navbar from "@/components/layout/Navbar";
import RoomControl from "@/components/user/RoomControl";

export function User() {
  const { user } = useAuth();

  // If user is not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <RoomProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-grow">
          <RoomControl />
        </div>
      </div>
    </RoomProvider>
  );
}

export default User;
