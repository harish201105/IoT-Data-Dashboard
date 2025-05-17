import React from "react";
import { Button } from "@/components/ui/button";
import { TrafficCone, Book, HelpCircle, Activity, Github } from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-b from-white to-slate-50 border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="bg-blue-600 p-1.5 rounded-md mr-2">
                <TrafficCone className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-bold gradient-text">TrafficIoT</h3>
            </div>
            <p className="text-sm text-slate-500 mb-4 max-w-md">
              A powerful real-time dashboard for monitoring and controlling traffic signal systems. Optimize traffic flow with advanced IoT technology.
            </p>
            <div className="flex space-x-3">
              <a href="https://github.com/harish201105/IoT-Data-Dashboard" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="icon" className="rounded-full w-8 h-8 bg-white shadow-sm border-slate-200 hover:bg-slate-50">
                  <Github className="h-4 w-4 text-slate-700" />
                </Button>
              </a>
              <Button variant="outline" size="icon" className="rounded-full w-8 h-8 bg-white shadow-sm border-slate-200 hover:bg-slate-50">
                <Activity className="h-4 w-4 text-slate-700" />
              </Button>
            </div>
            <p className="text-xs text-slate-500 mt-3">Developed by Harish</p>
          </div>
          
          <div>
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Button variant="link" className="text-sm p-0 h-auto text-slate-600 hover:text-blue-600">
                  <Book className="h-4 w-4 mr-2" />
                  Documentation
                </Button>
              </li>
              <li>
                <Button variant="link" className="text-sm p-0 h-auto text-slate-600 hover:text-blue-600">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Help & Support
                </Button>
              </li>
              <li>
                <Button variant="link" className="text-sm p-0 h-auto text-slate-600 hover:text-blue-600">
                  <Activity className="h-4 w-4 mr-2" />
                  API Status
                </Button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">System Status</h4>
            <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">API</span>
                <span className="flex items-center text-xs font-medium text-green-600 dark:text-green-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1"></span>
                  Operational
                </span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Dashboard</span>
                <span className="flex items-center text-xs font-medium text-green-600 dark:text-green-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1"></span>
                  Operational
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Server</span>
                <span className="flex items-center text-xs font-medium text-green-600 dark:text-green-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1"></span>
                  Operational
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-slate-500 mb-4 md:mb-0">
            &copy; {currentYear} TrafficIoT Dashboard | v1.2.0
          </p>
          <div className="flex space-x-6">
            <Button variant="link" className="text-xs p-0 h-auto text-slate-500 hover:text-slate-700">
              Privacy Policy
            </Button>
            <Button variant="link" className="text-xs p-0 h-auto text-slate-500 hover:text-slate-700">
              Terms of Service
            </Button>
            <a href="mailto:harish.parthasarathy2005@gmail.com">
              <Button variant="link" className="text-xs p-0 h-auto text-slate-500 hover:text-slate-700">
                Contact
              </Button>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
