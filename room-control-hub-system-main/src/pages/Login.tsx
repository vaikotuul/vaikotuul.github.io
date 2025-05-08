
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  React.useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/room");
      }
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(username, password);
    if (success) {
      // Navigation will happen in the effect above
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-4">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Room Control Hub</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access the system
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </CardFooter>
          </form>
          <CardFooter className="flex flex-col space-y-2 border-t pt-4">
            <div className="text-center text-sm text-gray-500">
              <p>For demo purposes:</p>
              <p>Admin login: admin / admin123</p>
              <p>User login: user / user123</p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default Login;
