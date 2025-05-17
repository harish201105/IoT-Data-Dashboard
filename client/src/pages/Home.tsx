import React from "react";
import Header from "@/components/Header";
import SystemOverview from "@/components/SystemOverview";
import SignalCards from "@/components/SignalCards";
import DurationControlPanel from "@/components/DurationControlPanel";
import Footer from "@/components/Footer";
import ErrorDisplay from "@/components/ErrorDisplay";
import { useSignalData } from "@/hooks/useSignalData";
import { useState } from "react";

const Home: React.FC = () => {
  const { data, isLoading, isError, error, refetch } = useSignalData();
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
    await refetch();
    
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
  
  // Count error states (black signals are considered errors)
  const errorStates = data ? 
    Object.values(data).filter(signal => signal.signal === "black").length : 0;
  
  // Calculate average duration
  const calculateAvgDuration = () => {
    if (!data) return "0";
    
    const durations = Object.values(data).map(signal => parseInt(signal.duration));
    const sum = durations.reduce((acc, curr) => acc + curr, 0);
    return (sum / durations.length || 0).toFixed(0);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-slate-50 to-blue-50">
      <Header isOnline={!isError} lastUpdated={lastUpdated} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        {isError ? (
          <ErrorDisplay errorMessage={error as string} onRetry={refetch} />
        ) : (
          <div className="space-y-8">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl"></div>
              
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
              <div className="absolute top-1/2 -translate-y-1/2 -left-8 w-16 h-64 bg-green-500/10 rounded-full blur-2xl"></div>
              <div className="absolute top-1/2 -translate-y-1/2 -right-8 w-16 h-64 bg-yellow-500/10 rounded-full blur-2xl"></div>
              
              <SignalCards 
                signals={data || {}} 
                isLoading={isLoading} 
                duration={duration}
              />
            </div>
            
            <div className="relative">
              <div className="absolute -bottom-8 left-1/3 w-40 h-24 bg-purple-500/10 rounded-full blur-3xl"></div>
              
              <DurationControlPanel 
                duration={duration} 
                onUpdateDuration={handleDurationUpdate} 
              />
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
