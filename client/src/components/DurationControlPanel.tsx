import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon, RefreshCw, CheckCircle, TimerReset, Settings2, TimerOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="mb-8 shadow-lg overflow-hidden border-slate-200">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-4 px-6">
          <div className="flex items-center">
            <Settings2 className="text-white h-6 w-6 mr-2" />
            <h2 className="text-xl font-bold text-white">Duration Control Panel</h2>
          </div>
        </div>
        
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="relative overflow-hidden rounded-xl mb-4 group">
                <img 
                  src="https://images.pexels.com/photos/2882566/pexels-photo-2882566.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="IoT control panel interface" 
                  className="w-full h-60 md:h-72 object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-lg">Control Center</h3>
                    <p className="text-white/90 text-sm">Manage all traffic signals from a centralized interface</p>
                  </div>
                </div>
              </div>
              
              <Alert className="bg-blue-50 border-blue-100 shadow-sm">
                <InfoIcon className="h-5 w-5 text-blue-600" />
                <AlertTitle className="text-blue-700 font-semibold">About Duration Control</AlertTitle>
                <AlertDescription className="text-blue-600">
                  <p className="mb-2">
                    The duration value controls how long each signal state will remain active before transitioning to the next state. Changes will affect all signals in the system.
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Recommended settings:</span> 30-60 seconds for normal traffic, 15-30 seconds for high traffic areas.
                  </p>
                </AlertDescription>
              </Alert>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-b from-slate-50 to-white rounded-xl p-5 shadow-sm border border-slate-200">
                <div className="flex items-center mb-4">
                  <TimerReset className="h-5 w-5 text-indigo-600 mr-2" />
                  <h3 className="font-semibold text-slate-800">Update Signal Duration</h3>
                </div>
                
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleUpdate();
                  }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="duration-input" className="block text-sm font-medium text-slate-700">
                      Duration (seconds)
                    </Label>
                    <div className="relative">
                      <Input 
                        type="number" 
                        id="duration-input" 
                        className="pr-16 border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="Enter duration" 
                        value={inputDuration}
                        onChange={(e) => setInputDuration(e.target.value)}
                        min={10}
                        max={120}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <span className="text-sm text-slate-500">seconds</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-slate-500">Valid range: 10-120 seconds</p>
                      <p className="text-xs font-medium text-indigo-600">Current: {duration}s</p>
                    </div>
                  </div>
                  
                  <div className="relative pt-2">
                    <div className="h-2 bg-slate-200 rounded-full">
                      <div 
                        className="h-full bg-indigo-600 rounded-full transition-all duration-300" 
                        style={{ 
                          width: `${Math.min(100, Math.max(0, (parseInt(inputDuration) - 10) / (120 - 10) * 100))}%` 
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-slate-500">
                      <span>10s</span>
                      <span>60s</span>
                      <span>120s</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-2">
                    <Button 
                      type="button" 
                      variant="outline"
                      size="sm"
                      className="flex items-center border-slate-300 text-slate-700"
                      onClick={handleReset}
                      disabled={isUpdating}
                    >
                      <TimerOff className="h-4 w-4 mr-1" />
                      Reset
                    </Button>
                    
                    <Button 
                      type="submit"
                      size="sm"
                      className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
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
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-medium text-slate-700">Status</h4>
                    <div className={`text-xs px-2 py-1 rounded-full ${
                      statusType === "success" ? "bg-green-100 text-green-800" :
                      statusType === "error" ? "bg-red-100 text-red-800" :
                      "bg-blue-100 text-blue-800"
                    }`}>
                      {statusType === "success" ? "Success" : 
                       statusType === "error" ? "Error" : "Ready"}
                    </div>
                  </div>
                  
                  <div className={`flex items-center text-sm ${
                    statusType === "success" ? "text-green-700" :
                    statusType === "error" ? "text-red-700" :
                    "text-slate-700"
                  }`}>
                    {statusType === "success" ? (
                      <CheckCircle className="h-4 w-4 mr-2" />
                    ) : statusType === "error" ? (
                      <InfoIcon className="h-4 w-4 mr-2" />
                    ) : (
                      <InfoIcon className="h-4 w-4 mr-2" />
                    )}
                    <span>{statusMessage}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DurationControlPanel;
