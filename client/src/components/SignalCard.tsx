import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Signal } from "@/types/signals";
import { Info, Activity, MapPin, Cpu, ArrowUpRight, Clock } from "lucide-react";
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
      <Card className="premium-card card-transition">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-6 w-12 rounded-full" />
        </div>
        <div className="p-5">
          <Skeleton className="w-full h-36 rounded-xl mb-4 shimmer-effect" />
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <Skeleton className="h-4 w-20 mx-auto mb-1" />
              <Skeleton className="h-14 w-14 rounded-full mx-auto shimmer-effect" />
              <Skeleton className="h-4 w-16 mx-auto mt-1" />
            </div>
            <div className="text-center">
              <Skeleton className="h-4 w-20 mx-auto mb-1" />
              <Skeleton className="h-14 w-full rounded-xl shimmer-effect" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-8 w-24 rounded-lg" />
          </div>
        </div>
      </Card>
    );
  }

  // Generate directional signal light colors using signal value
  const getSignalColor = (direction: string, signalValue: string) => {
    // Custom gradient based on direction
    const colors = {
      east: 'from-blue-500 to-blue-600',
      west: 'from-purple-500 to-purple-600',
      north: 'from-emerald-500 to-emerald-600',
      south: 'from-amber-500 to-amber-600',
      South: 'from-red-500 to-red-600',
      outh: 'from-gray-700 to-gray-800'
    };
    
    return colors[direction as keyof typeof colors] || 'from-blue-500 to-blue-600';
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

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={cardVariants}
      className="signal-card-fade-in"
    >
      <Card className="premium-card shine-effect">
        <div className={`premium-card-header rounded-t-xl p-4 flex justify-between items-center`}>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
              <MapPin className="h-4 w-4 text-white" />
            </div>
            <h3 className="font-bold text-white text-lg tracking-tight">{formatDirection(direction)} Signal</h3>
          </div>
          <span className={`px-3 py-1 text-xs font-bold rounded-full 
            ${signal.status === "on" 
              ? "bg-emerald-100 text-emerald-800 border border-emerald-300 status-on" 
              : "bg-red-100 text-red-800 border border-red-300"
            }`}
          >
            {signal.status === "on" ? "ACTIVE" : "INACTIVE"}
          </span>
        </div>

        <div className="p-6">
          <div className="relative mb-6 overflow-hidden rounded-xl group shadow-lg">
            <div className={`h-40 bg-gradient-to-r ${getSignalColor(direction, signal.signal)} rounded-lg relative flex items-center justify-center transition-all duration-300 group-hover:scale-[1.02]`}>
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTR2LTJoLTJ2LTJoNHY0aC0yem0tNCAwdi0yaC0ydi0yaDR2NGgtMnptLTQgOGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>
              <div className="text-center text-white z-10">
                <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-3 bg-white/20 backdrop-blur-sm border border-white/30`}>
                  <div className={`w-12 h-12 rounded-full ${
                    signal.signal === "red" ? "bg-signal-red" :
                    signal.signal === "green" ? "bg-signal-green" :
                    signal.signal === "yellow" ? "bg-signal-yellow" :
                    "bg-signal-black"
                  }`}></div>
                </div>
                <h3 className="text-xl font-bold tracking-tight">{formatDirection(direction)}</h3>
                <p className="text-white/80 text-sm mt-1">Traffic Signal</p>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                <div className="flex items-center justify-between text-white/90">
                  <div className="flex items-center">
                    <Cpu className="h-3 w-3 mr-1" />
                    <span className="text-xs">ID: {direction.toUpperCase()}-{Math.floor(Math.random() * 1000)}</span>
                  </div>
                  <span className="text-xs">{signal.signal.toUpperCase()}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="glass-panel p-4 text-center">
              <h4 className="text-xs font-semibold text-indigo-800 mb-3 uppercase tracking-wider">Signal Status</h4>
              <motion.div 
                animate={{
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    '0 0 5px rgba(0,0,0,0.2)',
                    '0 0 20px rgba(0,0,0,0.4)',
                    '0 0 5px rgba(0,0,0,0.2)'
                  ]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatType: "reverse" as const
                }}
                className={`signal-indicator w-16 h-16 mx-auto rounded-full ${
                  signal.signal === "red" ? "bg-signal-red" :
                  signal.signal === "green" ? "bg-signal-green" :
                  signal.signal === "yellow" ? "bg-signal-yellow" :
                  "bg-signal-black"
                }`}
                title={`${signal.signal} signal`}
              ></motion.div>
              <p className="mt-3 font-bold text-slate-800 capitalize">{signal.signal}</p>
            </div>
            
            <div className="glass-panel p-4 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5"></div>
              <div className="relative">
                <h4 className="text-xs font-semibold text-indigo-800 mb-3 uppercase tracking-wider">Duration</h4>
                <div className="h-16 flex items-center justify-center glass-panel shadow-sm">
                  <p className="text-2xl font-bold text-blue-700 duration-value">{duration || signal.duration}</p>
                  <span className="text-sm text-blue-500 ml-1 font-medium">sec</span>
                </div>
                <div className="mt-2 flex justify-between text-[10px] text-slate-500">
                  <span>10</span>
                  <span>60</span>
                  <span>120</span>
                </div>
                <div className="h-1.5 bg-slate-200 rounded-full mt-1">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500" 
                    style={{ width: `${Math.min(100, Math.max(0, (parseInt(duration || signal.duration) - 10) / (120 - 10) * 100))}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            {signal.timestamp && (
              <div className="flex items-center text-xs text-slate-500 py-1">
                <Clock className="h-3 w-3 mr-1 text-indigo-400" />
                <span>Updated: {new Date(signal.timestamp).toLocaleTimeString()}</span>
              </div>
            )}
            
            <div className="flex items-center justify-between pt-2 border-t border-slate-200">
              <div className="flex items-center px-3 py-1.5 rounded-full bg-slate-50">
                <Activity className="text-indigo-600 h-4 w-4 mr-2" />
                <span className="text-sm font-medium text-slate-800">
                  {signal.status === "on" ? 
                    <span className="text-emerald-600">Active</span> : 
                    <span className="text-red-600">Inactive</span>
                  }
                </span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-white text-indigo-700 border-indigo-200 hover:bg-indigo-50 hover:text-indigo-800 hover:border-indigo-300 btn-3d"
              >
                <Info className="h-4 w-4 mr-2" />
                Details
                <ArrowUpRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default SignalCard;
