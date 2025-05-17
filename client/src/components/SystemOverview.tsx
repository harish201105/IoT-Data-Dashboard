import React from "react";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, TrafficCone, AlertTriangle, Timer, Clock } from "lucide-react";

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
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <h2 className="text-lg font-semibold text-slate-800 mb-2 sm:mb-0">System Overview</h2>
            <div className="flex items-center">
              <Button 
                variant="outline" 
                size="sm" 
                className="inline-flex items-center bg-blue-50 text-blue-700 hover:bg-blue-100" 
                onClick={onRefresh}
                disabled={isLoading}
              >
                {isLoading ? (
                  <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4 mr-1" />
                )}
                Refresh
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-green-50 rounded-md p-3 flex items-center">
              <div className="bg-green-100 p-2 rounded-md">
                <TrafficCone className="text-green-600 h-5 w-5" />
              </div>
              <div className="ml-3">
                <p className="text-xs text-green-800 font-medium">Active Signals</p>
                <p className="text-lg font-semibold text-green-900">{activeSignals}</p>
              </div>
            </div>
            
            <div className="bg-red-50 rounded-md p-3 flex items-center">
              <div className="bg-red-100 p-2 rounded-md">
                <AlertTriangle className="text-red-600 h-5 w-5" />
              </div>
              <div className="ml-3">
                <p className="text-xs text-red-800 font-medium">Error States</p>
                <p className="text-lg font-semibold text-red-900">{errorStates}</p>
              </div>
            </div>
            
            <div className="bg-yellow-50 rounded-md p-3 flex items-center">
              <div className="bg-yellow-100 p-2 rounded-md">
                <Timer className="text-yellow-600 h-5 w-5" />
              </div>
              <div className="ml-3">
                <p className="text-xs text-yellow-800 font-medium">Average Duration</p>
                <p className="text-lg font-semibold text-yellow-900">{avgDuration}s</p>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-md p-3 flex items-center">
              <div className="bg-blue-100 p-2 rounded-md">
                <Clock className="text-blue-600 h-5 w-5" />
              </div>
              <div className="ml-3">
                <p className="text-xs text-blue-800 font-medium">Last Update</p>
                <p className="text-lg font-semibold text-blue-900">{lastUpdateTime}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemOverview;
