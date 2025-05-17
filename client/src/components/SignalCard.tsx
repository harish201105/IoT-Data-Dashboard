import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Signal } from "@/types/signals";
import { Info, Activity, MapPin, Cpu, ArrowUpRight, Clock, VolumeX, Volume2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { useSoundEffects } from "@/hooks/useSoundEffects";

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
  const { playSound } = useSoundEffects();
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  
  // Easter egg activation on sequence of clicks
  const [clickCount, setClickCount] = useState(0);
  
  // Handle card click events
  const handleCardClick = () => {
    setClickCount(prev => prev + 1);
    playSound('signal');
  };
  
  useEffect(() => {
    if (clickCount >= 3) {
      setShowEasterEgg(true);
      playSound('success');
      
      // Reset after animation plays
      const timer = setTimeout(() => {
        setShowEasterEgg(false);
        setClickCount(0);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [clickCount, playSound]);
  
  // Define animation variants for the loading skeleton
  const skeletonVariants = {
    pulse: {
      opacity: [0.5, 0.8, 0.5],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  if (isLoading) {
    return (
      <motion.div initial={{opacity: 0.6, y: 10}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5}}>
        <Card className="premium-card shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700">
            <motion.div variants={skeletonVariants} animate="pulse">
              <Skeleton className="h-6 w-40 bg-slate-200 dark:bg-slate-600 premium-skeleton" />
            </motion.div>
            <motion.div variants={skeletonVariants} animate="pulse">
              <Skeleton className="h-6 w-12 rounded-full bg-slate-200 dark:bg-slate-600 premium-skeleton" />
            </motion.div>
          </div>
          <div className="p-5">
            <motion.div variants={skeletonVariants} animate="pulse">
              <div className="w-full h-56 rounded-xl mb-4 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 relative overflow-hidden premium-skeleton">
                <div className="absolute inset-0 opacity-5 junction-pattern"></div>
                <div className="h-full flex items-center justify-center">
                  <div className="w-16 h-44 rounded-lg bg-slate-300 dark:bg-slate-600 flex flex-col items-center justify-center gap-3 shadow-lg">
                    <div className="w-10 h-10 rounded-full bg-slate-400 dark:bg-slate-500"></div>
                    <div className="w-10 h-10 rounded-full bg-slate-400 dark:bg-slate-500"></div>
                    <div className="w-10 h-10 rounded-full bg-slate-400 dark:bg-slate-500"></div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-200/50 dark:to-slate-800/50"></div>
              </div>
            </motion.div>
            <div className="grid grid-cols-2 gap-6 mb-6">
              <motion.div variants={skeletonVariants} animate="pulse" className="glass-panel p-4 text-center">
                <Skeleton className="h-4 w-20 mx-auto mb-3 bg-slate-200 dark:bg-slate-600 premium-skeleton" />
                <Skeleton className="h-16 w-16 rounded-full mx-auto bg-slate-200 dark:bg-slate-600 premium-skeleton" />
                <Skeleton className="h-4 w-16 mx-auto mt-3 bg-slate-200 dark:bg-slate-600 premium-skeleton" />
              </motion.div>
              <motion.div variants={skeletonVariants} animate="pulse" className="glass-panel p-4 text-center">
                <Skeleton className="h-4 w-20 mx-auto mb-3 bg-slate-200 dark:bg-slate-600 premium-skeleton" />
                <Skeleton className="h-16 w-full rounded-lg mx-auto bg-slate-200 dark:bg-slate-600 premium-skeleton" />
                <div className="mt-2 flex justify-between">
                  <Skeleton className="h-3 w-6 bg-slate-200 dark:bg-slate-600 premium-skeleton" />
                  <Skeleton className="h-3 w-6 bg-slate-200 dark:bg-slate-600 premium-skeleton" />
                  <Skeleton className="h-3 w-6 bg-slate-200 dark:bg-slate-600 premium-skeleton" />
                </div>
              </motion.div>
            </div>
            <motion.div variants={skeletonVariants} animate="pulse" className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-700">
              <Skeleton className="h-8 w-32 rounded-full bg-slate-200 dark:bg-slate-600 premium-skeleton" />
              <Skeleton className="h-9 w-24 rounded-lg bg-slate-200 dark:bg-slate-600 premium-skeleton" />
            </motion.div>
          </div>
        </Card>
      </motion.div>
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
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 20px 30px rgba(0, 0, 0, 0.1)",
        transition: { duration: 0.3, ease: "easeOut" }
      }}
    >
      <Card className="premium-card shine-effect traffic-signal-card">
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
            <div 
              className="traffic-signal-bg h-56 relative rounded-lg flex justify-center items-center"
              onClick={handleCardClick}
              onMouseEnter={() => playSound('hover')}
            >
              {/* Realistic Traffic Light Component */}
              <div className="flex justify-center items-center relative z-10">
                <div className={`traffic-light-housing ${showEasterEgg ? 'easter-egg-bounce active' : ''}`}>
                  {/* Traffic light housing */}
                  <div className="traffic-light-body">
                    {/* Red light */}
                    <div 
                      className={`traffic-light-bulb red ${signal.signal === 'red' ? 'active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        playSound('signal');
                      }}
                    >
                      <div className="traffic-light-glow"></div>
                    </div>
                    {/* Yellow light */}
                    <div 
                      className={`traffic-light-bulb yellow ${signal.signal === 'yellow' ? 'active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        playSound('signal');
                      }}
                    >
                      <div className="traffic-light-glow"></div>
                    </div>
                    {/* Green light */}
                    <div 
                      className={`traffic-light-bulb green ${signal.signal === 'green' ? 'active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        playSound('signal');
                      }}
                    >
                      <div className="traffic-light-glow"></div>
                    </div>
                  </div>
                  <div className="traffic-light-pole"></div>
                </div>
              </div>
              
              {/* Direction & Junction Details */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                <div className="flex flex-col text-white">
                  <h3 className="text-xl font-bold tracking-tight">{formatDirection(direction)} Intersection</h3>
                  <div className="mt-1 flex justify-between items-center">
                    <div className="flex items-center">
                      <Cpu className="h-3 w-3 mr-1" />
                      <span className="text-xs">Junction ID: {direction.toUpperCase()}-{Math.floor(Math.random() * 1000)}</span>
                    </div>
                    <span className="text-xs font-semibold uppercase px-2 py-0.5 rounded bg-white/20 backdrop-blur-sm">
                      Signal: {signal.signal}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Background Elements */}
              <div className="absolute inset-0 junction-pattern opacity-10"></div>
              {/* Status Indicator */}
              <div className="absolute top-4 right-4">
                <div className={`status-pulse ${signal.status === 'on' ? 'active' : 'inactive'}`}></div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="glass-panel p-4 text-center signal-tooltip-container">
              <h4 className="text-xs font-semibold text-indigo-800 dark:text-indigo-300 mb-3 uppercase tracking-wider">Signal Status</h4>
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
                onMouseEnter={() => playSound('hover')}
              ></motion.div>
              <p className="mt-3 font-bold text-slate-800 dark:text-slate-100 capitalize">{signal.signal}</p>
              
              {/* Detailed tooltip on hover */}
              <div className="signal-tooltip absolute top-20 left-1/2 -translate-x-1/2 w-64 p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-xl z-50">
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-slate-800 border-t border-l border-slate-200 dark:border-slate-700 transform rotate-45"></div>
                <h4 className="text-sm font-semibold mb-2">Signal Performance Details</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400">Uptime:</span>
                    <span className="font-medium">99.8%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400">Avg. Cycle:</span>
                    <span className="font-medium">126s</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400">Green ratio:</span>
                    <span className="font-medium">32%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400">Health Score:</span>
                    <span className="font-medium text-emerald-600 dark:text-emerald-400">92%</span>
                  </div>
                  <div className="h-1 w-full bg-slate-100 dark:bg-slate-700 rounded-full mt-1">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass-panel p-4 text-center relative overflow-hidden signal-tooltip-container">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5"></div>
              <div className="relative">
                <h4 className="text-xs font-semibold text-indigo-800 dark:text-indigo-300 mb-3 uppercase tracking-wider">Duration</h4>
                <div className="h-16 flex items-center justify-center glass-panel shadow-sm" onMouseEnter={() => playSound('hover')}>
                  <p className="text-2xl font-bold text-blue-700 dark:text-blue-400 duration-value">{duration || signal.duration}</p>
                  <span className="text-sm text-blue-500 dark:text-blue-300 ml-1 font-medium">sec</span>
                </div>
                <div className="mt-2 flex justify-between text-[10px] text-slate-500">
                  <span>10</span>
                  <span>60</span>
                  <span>120</span>
                </div>
                <div className="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mt-1">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500" 
                    style={{ width: `${Math.min(100, Math.max(0, (parseInt(duration || signal.duration) - 10) / (120 - 10) * 100))}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Duration tooltip */}
              <div className="signal-tooltip absolute top-20 left-1/2 -translate-x-1/2 w-64 p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-xl z-50">
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-slate-800 border-t border-l border-slate-200 dark:border-slate-700 transform rotate-45"></div>
                <h4 className="text-sm font-semibold mb-2">Duration Information</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400">Current:</span>
                    <span className="font-medium">{duration || signal.duration}s</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400">Min Duration:</span>
                    <span className="font-medium">10s</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400">Max Duration:</span>
                    <span className="font-medium">120s</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400">Optimum:</span>
                    <span className="font-medium text-emerald-600 dark:text-emerald-400">45s - 65s</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-700">
            <div className="flex items-center px-3 py-1.5 rounded-full bg-slate-50 dark:bg-slate-800/50">
              <Activity className="text-indigo-600 dark:text-indigo-400 h-4 w-4 mr-2" />
              <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                {signal.status === "on" ? 
                  <span className="text-emerald-600 dark:text-emerald-400">Active</span> : 
                  <span className="text-red-600 dark:text-red-400">Inactive</span>
                }
              </span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-white dark:bg-slate-800 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-800 dark:hover:text-indigo-300 hover:border-indigo-300 dark:hover:border-indigo-700 btn-3d"
              onMouseEnter={() => playSound('hover')}
            >
              <Info className="h-4 w-4 mr-2" />
              Details
              <ArrowUpRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default SignalCard;