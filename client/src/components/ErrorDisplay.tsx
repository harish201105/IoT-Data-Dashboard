import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface ErrorDisplayProps {
  errorMessage: string;
  onRetry: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ errorMessage, onRetry }) => {
  return (
    <Card className="bg-red-50 border-red-200">
      <CardContent className="p-4">
        <div className="flex">
          <AlertTriangle className="text-red-500 h-6 w-6 mr-3" />
          <div>
            <h3 className="font-medium text-red-800">Error Fetching Data</h3>
            <p className="text-sm text-red-700 mt-1">{errorMessage || "Unable to connect to the API. Please check your connection and try again."}</p>
            <Button 
              variant="ghost" 
              className="mt-2 text-sm font-medium text-red-800 hover:text-red-900 hover:bg-red-100 p-0" 
              onClick={onRetry}
            >
              Retry Connection
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ErrorDisplay;
