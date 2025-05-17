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
  // Filter to ensure we only use the first 4 valid directions
  // (east, west, north, south, ignoring "South" and "outh" from API)
  const validDirections = ['east', 'west', 'north', 'south'];
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };
  
  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 p-2 rounded-lg shadow-md mr-3">
          <MapPin className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-xl font-bold text-slate-800">Traffic Signal Status</h2>
      </div>
      
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {isLoading ? (
          // Show skeleton cards while loading
          <>
            {validDirections.map((direction) => (
              <SignalCard
                key={direction}
                direction={direction}
                signal={{ signal: "", duration: "", status: "" }}
                isLoading={true}
              />
            ))}
          </>
        ) : (
          // Show actual signal cards
          validDirections.map((direction, index) => {
            if (signals[direction]) {
              return (
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
              );
            }
            return null;
          })
        )}
      </motion.div>
    </div>
  );
};

export default SignalCards;
