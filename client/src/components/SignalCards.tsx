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
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 p-2 rounded-lg shadow-md mr-3">
            <MapPin className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">Traffic Signal Status</h2>
        </div>
        <div className="flex items-center space-x-3">
          <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 text-xs font-medium rounded-full shadow-sm">
            {allDirections.length} Signals
          </span>
          <span className="bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 px-3 py-1 text-xs font-medium rounded-full shadow-sm">
            {allDirections.filter(dir => signals[dir].status === 'on').length} Active
          </span>
        </div>
      </div>
      
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-16"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {isLoading ? (
          // Show skeleton cards with staggered loading animation
          <div className="stagger-fade-in">
            {loadingPlaceholders.map((direction) => (
              <motion.div
                key={direction}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5,
                  delay: loadingPlaceholders.indexOf(direction) * 0.1
                }}
              >
                <SignalCard
                  key={direction}
                  direction={direction}
                  signal={{ signal: "", duration: "", status: "" }}
                  isLoading={true}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          // Show actual signal cards for all directions from API
          allDirections.map((direction, index) => (
            <motion.div
              key={direction}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.03,
                transition: { duration: 0.2 }
              }}
              className="transform hover:z-10"
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
