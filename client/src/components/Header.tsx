import React from "react";
import { TrafficCone } from "lucide-react";

interface HeaderProps {
  isOnline: boolean;
  lastUpdated: string;
}

const Header: React.FC<HeaderProps> = ({ isOnline, lastUpdated }) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <TrafficCone className="h-6 w-6 text-blue-600 mr-2" />
          <h1 className="text-xl font-semibold text-slate-800">Traffic Signal IoT Dashboard</h1>
        </div>
        <div className="flex items-center">
          <div className="flex items-center">
            <span className={`inline-block w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'} mr-2`}></span>
            <span className="text-sm text-slate-600">{isOnline ? 'System Online' : 'System Offline'}</span>
          </div>
          <div className="ml-4 text-sm text-slate-500">
            Last updated: <span>{lastUpdated}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
