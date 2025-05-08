
import React, { useState } from "react";
import { useRoom, Device } from "@/context/RoomContext";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Check } from "lucide-react";

interface IssueReportProps {
  roomId: string;
  devices: Device[];
  onClose: () => void;
}

export function IssueReport({ roomId, devices, onClose }: IssueReportProps) {
  const { reportIssue } = useRoom();
  const [deviceId, setDeviceId] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (deviceId && description) {
      reportIssue(roomId, deviceId, description);
      setSubmitted(true);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Report an Issue</span>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          {submitted ? (
            <div className="flex flex-col items-center py-6 space-y-4">
              <div className="rounded-full bg-green-100 p-3">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium">Issue Reported</h3>
              <p className="text-center text-gray-500">
                Thank you for reporting this issue. An administrator will look into it shortly.
              </p>
              <Button onClick={onClose} className="mt-4">
                Close
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="device">Select Device</Label>
                <Select value={deviceId} onValueChange={setDeviceId}>
                  <SelectTrigger id="device">
                    <SelectValue placeholder="Choose a device" />
                  </SelectTrigger>
                  <SelectContent>
                    {devices.map((device) => (
                      <SelectItem key={device.id} value={device.id}>
                        {device.name} ({device.type})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Issue Description</Label>
                <Textarea
                  id="description"
                  placeholder="Please describe the issue in detail..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />
              </div>
            </div>
          )}
        </CardContent>
        
        {!submitted && (
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={!deviceId || !description}
            >
              Submit Report
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}

export default IssueReport;
