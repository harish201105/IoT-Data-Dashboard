import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { SignalData } from '@/types/signals';
import { Clock, ArrowRight } from 'lucide-react';

interface SignalHistoryTimelineProps {
  signalData: SignalData;
  direction: string;
  maxEntries?: number;
}

interface HistoryEntry {
  id: string;
  timestamp: Date;
  signal: string;
  direction: string;
}

const SignalHistoryTimeline: React.FC<SignalHistoryTimelineProps> = ({ 
  signalData, 
  direction,
  maxEntries = 5
}) => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  
  // Update history when signal data changes
  useEffect(() => {
    if (!signalData[direction]) return;
    
    const currentSignal = signalData[direction];
    
    // Check if the last entry has a different signal value
    const lastEntry = history[0];
    if (!lastEntry || lastEntry.signal !== currentSignal.signal) {
      // Add new history entry at the beginning of the array
      const newEntry: HistoryEntry = {
        id: `${direction}-${Date.now()}`,
        timestamp: new Date(),
        signal: currentSignal.signal,
        direction
      };
      
      // Limit entries to maxEntries
      setHistory(prev => [newEntry, ...prev].slice(0, maxEntries));
    }
  }, [signalData, direction, history, maxEntries]);
  
  if (history.length === 0) {
    return (
      <Card className="p-4 text-center text-slate-500 text-sm">
        No signal history available yet
      </Card>
    );
  }
  
  const getSignalColor = (signal: string) => {
    switch (signal) {
      case 'red': return 'bg-red-500';
      case 'yellow': return 'bg-yellow-500';
      case 'green': return 'bg-green-500';
      default: return 'bg-slate-500';
    }
  };
  
  return (
    <Card className="p-4">
      <h3 className="text-sm font-medium mb-3 flex items-center">
        <Clock className="w-4 h-4 mr-1" />
        Signal History ({direction.charAt(0).toUpperCase() + direction.slice(1)})
      </h3>
      
      <div className="space-y-3">
        {history.map((entry, index) => (
          <motion.div 
            key={entry.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-center"
          >
            <div className={`w-4 h-4 rounded-full ${getSignalColor(entry.signal)}`}></div>
            <div className="ml-2 flex-grow">
              <div className="text-xs font-medium capitalize">{entry.signal}</div>
              <div className="text-[10px] text-slate-500">
                {entry.timestamp.toLocaleTimeString()}
              </div>
            </div>
            {index < history.length - 1 && (
              <ArrowRight className="w-3 h-3 text-slate-300" />
            )}
          </motion.div>
        ))}
      </div>
    </Card>
  );
};

export default SignalHistoryTimeline;