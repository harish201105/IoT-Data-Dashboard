import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon, RefreshCw, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DurationControlPanelProps {
  duration: string;
  onUpdateDuration: (duration: string) => void;
}

const DurationControlPanel: React.FC<DurationControlPanelProps> = ({ 
  duration, 
  onUpdateDuration 
}) => {
  const [inputDuration, setInputDuration] = useState(duration);
  const [isUpdating, setIsUpdating] = useState(false);
  const [statusMessage, setStatusMessage] = useState("System ready for updates");
  const [statusType, setStatusType] = useState<"default" | "success" | "error">("default");
  const { toast } = useToast();

  const handleReset = () => {
    setInputDuration("50");
  };

  const handleUpdate = () => {
    // Validate input
    const durationValue = parseInt(inputDuration);
    if (isNaN(durationValue) || durationValue < 10 || durationValue > 120) {
      setStatusMessage("Duration must be between 10-120 seconds");
      setStatusType("error");
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Duration must be between 10-120 seconds"
      });
      return;
    }

    // Show updating state
    setIsUpdating(true);
    setStatusMessage("Updating...");
    setStatusType("default");

    // Simulate API update delay
    setTimeout(() => {
      onUpdateDuration(inputDuration);
      setIsUpdating(false);
      setStatusMessage("Updated successfully");
      setStatusType("success");
      
      toast({
        title: "Update Successful",
        description: `All signal durations updated to ${inputDuration} seconds`,
      });

      // Reset status after 3 seconds
      setTimeout(() => {
        setStatusMessage("System ready for updates");
        setStatusType("default");
      }, 3000);
    }, 800);
  };

  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Duration Control Panel</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <img 
              src="https://images.pexels.com/photos/2882566/pexels-photo-2882566.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="IoT control panel interface" 
              className="w-full h-48 md:h-64 object-cover rounded-lg mb-4"
            />
            
            <Alert className="bg-blue-50 border-blue-100">
              <InfoIcon className="h-4 w-4 text-blue-600" />
              <AlertTitle className="text-blue-700">About Duration Control</AlertTitle>
              <AlertDescription className="text-blue-600">
                The duration value controls how long each signal state will remain active before transitioning to the next state. Changes will affect all signals in the system.
              </AlertDescription>
            </Alert>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-slate-50 rounded-lg p-5">
              <h3 className="font-medium text-slate-700 mb-4">Update Signal Duration</h3>
              
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdate();
                }}
              >
                <div className="mb-4">
                  <Label htmlFor="duration-input" className="block text-sm font-medium text-slate-700 mb-1">
                    Duration (seconds)
                  </Label>
                  <Input 
                    type="number" 
                    id="duration-input" 
                    className="w-full border-slate-300"
                    placeholder="Enter duration in seconds" 
                    value={inputDuration}
                    onChange={(e) => setInputDuration(e.target.value)}
                    min={10}
                    max={120}
                  />
                  <p className="mt-1 text-xs text-slate-500">Valid range: 10-120 seconds</p>
                </div>
                
                <div className="flex justify-between items-center">
                  <Button 
                    type="button" 
                    variant="secondary"
                    onClick={handleReset}
                    disabled={isUpdating}
                  >
                    Reset
                  </Button>
                  
                  <Button 
                    type="submit"
                    disabled={isUpdating}
                  >
                    {isUpdating ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      "Update All Signals"
                    )}
                  </Button>
                </div>
              </form>
              
              <div className="mt-6 border-t border-slate-200 pt-4">
                <h4 className="text-sm font-medium text-slate-700 mb-2">Status</h4>
                <div className={`flex items-center text-sm ${
                  statusType === "success" ? "text-green-700" :
                  statusType === "error" ? "text-red-700" :
                  "text-slate-700"
                }`}>
                  {statusType === "success" ? (
                    <CheckCircle className="h-4 w-4 mr-1" />
                  ) : statusType === "error" ? (
                    <InfoIcon className="h-4 w-4 mr-1" />
                  ) : (
                    <InfoIcon className="h-4 w-4 mr-1" />
                  )}
                  <span>{statusMessage}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DurationControlPanel;
