
import React, { useState } from "react";
import { useRoom, DeviceType, Device } from "@/context/RoomContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarClock, Power, PowerOff, X, Plus } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export function ScheduleControl() {
  const { currentRoom, addScheduledTask, toggleScheduledTask, removeScheduledTask } = useRoom();
  const [deviceType, setDeviceType] = useState<DeviceType>("light");
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>("");
  const [newTask, setNewTask] = useState({
    time: "",
    action: true,
    days: [] as string[],
    enabled: true,
  });

  if (!currentRoom) {
    return <div>No room selected</div>;
  }

  const getDevices = () => {
    switch (deviceType) {
      case "light":
        return currentRoom.devices.lights;
      case "screen":
        return currentRoom.devices.screens;
      case "projector":
        return currentRoom.devices.projectors;
      default:
        return [];
    }
  };

  const selectedDevice = getDevices().find(device => device.id === selectedDeviceId);

  const handleAddTask = () => {
    if (selectedDeviceId && newTask.time && newTask.days.length > 0) {
      addScheduledTask(
        currentRoom.id,
        deviceType,
        selectedDeviceId,
        {
          deviceId: selectedDeviceId,
          action: newTask.action,
          time: newTask.time,
          days: newTask.days,
          enabled: true,
        }
      );
      
      // Reset form
      setNewTask({
        time: "",
        action: true,
        days: [],
        enabled: true,
      });
    }
  };

  const handleDayToggle = (day: string) => {
    setNewTask(prev => {
      const isSelected = prev.days.includes(day);
      return {
        ...prev,
        days: isSelected 
          ? prev.days.filter(d => d !== day)
          : [...prev.days, day]
      };
    });
  };

  const handleDeviceTypeChange = (value: string) => {
    const newType = value as DeviceType;
    setDeviceType(newType);
    setSelectedDeviceId("");
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Schedule Control</h2>
        <p className="text-gray-500">Manage automated schedules for devices in {currentRoom.name}</p>
      </div>

      <Tabs defaultValue="scheduleList">
        <TabsList>
          <TabsTrigger value="scheduleList">Current Schedules</TabsTrigger>
          <TabsTrigger value="addSchedule">Add New Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="scheduleList" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarClock className="mr-2 h-5 w-5" />
                Schedule List
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {deviceType === "light" && currentRoom.devices.lights.map(device => (
                  <DeviceScheduleList 
                    key={device.id}
                    device={device}
                    roomId={currentRoom.id}
                    toggleTask={toggleScheduledTask}
                    removeTask={removeScheduledTask}
                  />
                ))}
                
                {deviceType === "screen" && currentRoom.devices.screens.map(device => (
                  <DeviceScheduleList 
                    key={device.id}
                    device={device}
                    roomId={currentRoom.id}
                    toggleTask={toggleScheduledTask}
                    removeTask={removeScheduledTask}
                  />
                ))}
                
                {deviceType === "projector" && currentRoom.devices.projectors.map(device => (
                  <DeviceScheduleList 
                    key={device.id}
                    device={device}
                    roomId={currentRoom.id}
                    toggleTask={toggleScheduledTask}
                    removeTask={removeScheduledTask}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="addSchedule" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plus className="mr-2 h-5 w-5" />
                Add New Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="device-type">Device Type</Label>
                      <Select 
                        value={deviceType} 
                        onValueChange={handleDeviceTypeChange}
                      >
                        <SelectTrigger id="device-type">
                          <SelectValue placeholder="Select device type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Lights</SelectItem>
                          <SelectItem value="screen">Screens</SelectItem>
                          <SelectItem value="projector">Projectors</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="device">Device</Label>
                      <Select 
                        value={selectedDeviceId} 
                        onValueChange={setSelectedDeviceId}
                        disabled={getDevices().length === 0}
                      >
                        <SelectTrigger id="device">
                          <SelectValue placeholder="Select device" />
                        </SelectTrigger>
                        <SelectContent>
                          {getDevices().map(device => (
                            <SelectItem key={device.id} value={device.id}>
                              {device.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="time">Time</Label>
                      <Input 
                        id="time" 
                        type="time" 
                        value={newTask.time}
                        onChange={(e) => setNewTask(prev => ({ ...prev, time: e.target.value }))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="action">Action</Label>
                      <Select 
                        value={newTask.action ? "on" : "off"}
                        onValueChange={(value) => setNewTask(prev => ({ ...prev, action: value === "on" }))}
                      >
                        <SelectTrigger id="action">
                          <SelectValue placeholder="Select action" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="on">Turn On</SelectItem>
                          <SelectItem value="off">Turn Off</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label className="mb-2 block">Days</Label>
                    <div className="space-y-2">
                      {DAYS_OF_WEEK.map(day => (
                        <div key={day} className="flex items-center space-x-2">
                          <Checkbox 
                            id={day}
                            checked={newTask.days.includes(day)}
                            onCheckedChange={() => handleDayToggle(day)}
                          />
                          <Label htmlFor={day} className="cursor-pointer">{day}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={handleAddTask}
                  disabled={!selectedDeviceId || !newTask.time || newTask.days.length === 0}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface DeviceScheduleListProps {
  device: Device;
  roomId: string;
  toggleTask: (roomId: string, deviceType: DeviceType, deviceId: string, taskId: string) => void;
  removeTask: (roomId: string, deviceType: DeviceType, deviceId: string, taskId: string) => void;
}

function DeviceScheduleList({ device, roomId, toggleTask, removeTask }: DeviceScheduleListProps) {
  if (device.scheduledTasks.length === 0) return null;

  return (
    <div className="border rounded-md p-4">
      <h3 className="text-lg font-medium mb-3">{device.name}</h3>
      <div className="space-y-3">
        {device.scheduledTasks.map(task => (
          <div key={task.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
            <div>
              <div className="flex items-center">
                {task.action ? (
                  <Power className="mr-2 h-4 w-4 text-room-success" />
                ) : (
                  <PowerOff className="mr-2 h-4 w-4 text-room-danger" />
                )}
                <span className="font-medium">
                  {task.action ? "Turn On" : "Turn Off"} at {task.time}
                </span>
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {task.days.join(", ")}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch 
                checked={task.enabled} 
                onCheckedChange={() => toggleTask(roomId, device.type, device.id, task.id)} 
              />
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => removeTask(roomId, device.type, device.id, task.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScheduleControl;
