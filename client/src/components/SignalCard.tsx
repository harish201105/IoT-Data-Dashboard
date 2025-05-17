import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Signal } from "@/types/signals";
import { Info, Activity, MapPin } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

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
      <Card className="overflow-hidden shadow-lg card-transition">
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

  // Define animation variants
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // This animation is now directly applied to the element

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={cardVariants}
      className="signal-card-fade-in"
    >
      <Card className="overflow-hidden shadow-lg card-transition hover:border-blue-300">
        <div className="p-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-blue-500 mr-2" />
              <h3 className="font-semibold text-slate-800 gradient-text">{formatDirection(direction)} Signal</h3>
            </div>
            <span className={`px-3 py-1 text-xs font-medium rounded-full ${
              signal.status === "on" 
                ? "bg-green-100 text-green-800 border border-green-300 status-on" 
                : "bg-red-100 text-red-800 border border-red-300"
            }`}>
              {signal.status === "on" ? "ACTIVE" : "INACTIVE"}
            </span>
          </div>
        </div>
        <div className="p-5">
          <div className="relative mb-4 overflow-hidden rounded-md group">
            <img 
              src={getSignalImage(direction)} 
              alt={`Traffic signal at ${formatDirection(direction)} intersection`} 
              className="w-full h-36 object-cover rounded-md transition-transform duration-500 ease-in-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-0 left-0 p-3 text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {formatDirection(direction)} Intersection
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6 mb-5">
            <div className="text-center p-3 bg-slate-50 rounded-lg">
              <p className="text-xs font-medium text-slate-500 mb-2">Signal Status</p>
              <motion.div 
                animate={{
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    '0 0 5px rgba(0,0,0,0.2)',
                    '0 0 15px rgba(0,0,0,0.4)',
                    '0 0 5px rgba(0,0,0,0.2)'
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse" as const
                }}
                className={`signal-indicator w-14 h-14 mx-auto rounded-full ${
                  signal.signal === "red" ? "bg-signal-red" :
                  signal.signal === "green" ? "bg-signal-green" :
                  signal.signal === "yellow" ? "bg-signal-yellow" :
                  "bg-signal-black"
                }`}
                title={`${signal.signal} signal`}
              ></motion.div>
              <p className="mt-2 font-medium text-slate-800 capitalize">{signal.signal}</p>
            </div>
            
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-xs font-medium text-blue-700 mb-2">Duration</p>
              <div className="h-14 flex items-center justify-center bg-white rounded-md shadow-sm">
                <p className="text-xl font-semibold text-blue-600 duration-value">{duration || signal.duration}</p>
                <span className="text-sm text-slate-500 ml-1">sec</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm border-t border-slate-100 pt-3">
            <div className="flex items-center">
              <Activity className="text-blue-500 h-4 w-4 mr-1" />
              <span className="text-slate-600">Status: {signal.status === "on" ? "Active" : "Inactive"}</span>
            </div>
            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-0 py-1 px-2 rounded">
              <Info className="h-4 w-4 mr-1" />
              View Details
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default SignalCard;
