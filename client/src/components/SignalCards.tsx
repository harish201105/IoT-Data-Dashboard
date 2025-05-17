import React from "react";
import SignalCard from "./SignalCard";
import { SignalData } from "@/types/signals";

interface SignalCardsProps {
  signals: SignalData;
  isLoading: boolean;
  duration?: string;
}

const SignalCards: React.FC<SignalCardsProps> = ({ signals, isLoading, duration }) => {
  // Filter to ensure we only use the first 4 valid directions
  // (east, west, north, south, ignoring "South" and "outh" from API)
  const validDirections = ['east', 'west', 'north', 'south'];
  
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">Traffic Signal Status</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
          validDirections.map((direction) => {
            if (signals[direction]) {
              return (
                <SignalCard
                  key={direction}
                  direction={direction}
                  signal={signals[direction]}
                  isLoading={false}
                  duration={duration}
                />
              );
            }
            return null;
          })
        )}
      </div>
    </div>
  );
};

export default SignalCards;
