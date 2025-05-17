import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings, Layout, Eye, Bell, BarChart3, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface UserPreferencesProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
  refreshInterval: number;
  setRefreshInterval: (value: number) => void;
  chartType: string;
  setChartType: (value: string) => void;
  showNotifications: boolean;
  setShowNotifications: (value: boolean) => void;
  dashboardLayout: string;
  setDashboardLayout: (value: string) => void;
}

const UserPreferences: React.FC<UserPreferencesProps> = ({
  isDarkMode,
  setIsDarkMode,
  refreshInterval,
  setRefreshInterval,
  chartType,
  setChartType,
  showNotifications,
  setShowNotifications,
  dashboardLayout,
  setDashboardLayout
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className={`rounded-full flex items-center justify-center ${
          isDarkMode ? 'bg-slate-800 text-slate-200 border-slate-700' : 'bg-white text-slate-700'
        }`}
      >
        <Settings className="h-4 w-4 mr-2" />
        <span>Preferences</span>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 z-50 w-80"
          >
            <Card className={`p-5 shadow-xl ${isDarkMode ? 'bg-slate-800 text-slate-200' : 'bg-white'}`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Dashboard Preferences</h3>
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="h-8 w-8 p-0">
                  &times;
                </Button>
              </div>

              <div className="space-y-5">
                {/* Theme Toggle */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-2" />
                    <span>High Contrast Mode</span>
                  </div>
                  <Switch checked={isDarkMode} onCheckedChange={setIsDarkMode} />
                </div>

                {/* Refresh Interval */}
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>Refresh Interval: {refreshInterval}s</span>
                  </div>
                  <Slider 
                    value={[refreshInterval]} 
                    min={5}
                    max={60}
                    step={5}
                    onValueChange={(value) => setRefreshInterval(value[0])}
                  />
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>5s</span>
                    <span>30s</span>
                    <span>60s</span>
                  </div>
                </div>

                {/* Chart Type */}
                <div className="space-y-2">
                  <div className="flex items-center">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    <span>Chart Type</span>
                  </div>
                  <Select value={chartType} onValueChange={setChartType}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select chart type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="composed">Composed</SelectItem>
                      <SelectItem value="line">Line</SelectItem>
                      <SelectItem value="area">Area</SelectItem>
                      <SelectItem value="bar">Bar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Notifications */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Bell className="h-4 w-4 mr-2" />
                    <span>Signal Change Notifications</span>
                  </div>
                  <Switch checked={showNotifications} onCheckedChange={setShowNotifications} />
                </div>

                {/* Layout */}
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Layout className="h-4 w-4 mr-2" />
                    <span>Dashboard Layout</span>
                  </div>
                  <Select value={dashboardLayout} onValueChange={setDashboardLayout}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select layout" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cards">Card Grid</SelectItem>
                      <SelectItem value="list">List View</SelectItem>
                      <SelectItem value="compact">Compact View</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => setIsOpen(false)}
                >
                  Save Preferences
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserPreferences;