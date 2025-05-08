
import React from "react";
import { useRoom } from "@/context/RoomContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, LightbulbOff, Monitor, Projector, AlertTriangle } from "lucide-react";
import IssueReport from "./IssueReport";
import { Separator } from "@/components/ui/separator";

export function RoomControl() {
  const { currentRoom, toggleDevice } = useRoom();
  const [showIssueReport, setShowIssueReport] = React.useState(false);

  if (!currentRoom) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-6">
            <div className="text-center py-8">
              <h3 className="text-lg font-medium text-gray-500">No room selected</h3>
              <p className="text-sm text-gray-400 mt-1">Please contact an administrator</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="border-none shadow-lg">
        <CardHeader className="bg-gradient-to-r from-room-primary to-blue-500 text-white rounded-t-lg">
          <CardTitle className="text-2xl">{currentRoom.name} Control Panel</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Lights Section */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Lightbulb className="mr-2 h-5 w-5" />
                  Lights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {currentRoom.devices.lights.map((light) => (
                    <Button
                      key={light.id}
                      variant={light.status ? "default" : "outline"}
                      className={`h-24 ${
                        light.status ? "bg-room-warning text-black" : ""
                      }`}
                      onClick={() => toggleDevice(currentRoom.id, "light", light.id)}
                    >
                      <div className="flex flex-col items-center space-y-2">
                        {light.status ? (
                          <Lightbulb className="h-6 w-6" />
                        ) : (
                          <LightbulbOff className="h-6 w-6" />
                        )}
                        <span>{light.name}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Screens Section */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Monitor className="mr-2 h-5 w-5" />
                  Screens
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {currentRoom.devices.screens.length > 0 ? (
                    currentRoom.devices.screens.map((screen) => (
                      <Button
                        key={screen.id}
                        variant={screen.status ? "default" : "outline"}
                        className={`h-24 ${
                          screen.status ? "bg-room-primary" : ""
                        }`}
                        onClick={() => toggleDevice(currentRoom.id, "screen", screen.id)}
                      >
                        <div className="flex flex-col items-center space-y-2">
                          <Monitor className="h-6 w-6" />
                          <span>{screen.name}</span>
                        </div>
                      </Button>
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-8 text-gray-500">
                      No screens available
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Projectors Section */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Projector className="mr-2 h-5 w-5" />
                  Projectors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {currentRoom.devices.projectors.length > 0 ? (
                    currentRoom.devices.projectors.map((projector) => (
                      <Button
                        key={projector.id}
                        variant={projector.status ? "default" : "outline"}
                        className={`h-24 ${
                          projector.status ? "bg-room-primary" : ""
                        }`}
                        onClick={() =>
                          toggleDevice(currentRoom.id, "projector", projector.id)
                        }
                      >
                        <div className="flex flex-col items-center space-y-2">
                          <Projector className="h-6 w-6" />
                          <span>{projector.name}</span>
                        </div>
                      </Button>
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-8 text-gray-500">
                      No projectors available
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <Separator className="my-8" />

          <div className="flex justify-center">
            <Button 
              variant="outline" 
              className="flex items-center text-room-danger" 
              onClick={() => setShowIssueReport(true)}
            >
              <AlertTriangle className="mr-2 h-5 w-5" />
              Report an Issue
            </Button>
          </div>

          {showIssueReport && (
            <IssueReport 
              roomId={currentRoom.id} 
              devices={[
                ...currentRoom.devices.lights,
                ...currentRoom.devices.screens,
                ...currentRoom.devices.projectors
              ]}
              onClose={() => setShowIssueReport(false)}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default RoomControl;
