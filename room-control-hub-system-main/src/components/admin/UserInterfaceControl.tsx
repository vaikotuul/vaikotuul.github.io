
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export function UserInterfaceControl() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">User Interface Control</h2>
        <p className="text-gray-500">Customize the user interface for room controls</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Interface Customization</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              This feature is coming soon. In the future, you'll be able to customize the user interface for each room.
            </AlertDescription>
          </Alert>
          
          <div className="mt-4 text-gray-600">
            <p>Planned features:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Change button sizes and colors</li>
              <li>Rearrange control elements</li>
              <li>Add or remove functions</li>
              <li>Create custom control views</li>
              <li>Add room-specific instructions</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default UserInterfaceControl;
