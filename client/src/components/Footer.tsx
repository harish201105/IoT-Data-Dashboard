import React from "react";
import { Button } from "@/components/ui/button";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-slate-500">Traffic Signal IoT Dashboard | v1.0.0</p>
          </div>
          <div className="flex space-x-4">
            <Button variant="link" className="text-sm text-slate-600 hover:text-blue-600">Documentation</Button>
            <Button variant="link" className="text-sm text-slate-600 hover:text-blue-600">Support</Button>
            <Button variant="link" className="text-sm text-slate-600 hover:text-blue-600">API Status</Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
