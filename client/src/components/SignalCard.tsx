import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Signal } from "@/types/signals";
import { Info, Activity } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface SignalCardProps {
  direction: string;
  signal: Signal;
  isLoading: boolean;
  duration?: string;
}

const SignalCard: React.FC<SignalCardProps> = ({ 
  direction, 
  signal, 
  isLoading,
  duration 
}) => {
  if (isLoading) {
    return (
      <Card className="overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-6 w-12 rounded-full" />
        </div>
        <div className="p-5">
          <Skeleton className="w-full h-32 rounded-md mb-4" />
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <Skeleton className="h-4 w-20 mx-auto mb-1" />
              <Skeleton className="h-12 w-12 rounded-full mx-auto" />
              <Skeleton className="h-4 w-16 mx-auto mt-1" />
            </div>
            <div className="text-center">
              <Skeleton className="h-4 w-20 mx-auto mb-1" />
              <Skeleton className="h-12 w-full rounded-md" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </Card>
    );
  }

  // Get the proper image for each direction
  const getSignalImage = (direction: string) => {
    const images = {
      east: "https://images.pexels.com/photos/1707820/pexels-photo-1707820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      west: "https://images.pexels.com/photos/1105517/pexels-photo-1105517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      north: "https://images.pexels.com/photos/242160/pexels-photo-242160.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      south: "https://images.pexels.com/photos/118783/pexels-photo-118783.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    };
    
    return images[direction.toLowerCase() as keyof typeof images] || 
      "https://images.pexels.com/photos/1707820/pexels-photo-1707820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
  };

  // Format direction name properly
  const formatDirection = (dir: string) => {
    return dir.charAt(0).toUpperCase() + dir.slice(1).toLowerCase();
  };

  return (
    <Card className="overflow-hidden">
      <div className="p-4 border-b border-slate-100">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-slate-800">{formatDirection(direction)} Signal</h3>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            signal.status === "on" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}>
            {signal.status === "on" ? "ON" : "OFF"}
          </span>
        </div>
      </div>
      <div className="p-5">
        <img 
          src={getSignalImage(direction)} 
          alt={`Traffic signal at ${formatDirection(direction)} intersection`} 
          className="w-full h-32 object-cover rounded-md mb-4"
        />
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <p className="text-xs text-slate-500 mb-1">Signal</p>
            <div 
              className={`signal-indicator w-12 h-12 mx-auto rounded-full ${
                signal.signal === "red" ? "bg-signal-red" :
                signal.signal === "green" ? "bg-signal-green" :
                signal.signal === "yellow" ? "bg-signal-yellow" :
                "bg-signal-black"
              }`}
              title={`${signal.signal} signal`}
            ></div>
            <p className="mt-1 font-medium capitalize">{signal.signal}</p>
          </div>
          
          <div className="text-center">
            <p className="text-xs text-slate-500 mb-1">Duration</p>
            <div className="h-12 flex items-center justify-center bg-slate-50 rounded-md">
              <p className="font-medium duration-value">{duration || signal.duration}</p>
              <span className="text-sm text-slate-500 ml-1">sec</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <Activity className="text-slate-400 h-4 w-4 mr-1" />
            <span className="text-slate-600">Status: {signal.status === "on" ? "Active" : "Inactive"}</span>
          </div>
          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800 p-0">
            <Info className="h-4 w-4 mr-1" />
            Details
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default SignalCard;
