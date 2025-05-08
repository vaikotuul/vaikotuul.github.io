
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRoom } from "@/context/RoomContext";
import DeviceControl from "./DeviceControl";
import ScheduleControl from "./ScheduleControl";
import UserInterfaceControl from "./UserInterfaceControl";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export function AdminDashboard() {
  const { rooms, currentRoom, selectRoom, issues } = useRoom();
  const [activeTab, setActiveTab] = useState("devices");
  
  const handleRoomChange = (roomId: string) => {
    selectRoom(roomId);
  };

  const unresolved = issues.filter(issue => !issue.resolved);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-500">Manage room devices, schedules, and user interfaces</p>
      </div>
      
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="mb-4 md:mb-0">
          <Select onValueChange={handleRoomChange} defaultValue={currentRoom?.id}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select a room" />
            </SelectTrigger>
            <SelectContent>
              {rooms.map((room) => (
                <SelectItem key={room.id} value={room.id}>
                  {room.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {unresolved.length > 0 && (
          <Alert variant="destructive" className="md:w-auto max-w-md">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Active Issues</AlertTitle>
            <AlertDescription>
              There are {unresolved.length} unresolved issues that require your attention.
            </AlertDescription>
          </Alert>
        )}
      </div>
      
      {currentRoom ? (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="devices">Device Control</TabsTrigger>
            <TabsTrigger value="schedules">Scheduling</TabsTrigger>
            <TabsTrigger value="interface">User Interface</TabsTrigger>
          </TabsList>
          
          <TabsContent value="devices" className="space-y-6">
            <DeviceControl />
          </TabsContent>
          
          <TabsContent value="schedules" className="space-y-6">
            <ScheduleControl />
          </TabsContent>
          
          <TabsContent value="interface" className="space-y-6">
            <UserInterfaceControl />
          </TabsContent>
        </Tabs>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>No Room Selected</CardTitle>
            <CardDescription>Please select a room to manage its devices and settings.</CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  );
}

export default AdminDashboard;
