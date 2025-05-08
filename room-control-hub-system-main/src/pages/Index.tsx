
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  const { user, isAdmin } = useAuth();

  // If user is already logged in, redirect to appropriate page
  if (user) {
    return <Navigate to={isAdmin ? "/admin" : "/room"} />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-gray-100">
      <div className="text-center max-w-3xl px-4">
        <h1 className="text-4xl font-bold mb-6 text-room-primary">Room Control Hub System</h1>
        <p className="text-xl text-gray-600 mb-8">
          A comprehensive solution for classroom management and device control
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">Administrator Features</h2>
            <ul className="list-disc text-left pl-5 space-y-2 mb-6">
              <li>Control lights, screens, and projectors</li>
              <li>Set up automated schedules for devices</li>
              <li>Customize user control panels</li>
              <li>View and resolve reported issues</li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">User Features</h2>
            <ul className="list-disc text-left pl-5 space-y-2 mb-6">
              <li>Simple, intuitive control panel</li>
              <li>Control classroom devices with ease</li>
              <li>Report technical issues to administrators</li>
              <li>Access from any device with a browser</li>
            </ul>
          </div>
        </div>
        
        <Link to="/login">
          <Button size="lg" className="text-lg px-8 py-6">
            Login to System
          </Button>
        </Link>
        
        <div className="mt-8 text-gray-500">
          <p>For demonstration:</p>
          <p>Admin credentials: admin / admin123</p>
          <p>User credentials: user / user123</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
