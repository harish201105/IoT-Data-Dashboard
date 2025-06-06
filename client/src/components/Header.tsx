import React, { useState } from "react";
import { TrafficCone, Clock, Wifi, WifiOff, Settings } from "lucide-react";
import { motion } from "framer-motion";
import ThemeToggle from "./Dashboard/ThemeToggle";
import UserPreferences from "./Dashboard/UserPreferences";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { AnimatePresence } from "framer-motion";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { UserPreferencesWrapper } from "./Dashboard/UserPreferences"



interface HeaderProps {
  isOnline: boolean;
  lastUpdated: string;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  refreshInterval: number;
  setRefreshInterval: (value: number) => void;
  chartType: string;
  setChartType: (value: string) => void;
  showNotifications: boolean;
  setShowNotifications: (value: boolean) => void;
  dashboardLayout: string;
  setDashboardLayout: (value: string) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  isOnline, 
  lastUpdated,
  isDarkMode,
  toggleDarkMode,
  refreshInterval,
  setRefreshInterval,
  chartType,
  setChartType,
  showNotifications,
  setShowNotifications,
  dashboardLayout,
  setDashboardLayout
}) => {
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
              isOnline ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'
            } mr-2`}>
              {isOnline ? (
                <Wifi className="h-4 w-4 text-green-600 dark:text-green-400" />
              ) : (
                <WifiOff className="h-4 w-4 text-red-600 dark:text-red-400" />
              )}
            </div>
            <span className={`text-sm font-medium ${
              isOnline ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}>
              {isOnline ? 'System Online' : 'System Offline'}
            </span>
          </motion.div>

          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="flex items-center px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 rounded-full"
          >
            <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-1.5" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Last updated: <span className="text-blue-600 dark:text-blue-400">{lastUpdated}</span>
            </span>
          </motion.div>

          {/* Theme Toggle */}
          <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleDarkMode} />

          {/* Settings Icon - Direct UserPreferences */}
          <div className="relative">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-9 w-9"
              onClick={() => {
                const prefPanel = document.getElementById('userPreferencesPanel');
                if (prefPanel) {
                  const displayStyle = window.getComputedStyle(prefPanel).display;
                  prefPanel.style.display = displayStyle === 'none' ? 'block' : 'none';
                }
              }}
            >
              <Settings className="h-4 w-4" />
            </Button>

            <div 
              id="userPreferencesPanel" 
              className="absolute right-0 mt-2 z-50 w-80 hidden"
              style={{ boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
            >
              <Card className={`p-5 ${isDarkMode ? 'bg-slate-800 text-slate-200' : 'bg-white'}`}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold">Dashboard Preferences</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => {
                      const prefPanel = document.getElementById('userPreferencesPanel');
                      if (prefPanel) prefPanel.style.display = 'none';
                    }} 
                    className="h-8 w-8 p-0"
                  >
                    &times;
                  </Button>
                </div>

                <div className="space-y-5">
                  <UserPreferences 
                    isDarkMode={isDarkMode}
                    setIsDarkMode={toggleDarkMode}
                    refreshInterval={refreshInterval / 1000}
                    setRefreshInterval={(value: number) => setRefreshInterval(value * 1000)}
                    chartType={chartType}
                    setChartType={setChartType}
                    showNotifications={showNotifications}
                    setShowNotifications={setShowNotifications}
                    dashboardLayout={dashboardLayout}
                    setDashboardLayout={setDashboardLayout}
                  />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;