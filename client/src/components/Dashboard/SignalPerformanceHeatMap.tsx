import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { SignalData } from '@/types/signals';
import { motion } from 'framer-motion';
import { Thermometer, AlertTriangle, Info } from 'lucide-react';

interface SignalPerformanceHeatMapProps {
  signalData: SignalData;
  historicalData: Array<{
    timestamp: Date;
    data: SignalData;
  }>;
}

const SignalPerformanceHeatMap: React.FC<SignalPerformanceHeatMapProps> = ({
  signalData,
  historicalData
}) => {
  const [performanceScores, setPerformanceScores] = useState<Record<string, number>>({});
  const [hoverInfo, setHoverInfo] = useState<{
    direction: string;
    score: number;
    details: string;
  } | null>(null);

  // Calculate performance scores based on signal stability and transitions
  useEffect(() => {
    if (historicalData.length < 2) return;

    const scores: Record<string, number> = {};
    const directions = Object.keys(signalData);

    directions.forEach(direction => {
      let score = 100; // Start with perfect score
      let transitions = 0;
      let redDuration = 0;
      let totalTime = 0;
      
      // Analyze historical transitions
      for (let i = 1; i < historicalData.length; i++) {
        const prevData = historicalData[i-1].data[direction];
        const currData = historicalData[i].data[direction];
        
        if (!prevData || !currData) continue;
        
        // Count transitions (frequent transitions might indicate issues)
        if (prevData.signal !== currData.signal) {
          transitions++;
        }
        
        // Track red light duration ratio
        if (currData.signal === 'red') {
          redDuration += 1;
        }
        
        totalTime += 1;
      }
      
      // Apply penalties for frequent transitions (unstable signals)
      if (transitions > historicalData.length * 0.5) {
        score -= 30; // Too many transitions
      }
      
      // Apply penalties for high red light ratio (traffic flow issues)
      const redRatio = redDuration / totalTime;
      if (redRatio > 0.6) {
        score -= 20; // Too much red light time
      }
      
      // Apply penalties for inactive signals
      if (signalData[direction].status !== 'on') {
        score -= 50; // Offline signal
      }
      
      // Ensure score is between 0-100
      scores[direction] = Math.max(0, Math.min(100, score));
    });
    
    setPerformanceScores(scores);
  }, [signalData, historicalData]);

  // Get cell background color based on performance score
  const getCellColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-green-300';
    if (score >= 40) return 'bg-yellow-300';
    if (score >= 20) return 'bg-orange-400';
    return 'bg-red-500';
  };

  // Get performance category based on score
  const getPerformanceCategory = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Average';
    if (score >= 20) return 'Poor';
    return 'Critical';
  };

  // Get insight message based on direction and score
  const getInsightMessage = (direction: string, score: number) => {
    if (score < 30) {
      return `${direction} signal shows critical performance issues. Maintenance required.`;
    }
    if (score < 50) {
      return `${direction} signal performance is below average. Consider optimization.`;
    }
    if (score < 70) {
      return `${direction} signal is performing adequately but could be improved.`;
    }
    return `${direction} signal is performing optimally. No action needed.`;
  };

  return (
    <Card className="p-5 relative">
      <div className="flex items-center mb-4">
        <Thermometer className="h-5 w-5 mr-2 text-indigo-600" />
        <h3 className="text-lg font-bold">Signal Performance Heat Map</h3>
      </div>
      
      <div className="grid grid-cols-3 gap-2 mb-4">
        {Object.entries(performanceScores).map(([direction, score]) => (
          <motion.div
            key={direction}
            className={`p-4 rounded-lg ${getCellColor(score)} relative cursor-help`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            onMouseEnter={() => setHoverInfo({
              direction,
              score,
              details: getInsightMessage(direction, score)
            })}
            onMouseLeave={() => setHoverInfo(null)}
          >
            <div className="text-white">
              <div className="text-sm font-bold mb-1 capitalize">{direction}</div>
              <div className="text-2xl font-bold">{score}%</div>
              <div className="text-xs mt-1 opacity-80">{getPerformanceCategory(score)}</div>
            </div>
            
            {score < 40 && (
              <div className="absolute top-2 right-2">
                <AlertTriangle className="h-4 w-4 text-white" />
              </div>
            )}
          </motion.div>
        ))}
      </div>
      
      {hoverInfo && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 bg-white shadow-lg rounded-lg border border-slate-200 mb-3"
        >
          <div className="flex items-start">
            <Info className="h-4 w-4 text-indigo-500 mr-2 mt-0.5" />
            <div>
              <div className="text-sm font-bold capitalize">{hoverInfo.direction} Signal Insight</div>
              <div className="text-xs text-slate-600 mt-1">{hoverInfo.details}</div>
            </div>
          </div>
        </motion.div>
      )}
      
      <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-200">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
          <span>Critical</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-orange-400 rounded-sm"></div>
          <span>Poor</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-yellow-300 rounded-sm"></div>
          <span>Average</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-green-300 rounded-sm"></div>
          <span>Good</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
          <span>Excellent</span>
        </div>
      </div>
    </Card>
  );
};

export default SignalPerformanceHeatMap;