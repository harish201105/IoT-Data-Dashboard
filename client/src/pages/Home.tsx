import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import SystemOverview from "@/components/SystemOverview";
import SignalCards from "@/components/SignalCards";
import SignalChart from "@/components/SignalChart";
import DurationControlPanel from "@/components/DurationControlPanel";
import Footer from "@/components/Footer";
import ErrorDisplay from "@/components/ErrorDisplay";
import { motion, AnimatePresence } from "framer-motion";

// Advanced Dashboard Components
import NotificationSystem from "@/components/Dashboard/NotificationSystem";
import SignalHistoryTimeline from "@/components/Dashboard/SignalHistoryTimeline";
import SignalPerformanceHeatMap from "@/components/Dashboard/SignalPerformanceHeatMap";

// Hooks
import useRealTimeData from "@/hooks/useRealTimeData";
import useDarkMode from "@/hooks/useDarkMode";
import { useState as useStateReact } from "react";

const Home: React.FC = () => {
  // Dark mode
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  
  // Dashboard user preferences
  const [chartType, setChartType] = useState<string>("composed");
  const [refreshInterval, setRefreshInterval] = useState<number>(5000); // 5 seconds
  const [showNotifications, setShowNotifications] = useState<boolean>(true);
  const [dashboardLayout, setDashboardLayout] = useState<string>("cards");
  
  // Real-time data with polling
  const { 
    data, 
    previousData,
    historicalData,
    isLoading, 
    error,
    isPolling,
    startPolling,
    stopPolling,
    refresh,
    changePollingInterval
  } = useRealTimeData({
    initialInterval: refreshInterval,
    autoStart: true,
    maxHistoryLength: 20
  });
  
  // Update polling interval when user preference changes
  useEffect(() => {
    changePollingInterval(refreshInterval);
  }, [refreshInterval, changePollingInterval]);
  
  // Duration control state
  const [duration, setDuration] = useState<string>("50");
  const [lastUpdated, setLastUpdated] = useState<string>("Just now");

  const handleDurationUpdate = (newDuration: string) => {
    setDuration(newDuration);
    
    // Update the last updated timestamp
    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    setLastUpdated(formattedTime);
  };

  const handleRefresh = async () => {
    refresh();
    
    // Update the last updated timestamp
    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    setLastUpdated(formattedTime);
  };

  // Count active signals
  const activeSignals = data ? 
    Object.values(data).filter(signal => signal.status === "on").length : 0;
  
  // Count error states (inactive signals and error conditions)
  const errorStates = data ? 
    Object.values(data).filter(signal => signal.status === "off" || signal.signal === "black").length : 0;
  
  // Calculate average duration
  const calculateAvgDuration = () => {
    if (!data) return "0";
    
    const durations = Object.values(data).map(signal => parseInt(signal.duration));
    const sum = durations.reduce((acc, curr) => acc + curr, 0);
    return (sum / durations.length || 0).toFixed(0);
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-slate-900 text-slate-100' 
        : 'bg-gradient-to-br from-slate-50 via-slate-50 to-blue-50 text-slate-900'
    }`}>
      <Header 
        isOnline={!error} 
        lastUpdated={lastUpdated}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        refreshInterval={refreshInterval}
        setRefreshInterval={setRefreshInterval}
        chartType={chartType}
        setChartType={setChartType}
        showNotifications={showNotifications}
        setShowNotifications={setShowNotifications}
        dashboardLayout={dashboardLayout}
        setDashboardLayout={setDashboardLayout}
      />
      
      {/* Notification System - moved to left side to avoid overlapping */}
      {showNotifications && data && previousData && (
        <div className="fixed top-24 left-6 z-40 max-w-md">
          <NotificationSystem signalData={data} previousData={previousData} />
        </div>
      )}
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        {error ? (
          <ErrorDisplay errorMessage={error.message} onRetry={handleRefresh} />
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            <div className="relative">
              <div className={`absolute -top-6 -left-6 w-24 h-24 ${isDarkMode ? 'bg-blue-800/20' : 'bg-blue-500/10'} rounded-full blur-2xl`}></div>
              <div className={`absolute -bottom-10 -right-10 w-32 h-32 ${isDarkMode ? 'bg-indigo-800/20' : 'bg-indigo-500/10'} rounded-full blur-3xl`}></div>
              
              <SystemOverview 
                isLoading={isLoading}
                activeSignals={activeSignals}
                errorStates={errorStates}
                avgDuration={duration || calculateAvgDuration()}
                lastUpdateTime={lastUpdated}
                onRefresh={handleRefresh}
              />
            </div>
            
            <div className="relative">
              <div className={`absolute top-1/2 -translate-y-1/2 -left-8 w-16 h-64 ${isDarkMode ? 'bg-green-800/20' : 'bg-green-500/10'} rounded-full blur-2xl`}></div>
              <div className={`absolute top-1/2 -translate-y-1/2 -right-8 w-16 h-64 ${isDarkMode ? 'bg-yellow-800/20' : 'bg-yellow-500/10'} rounded-full blur-2xl`}></div>
              
              <div className="mb-4">
                <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'gradient-text'} mb-1`}>Traffic Signal Status</h2>
                <p className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>Current state of all traffic signals across monitored intersections</p>
              </div>
              
              <div className={dashboardLayout === 'list' ? 'space-y-4' : ''}>
                <SignalCards 
                  signals={data || {}} 
                  isLoading={isLoading} 
                  duration={duration}
                />
              </div>
            </div>
            
            {/* Signal History Timelines */}
            {data && Object.keys(data).length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                {Object.keys(data).slice(0, 3).map(direction => (
                  <SignalHistoryTimeline 
                    key={direction}
                    signalData={data} 
                    direction={direction}
                    maxEntries={5}
                  />
                ))}
              </motion.div>
            )}
            
            <div className="relative">
              <div className={`absolute -bottom-8 left-1/3 w-40 h-24 ${isDarkMode ? 'bg-purple-800/20' : 'bg-purple-500/10'} rounded-full blur-3xl`}></div>
              
              <DurationControlPanel 
                duration={duration} 
                onUpdateDuration={handleDurationUpdate} 
              />
            </div>
            
            {/* Real-time Signal Chart with Advanced Visualizations */}
            <div className="relative mt-12 mb-6 transform transition-all duration-1000 hover:scale-[1.01]">
              <div className={`absolute top-1/2 -translate-y-1/2 -left-8 w-16 h-64 ${isDarkMode ? 'bg-blue-800/20' : 'bg-blue-500/10'} rounded-full blur-2xl`}></div>
              <div className={`absolute top-1/2 -translate-y-1/2 -right-8 w-16 h-64 ${isDarkMode ? 'bg-purple-800/20' : 'bg-purple-500/10'} rounded-full blur-2xl`}></div>
              
              <div className="mb-4">
                <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'gradient-text'} mb-1`}>Advanced Signal Analytics</h2>
                <p className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>Real-time animated visualization of traffic signal patterns and timing analysis</p>
              </div>
              
              <SignalChart 
                signalData={data || {}} 
                isLoading={isLoading}
                chartType={chartType as any}
              />
            </div>
            
            {/* Performance Heat Map */}
            {historicalData.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <SignalPerformanceHeatMap
                  signalData={data || {}}
                  historicalData={historicalData}
                />
              </motion.div>
            )}
            
            {/* Real-time status indicator - repositioned and styled better */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center space-x-3 z-50 px-4 py-2 rounded-full shadow-lg bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-slate-200 dark:border-slate-700">
              <div className={`h-3 w-3 rounded-full ${isPolling ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
              <p className="text-xs font-medium">
                {isPolling ? 'Real-time updates active' : 'Updates paused'}
              </p>
              <button 
                onClick={isPolling ? stopPolling : startPolling}
                className={`text-xs px-3 py-1 rounded-full transition-all duration-200 ${
                  isPolling 
                    ? 'bg-slate-200 text-slate-800 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600' 
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                {isPolling ? 'Pause' : 'Resume'}
              </button>
            </div>
          </motion.div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
