import React from "react";
import SignalCard from "./SignalCard";
import { SignalData } from "@/types/signals";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

interface SignalCardsProps {
  signals: SignalData;
  isLoading: boolean;
  duration?: string;
}

const SignalCards: React.FC<SignalCardsProps> = ({ signals, isLoading, duration }) => {
  // Get all directions from the API response
  const allDirections = isLoading ? [] : Object.keys(signals);
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };
  
  // For loading state, we'll show 6 skeleton cards
  const loadingPlaceholders = ['east', 'west', 'north', 'south', 'South', 'other'];
  
  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 p-2 rounded-lg shadow-md mr-3">
          <MapPin className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-xl font-bold text-slate-800">Traffic Signal Status</h2>
        <span className="ml-3 bg-blue-100 text-blue-800 px-2 py-1 text-xs font-medium rounded-full">
          {allDirections.length} Signals
        </span>
      </div>
      
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {isLoading ? (
          // Show skeleton cards while loading
          <>
            {loadingPlaceholders.map((direction) => (
              <SignalCard
                key={direction}
                direction={direction}
                signal={{ signal: "", duration: "", status: "" }}
                isLoading={true}
              />
            ))}
          </>
        ) : (
          // Show actual signal cards for all directions from API
          allDirections.map((direction, index) => (
            <motion.div
              key={direction}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <SignalCard
                direction={direction}
                signal={signals[direction]}
                isLoading={false}
                duration={duration}
              />
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
};

export default SignalCards;
