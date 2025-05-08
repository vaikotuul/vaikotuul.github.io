
import React, { createContext, useState, useContext, ReactNode } from "react";
import { useToast } from "@/components/ui/use-toast";

export type DeviceType = "light" | "screen" | "projector";

export interface Room {
  id: string;
  name: string;
  devices: {
    lights: Device[];
    screens: Device[];
    projectors: Device[];
  };
}

export interface Device {
  id: string;
  name: string;
  type: DeviceType;
  status: boolean;
  scheduledTasks: ScheduledTask[];
}

export interface ScheduledTask {
  id: string;
  deviceId: string;
  action: boolean; // true = ON, false = OFF
  time: string; // HH:MM format
  days: string[]; // ['Monday', 'Tuesday', etc.]
  enabled: boolean;
}

export interface Issue {
  id: string;
  roomId: string;
  deviceId: string;
  description: string;
  timestamp: string;
  resolved: boolean;
}

interface RoomContextType {
  rooms: Room[];
  currentRoom: Room | null;
  selectRoom: (roomId: string) => void;
  toggleDevice: (roomId: string, deviceType: DeviceType, deviceId: string) => void;
  addScheduledTask: (roomId: string, deviceType: DeviceType, deviceId: string, task: Omit<ScheduledTask, "id">) => void;
  toggleScheduledTask: (roomId: string, deviceType: DeviceType, deviceId: string, taskId: string) => void;
  removeScheduledTask: (roomId: string, deviceType: DeviceType, deviceId: string, taskId: string) => void;
  issues: Issue[];
  reportIssue: (roomId: string, deviceId: string, description: string) => void;
  resolveIssue: (issueId: string) => void;
}

// Mock data for rooms and devices
const MOCK_ROOMS: Room[] = [
  {
    id: "room-1",
    name: "Auditoorium 101",
    devices: {
      lights: [
        { id: "light-1", name: "Main Lights", type: "light", status: false, scheduledTasks: [] },
        { id: "light-2", name: "Presentation Area", type: "light", status: false, scheduledTasks: [] },
      ],
      screens: [
        { id: "screen-1", name: "Main Screen", type: "screen", status: false, scheduledTasks: [] },
      ],
      projectors: [
        { id: "projector-1", name: "Main Projector", type: "projector", status: false, scheduledTasks: [] },
      ],
    },
  },
  {
    id: "room-2",
    name: "Auditoorium 102",
    devices: {
      lights: [
        { id: "light-3", name: "Main Lights", type: "light", status: false, scheduledTasks: [] },
        { id: "light-4", name: "Whiteboard Lights", type: "light", status: false, scheduledTasks: [] },
      ],
      screens: [
        { id: "screen-2", name: "Left Screen", type: "screen", status: false, scheduledTasks: [] },
        { id: "screen-3", name: "Right Screen", type: "screen", status: false, scheduledTasks: [] },
      ],
      projectors: [
        { id: "projector-2", name: "Main Projector", type: "projector", status: false, scheduledTasks: [] },
      ],
    },
  },
];

const RoomContext = createContext<RoomContextType | undefined>(undefined);

export const RoomProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [rooms, setRooms] = useState<Room[]>(MOCK_ROOMS);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(MOCK_ROOMS[0]);
  const [issues, setIssues] = useState<Issue[]>([]);
  const { toast } = useToast();

  const selectRoom = (roomId: string) => {
    const room = rooms.find((r) => r.id === roomId);
    if (room) {
      setCurrentRoom(room);
    }
  };

  const toggleDevice = (roomId: string, deviceType: DeviceType, deviceId: string) => {
    setRooms((prevRooms) => {
      return prevRooms.map((room) => {
        if (room.id !== roomId) return room;

        const deviceCategory = `${deviceType}s` as "lights" | "screens" | "projectors";
        
        const updatedDevices = {
          ...room.devices,
          [deviceCategory]: room.devices[deviceCategory].map((device) => {
            if (device.id !== deviceId) return device;
            
            return {
              ...device,
              status: !device.status,
            };
          }),
        };

        // If this is the current room, update it as well
        if (currentRoom && currentRoom.id === roomId) {
          setCurrentRoom({
            ...room,
            devices: updatedDevices,
          });
        }

        toast({
          title: `${deviceType} Changed`,
          description: `${deviceType} is now ${!room.devices[deviceCategory].find(d => d.id === deviceId)?.status ? "ON" : "OFF"}`,
        });

        return {
          ...room,
          devices: updatedDevices,
        };
      });
    });
  };

  const addScheduledTask = (
    roomId: string, 
    deviceType: DeviceType,
    deviceId: string,
    task: Omit<ScheduledTask, "id">
  ) => {
    const newTask: ScheduledTask = {
      ...task,
      id: `task-${Date.now()}`,
    };

    setRooms((prevRooms) => {
      return prevRooms.map((room) => {
        if (room.id !== roomId) return room;

        const deviceCategory = `${deviceType}s` as "lights" | "screens" | "projectors";
        
        const updatedDevices = {
          ...room.devices,
          [deviceCategory]: room.devices[deviceCategory].map((device) => {
            if (device.id !== deviceId) return device;
            
            return {
              ...device,
              scheduledTasks: [...device.scheduledTasks, newTask],
            };
          }),
        };

        // If this is the current room, update it as well
        if (currentRoom && currentRoom.id === roomId) {
          setCurrentRoom({
            ...room,
            devices: updatedDevices,
          });
        }

        toast({
          title: "Scheduled Task Added",
          description: `New schedule for ${deviceType} has been added`,
        });

        return {
          ...room,
          devices: updatedDevices,
        };
      });
    });
  };

  const toggleScheduledTask = (
    roomId: string,
    deviceType: DeviceType,
    deviceId: string,
    taskId: string
  ) => {
    setRooms((prevRooms) => {
      return prevRooms.map((room) => {
        if (room.id !== roomId) return room;

        const deviceCategory = `${deviceType}s` as "lights" | "screens" | "projectors";
        
        const updatedDevices = {
          ...room.devices,
          [deviceCategory]: room.devices[deviceCategory].map((device) => {
            if (device.id !== deviceId) return device;
            
            return {
              ...device,
              scheduledTasks: device.scheduledTasks.map((task) => {
                if (task.id !== taskId) return task;
                
                return {
                  ...task,
                  enabled: !task.enabled,
                };
              }),
            };
          }),
        };

        // If this is the current room, update it as well
        if (currentRoom && currentRoom.id === roomId) {
          setCurrentRoom({
            ...room,
            devices: updatedDevices,
          });
        }

        toast({
          title: "Schedule Updated",
          description: `Schedule has been ${!room.devices[deviceCategory].find(d => d.id === deviceId)?.scheduledTasks.find(t => t.id === taskId)?.enabled ? "enabled" : "disabled"}`,
        });

        return {
          ...room,
          devices: updatedDevices,
        };
      });
    });
  };

  const removeScheduledTask = (
    roomId: string,
    deviceType: DeviceType,
    deviceId: string,
    taskId: string
  ) => {
    setRooms((prevRooms) => {
      return prevRooms.map((room) => {
        if (room.id !== roomId) return room;

        const deviceCategory = `${deviceType}s` as "lights" | "screens" | "projectors";
        
        const updatedDevices = {
          ...room.devices,
          [deviceCategory]: room.devices[deviceCategory].map((device) => {
            if (device.id !== deviceId) return device;
            
            return {
              ...device,
              scheduledTasks: device.scheduledTasks.filter((task) => task.id !== taskId),
            };
          }),
        };

        // If this is the current room, update it as well
        if (currentRoom && currentRoom.id === roomId) {
          setCurrentRoom({
            ...room,
            devices: updatedDevices,
          });
        }

        toast({
          title: "Schedule Removed",
          description: `Schedule has been removed successfully`,
        });

        return {
          ...room,
          devices: updatedDevices,
        };
      });
    });
  };

  const reportIssue = (roomId: string, deviceId: string, description: string) => {
    const newIssue: Issue = {
      id: `issue-${Date.now()}`,
      roomId,
      deviceId,
      description,
      timestamp: new Date().toISOString(),
      resolved: false,
    };

    setIssues((prevIssues) => [...prevIssues, newIssue]);
    
    toast({
      title: "Issue Reported",
      description: "Your issue has been reported to administrators",
    });
  };

  const resolveIssue = (issueId: string) => {
    setIssues((prevIssues) => {
      return prevIssues.map((issue) => {
        if (issue.id !== issueId) return issue;
        
        toast({
          title: "Issue Resolved",
          description: "The issue has been marked as resolved",
        });
        
        return {
          ...issue,
          resolved: true,
        };
      });
    });
  };

  return (
    <RoomContext.Provider
      value={{
        rooms,
        currentRoom,
        selectRoom,
        toggleDevice,
        addScheduledTask,
        toggleScheduledTask,
        removeScheduledTask,
        issues,
        reportIssue,
        resolveIssue,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};

export const useRoom = (): RoomContextType => {
  const context = useContext(RoomContext);
  if (context === undefined) {
    throw new Error("useRoom must be used within a RoomProvider");
  }
  return context;
};
