import React from "react";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, TrafficCone, AlertTriangle, Timer, Clock, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

interface SystemOverviewProps {
  isLoading: boolean;
  activeSignals: number;
  errorStates: number;
  avgDuration: string;
  lastUpdateTime: string;
  onRefresh: () => void;
}

const SystemOverview: React.FC<SystemOverviewProps> = ({
  isLoading,
  activeSignals,
  errorStates,
  avgDuration,
  lastUpdateTime,
  onRefresh
}) => {
  return (
    <div className="mb-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="shadow-lg border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 py-4 px-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div className="flex items-center">
                <BarChart3 className="text-white h-6 w-6 mr-2" />
                <h2 className="text-xl font-bold text-white">System Overview</h2>
              </div>
              <div className="flex items-center mt-2 sm:mt-0">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="inline-flex items-center bg-white/20 text-white border-white/30 hover:bg-white/30" 
                  onClick={onRefresh}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4 mr-2" />
                  )}
                  Refresh Data
                </Button>
              </div>
            </div>
          </div>
          
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 shadow-sm border border-green-200 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center">
                  <div className="bg-green-500 p-3 rounded-lg shadow-sm">
                    <TrafficCone className="text-white h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <p className="text-xs text-green-800 font-medium">Active Signals</p>
                    <p className="text-2xl font-bold text-green-900">{activeSignals}</p>
                  </div>
                </div>
                <div className="mt-2 h-2 bg-green-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${(activeSignals / 4) * 100}%` }}
                  ></div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 shadow-sm border border-red-200 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center">
                  <div className="bg-red-500 p-3 rounded-lg shadow-sm">
                    <AlertTriangle className="text-white h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <p className="text-xs text-red-800 font-medium">Error States</p>
                    <p className="text-2xl font-bold text-red-900">{errorStates}</p>
                  </div>
                </div>
                <div className="mt-2 h-2 bg-red-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-red-500 rounded-full"
                    style={{ width: `${(errorStates / 4) * 100}%` }}
                  ></div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 shadow-sm border border-amber-200 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center">
                  <div className="bg-amber-500 p-3 rounded-lg shadow-sm">
                    <Timer className="text-white h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <p className="text-xs text-amber-800 font-medium">Avg Duration</p>
                    <p className="text-2xl font-bold text-amber-900">{avgDuration}<span className="text-sm ml-1">sec</span></p>
                  </div>
                </div>
                <div className="mt-2 h-2 bg-amber-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-amber-500 rounded-full"
                    style={{ width: `${(parseInt(avgDuration) / 100) * 100}%` }}
                  ></div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 shadow-sm border border-blue-200 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center">
                  <div className="bg-blue-500 p-3 rounded-lg shadow-sm">
                    <Clock className="text-white h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <p className="text-xs text-blue-800 font-medium">Last Update</p>
                    <p className="text-2xl font-bold text-blue-900">{lastUpdateTime}</p>
                  </div>
                </div>
                <div className="mt-2 h-2 bg-blue-200 rounded-full">
                  <motion.div 
                    className="h-full bg-blue-500 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "linear"
                    }}
                  ></motion.div>
                </div>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default SystemOverview;
