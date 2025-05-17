import React from "react";
import { TrafficCone, Clock, Wifi, WifiOff } from "lucide-react";
import { motion } from "framer-motion";

interface HeaderProps {
  isOnline: boolean;
  lastUpdated: string;
}

const Header: React.FC<HeaderProps> = ({ isOnline, lastUpdated }) => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/90 backdrop-blur-sm shadow-md sticky top-0 z-10 border-b border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center mb-2 sm:mb-0">
          <div className="bg-blue-500 p-2 rounded-md shadow-md mr-3">
            <TrafficCone className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold gradient-text">Traffic Signal IoT Dashboard</h1>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="flex items-center"
          >
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              isOnline ? 'bg-green-100' : 'bg-red-100'
            } mr-2`}>
              {isOnline ? (
                <Wifi className="h-4 w-4 text-green-600" />
              ) : (
                <WifiOff className="h-4 w-4 text-red-600" />
              )}
            </div>
            <span className={`text-sm font-medium ${
              isOnline ? 'text-green-600' : 'text-red-600'
            }`}>
              {isOnline ? 'System Online' : 'System Offline'}
            </span>
          </motion.div>
          
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="flex items-center px-3 py-1.5 bg-blue-50 rounded-full"
          >
            <Clock className="h-4 w-4 text-blue-600 mr-1.5" />
            <span className="text-sm font-medium text-slate-700">
              Last updated: <span className="text-blue-600">{lastUpdated}</span>
            </span>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
