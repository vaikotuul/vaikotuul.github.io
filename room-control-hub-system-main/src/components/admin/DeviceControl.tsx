
import React from "react";
import { useRoom, DeviceType } from "@/context/RoomContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LightbulbOff, Lightbulb, Monitor, Power, PowerOff, Projector } from "lucide-react";

export function DeviceControl() {
  const { currentRoom, toggleDevice } = useRoom();

  if (!currentRoom) {
    return <div>No room selected</div>;
  }

  const renderDeviceIcon = (type: DeviceType, status: boolean) => {
    switch (type) {
      case "light":
        return status ? <Lightbulb className="h-8 w-8 text-room-warning" /> : <LightbulbOff className="h-8 w-8" />;
      case "screen":
        return status ? <Monitor className="h-8 w-8 text-room-primary" /> : <Monitor className="h-8 w-8" />;
      case "projector":
        return status ? <Projector className="h-8 w-8 text-room-primary" /> : <Projector className="h-8 w-8" />;
      default:
        return null;
    }
  };

  const renderDeviceSection = (title: string, devices: Array<{ id: string; name: string; type: DeviceType; status: boolean }>) => {
    if (!devices.length) return null;

    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {devices.map((device) => (
              <div
                key={device.id}
                className={`device-card ${device.status ? "border-room-primary" : "border-gray-200"}`}
              >
                <div className="flex flex-col items-center justify-between h-full">
                  <div className="mb-2">
                    {renderDeviceIcon(device.type, device.status)}
                  </div>
                  <h3 className="text-lg font-medium mb-1">{device.name}</h3>
                  <Badge variant={device.status ? "default" : "outline"} className="mb-4">
                    {device.status ? "ON" : "OFF"}
                  </Badge>
                  <Button
                    variant={device.status ? "outline" : "default"}
                    onClick={() => toggleDevice(currentRoom.id, device.type, device.id)}
                    className="w-full"
                  >
                    {device.status ? (
                      <>
                        <PowerOff className="mr-2 h-4 w-4" /> Turn Off
                      </>
                    ) : (
                      <>
                        <Power className="mr-2 h-4 w-4" /> Turn On
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Device Control</h2>
        <p className="text-gray-500">Control all devices in {currentRoom.name}</p>
      </div>

      {renderDeviceSection("Lights", currentRoom.devices.lights)}
      {renderDeviceSection("Screens", currentRoom.devices.screens)}
      {renderDeviceSection("Projectors", currentRoom.devices.projectors)}
    </div>
  );
}

export default DeviceControl;
