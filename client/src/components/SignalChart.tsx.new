import React, { useEffect, useState, useRef } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area, BarChart, Bar, ComposedChart, ReferenceLine
} from 'recharts';
import { Card } from "@/components/ui/card";
import { SignalData } from "@/types/signals";
import { motion } from "framer-motion";
import { ArrowUpRight, Activity, BarChart3 } from "lucide-react";

interface SignalChartProps {
  signalData: SignalData;
  chartType?: 'line' | 'area' | 'bar' | 'composed';
  isLoading?: boolean;
}

const SignalChart: React.FC<SignalChartProps> = ({ 
  signalData, 
  chartType = 'composed',
  isLoading = false 
}) => {
  const [chartData, setChartData] = useState<any[]>([]);
  const [timeLabels, setTimeLabels] = useState<string[]>([]);
  const [chartHeight, setChartHeight] = useState<number>(300);
  const [activeTab, setActiveTab] = useState<'composed' | 'area' | 'line'>('composed');
  const chartRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [animateData, setAnimateData] = useState<boolean>(false);

  // Animation variants
  const chartVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        delay: 0.2
      }
    }
  };

  // Chart color scheme - advanced traffic signal theme
  const chartColors = {
    east: {
      primary: '#3b82f6',
      secondary: '#60a5fa',
      gradient: ['#3b82f6', '#2563eb']
    },
    west: {
      primary: '#8b5cf6',
      secondary: '#a78bfa',
      gradient: ['#8b5cf6', '#7c3aed']
    },
    north: {
      primary: '#10b981',
      secondary: '#34d399',
      gradient: ['#10b981', '#059669']
    },
    south: {
      primary: '#f59e0b',
      secondary: '#fbbf24',
      gradient: ['#f59e0b', '#d97706']
    },
    South: {
      primary: '#ef4444',
      secondary: '#f87171',
      gradient: ['#ef4444', '#dc2626']
    },
    outh: {
      primary: '#6b7280',
      secondary: '#9ca3af',
      gradient: ['#6b7280', '#4b5563']
    }
  };

  useEffect(() => {
    if (!signalData || Object.keys(signalData).length === 0) return;

    // Get current time for x-axis label
    const now = new Date();
    const timeLabel = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    
    // Create new data points for each signal
    const newDataPoint = {
      time: timeLabel,
      east: signalData.east.signal === 'red' ? 100 : 
            signalData.east.signal === 'yellow' ? 50 : 0,
      west: signalData.west.signal === 'red' ? 100 : 
            signalData.west.signal === 'yellow' ? 50 : 0,
      north: signalData.north.signal === 'red' ? 100 : 
            signalData.north.signal === 'yellow' ? 50 : 0,
      south: signalData.south.signal === 'red' ? 100 : 
            signalData.south.signal === 'yellow' ? 50 : 0,
      South: signalData.South?.signal === 'red' ? 100 : 
            signalData.South?.signal === 'yellow' ? 50 : 0,
      outh: signalData.outh?.signal === 'red' ? 100 : 
            signalData.outh?.signal === 'yellow' ? 50 : 0,
      eastDuration: parseInt(signalData.east.duration),
      westDuration: parseInt(signalData.west.duration),
      northDuration: parseInt(signalData.north.duration),
      southDuration: parseInt(signalData.south.duration),
      SouthDuration: signalData.South ? parseInt(signalData.South.duration) : 0,
      outhDuration: signalData.outh ? parseInt(signalData.outh.duration) : 0,
      // Add signal strings for tooltip display
      eastSignal: signalData.east.signal,
      westSignal: signalData.west.signal,
      northSignal: signalData.north.signal,
      southSignal: signalData.south.signal,
      SouthSignal: signalData.South?.signal || 'n/a',
      outhSignal: signalData.outh?.signal || 'n/a',
    };
    
    // Update our chart data array (keep last 10 points)
    setChartData(prevData => {
      // Set flag to trigger animation
      setAnimateData(true);
      
      // After animation trigger, reset the flag
      setTimeout(() => setAnimateData(false), 300);
      
      const newData = [...prevData, newDataPoint];
      if (newData.length > 10) {
        return newData.slice(newData.length - 10);
      }
      return newData;
    });
    
    // Update time labels (keep last 10)
    setTimeLabels(prevLabels => {
      const newLabels = [...prevLabels, timeLabel];
      if (newLabels.length > 10) {
        return newLabels.slice(newLabels.length - 10);
      }
      return newLabels;
    });
  }, [signalData]);

  // Custom tooltip for the charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-md p-4 rounded-lg shadow-lg border border-slate-200">
          <p className="text-slate-500 font-medium mb-2">{label}</p>
          <div className="space-y-1">
            {payload.map((entry: any, index: number) => {
              const direction = entry.dataKey.replace('Duration', '').replace('Signal', '');
              // Check if this is a duration entry
              const isDuration = entry.dataKey.includes('Duration');
              // Check if this is a signal entry
              const isSignal = !isDuration && !entry.dataKey.includes('time');
              
              // Only show main signal entries in tooltip
              if (isSignal && ['east', 'west', 'north', 'south'].includes(direction)) {
                const signalType = payload.find((p: any) => p.dataKey === `${direction}Signal`)?.value || '';
                return (
                  <div key={`tooltip-${index}`} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full bg-${getColorClass(direction, signalType)}`}></div>
                    <span className="font-medium capitalize">{direction}:</span>
                    <span className={`font-semibold text-${getColorClass(direction, signalType)}`}>
                      {signalType.toUpperCase()}
                    </span>
                    <span className="text-slate-500 text-sm">
                      ({payload.find((p: any) => p.dataKey === `${direction}Duration`)?.value || 0}s)
                    </span>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      );
    }
    return null;
  };
  
  const getColorClass = (direction: string, signalType: string) => {
    if (signalType === 'red') return 'red-500';
    if (signalType === 'yellow') return 'yellow-500';
    if (signalType === 'green') return 'green-500';
    return 'gray-500';
  };

  if (isLoading) {
    return (
      <Card className="p-5 h-96 glass-panel shine-effect">
        <div className="w-full h-full flex items-center justify-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <BarChart3 size={16} className="text-indigo-300" />
            </div>
          </div>
          <p className="ml-3 text-slate-400 animate-pulse">Loading chart data...</p>
        </div>
      </Card>
    );
  }

  if (chartData.length === 0) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={chartVariants}
      >
        <Card className="p-5 h-96 glass-panel">
          <div className="w-full h-full flex flex-col items-center justify-center">
            <Activity size={40} className="text-slate-300 mb-2" />
            <p className="text-slate-500 mb-1">No data available</p>
            <p className="text-slate-400 text-sm">Waiting for signal updates...</p>
          </div>
        </Card>
      </motion.div>
    );
  }

  // Chart tab selector component
  const ChartTypeTabs = () => {
    return (
      <div className="flex bg-slate-100/70 p-1 rounded-lg mb-4 w-fit">
        {['composed', 'area', 'line'].map((type) => (
          <button
            key={type}
            onClick={() => setActiveTab(type as any)}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
              activeTab === type 
                ? 'bg-white shadow-sm text-blue-600' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>
    );
  };

  // Enhanced chart rendering
  const renderChart = () => {
    // Define shared chart props for consistent styling
    const chartProps = {
      data: chartData,
      margin: { top: 20, right: 30, left: 20, bottom: 10 }
    };
    
    // Custom animation for chart elements
    const animationProps = {
      animationDuration: 1000,
      animationEasing: 'ease-in-out'
    };
    
    // Shared component props
    const gridProps = {
      strokeDasharray: '3 3',
      stroke: '#e0e0e0',
      vertical: false
    };
    
    const xAxisProps = {
      dataKey: 'time',
      tick: { fontSize: 12, fill: '#64748b' },
      axisLine: { stroke: '#cbd5e1' },
      tickLine: { stroke: '#cbd5e1' }
    };
    
    const yAxisProps = {
      tick: { fontSize: 12, fill: '#64748b' },
      axisLine: { stroke: '#cbd5e1' },
      tickLine: { stroke: '#cbd5e1' }
    };

    // Chart specific render functions
    switch (activeTab) {
      case 'line':
        return (
          <LineChart {...chartProps} {...animationProps}>
            <defs>
              {Object.entries(chartColors).map(([direction, colors]) => (
                <linearGradient key={`line-gradient-${direction}`} id={`line-gradient-${direction}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors.primary} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={colors.primary} stopOpacity={0.2}/>
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid {...gridProps} />
            <XAxis {...xAxisProps} />
            <YAxis {...yAxisProps} domain={[0, 100]} />
            <ReferenceLine 
              y={50} 
              stroke="#f59e0b" 
              strokeDasharray="3 3" 
              label={{ value: 'Yellow Signal', position: 'insideBottomRight', fill: '#f59e0b', fontSize: 12 }}
            />
            <ReferenceLine 
              y={100} 
              stroke="#ef4444" 
              strokeDasharray="3 3" 
              label={{ value: 'Red Signal', position: 'insideTopRight', fill: '#ef4444', fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: '10px' }} />
            
            {Object.entries(chartColors).map(([direction, colors]) => (
              <Line 
                key={`line-${direction}`}
                type="monotoneX" 
                dataKey={direction} 
                name={`${direction.charAt(0).toUpperCase() + direction.slice(1)} Signal`}
                stroke={colors.primary}
                strokeWidth={3}
                dot={{ r: 6, fill: colors.primary, strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 8, stroke: colors.secondary, strokeWidth: 2 }}
                isAnimationActive={true}
              />
            ))}
          </LineChart>
        );
        
      case 'area':
        return (
          <AreaChart {...chartProps} {...animationProps}>
            <defs>
              {Object.entries(chartColors).map(([direction, colors]) => (
                <linearGradient key={`area-gradient-${direction}`} id={`area-gradient-${direction}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors.primary} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={colors.primary} stopOpacity={0.1}/>
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid {...gridProps} />
            <XAxis {...xAxisProps} />
            <YAxis {...yAxisProps} domain={[0, 100]} />
            <ReferenceLine 
              y={50} 
              stroke="#f59e0b" 
              strokeDasharray="3 3" 
              label={{ value: 'Yellow Signal', position: 'insideBottomRight', fill: '#f59e0b', fontSize: 12 }}
            />
            <ReferenceLine 
              y={100} 
              stroke="#ef4444" 
              strokeDasharray="3 3" 
              label={{ value: 'Red Signal', position: 'insideTopRight', fill: '#ef4444', fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: '10px' }} />
            
            {Object.entries(chartColors).map(([direction, colors]) => (
              <Area 
                key={`area-${direction}`}
                type="monotoneX" 
                dataKey={direction} 
                name={`${direction.charAt(0).toUpperCase() + direction.slice(1)} Signal`}
                stroke={colors.primary}
                fillOpacity={1}
                fill={`url(#area-gradient-${direction})`}
                strokeWidth={2}
                isAnimationActive={true}
                animationDuration={1500}
              />
            ))}
          </AreaChart>
        );
        
      case 'composed':
      default:
        return (
          <ComposedChart {...chartProps} {...animationProps}>
            <defs>
              {Object.entries(chartColors).map(([direction, colors]) => (
                <React.Fragment key={`gradient-def-${direction}`}>
                  <linearGradient id={`composed-area-${direction}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={colors.primary} stopOpacity={0.6}/>
                    <stop offset="95%" stopColor={colors.primary} stopOpacity={0.05}/>
                  </linearGradient>
                  <linearGradient id={`composed-bar-${direction}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={colors.gradient[0]} stopOpacity={0.9}/>
                    <stop offset="95%" stopColor={colors.gradient[1]} stopOpacity={0.9}/>
                  </linearGradient>
                </React.Fragment>
              ))}
            </defs>
            
            <CartesianGrid {...gridProps} />
            <XAxis {...xAxisProps} />
            <YAxis yAxisId="left" {...yAxisProps} domain={[0, 100]} />
            <YAxis yAxisId="right" orientation="right" {...yAxisProps} />
            
            <ReferenceLine 
              y={50} 
              yAxisId="left"
              stroke="#f59e0b" 
              strokeDasharray="3 3" 
              label={{ value: 'Yellow Signal', position: 'insideBottomRight', fill: '#f59e0b', fontSize: 12 }}
            />
            <ReferenceLine 
              y={100} 
              yAxisId="left"
              stroke="#ef4444" 
              strokeDasharray="3 3" 
              label={{ value: 'Red Signal', position: 'insideTopRight', fill: '#ef4444', fontSize: 12 }}
            />
            
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: '10px' }} />
            
            {/* Signal Areas */}
            {Object.entries(chartColors).slice(0, 4).map(([direction, colors]) => (
              <Area 
                key={`area-${direction}`}
                yAxisId="left"
                type="monotoneX" 
                dataKey={direction} 
                name={`${direction.charAt(0).toUpperCase() + direction.slice(1)} Signal`}
                stroke={colors.primary}
                fill={`url(#composed-area-${direction})`}
                strokeWidth={2}
                isAnimationActive={true}
              />
            ))}
            
            {/* Duration Bars */}
            {Object.entries(chartColors).slice(0, 4).map(([direction, colors]) => (
              <Bar 
                key={`bar-${direction}`}
                yAxisId="right"
                dataKey={`${direction}Duration`}
                name={`${direction.charAt(0).toUpperCase() + direction.slice(1)} Duration`}
                fill={`url(#composed-bar-${direction})`}
                barSize={25}
                radius={[4, 4, 0, 0]}
                isAnimationActive={true}
              />
            ))}
            
            {/* Signal Lines */}
            {Object.entries(chartColors).slice(0, 4).map(([direction, colors]) => (
              <Line 
                key={`line-${direction}`}
                yAxisId="left"
                type="monotoneX" 
                dataKey={direction}
                name={`${direction.charAt(0).toUpperCase() + direction.slice(1)} Trend`}
                stroke={colors.gradient[1]}
                strokeWidth={3}
                dot={{ r: 5, fill: colors.primary, strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 8, fill: colors.primary, strokeWidth: 2, stroke: '#fff' }}
                isAnimationActive={true}
              />
            ))}
          </ComposedChart>
        );
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={chartVariants}
      className="transition-all duration-700"
    >
      <Card className="p-6 min-h-96 glass-panel premium-card shine-effect overflow-hidden bg-white/90">
        <div className="w-full h-full">
          <div className="flex justify-between items-center mb-5">
            <ChartTypeTabs />
            
            <div className="flex items-center">
              <div className="text-xs py-1 px-2 bg-blue-100 text-blue-800 rounded-full font-medium mr-2">
                {chartData.length} data points
              </div>
              <div className={`h-2 w-2 rounded-full ${animateData ? 'bg-green-500 animate-ping' : 'bg-slate-300'}`}></div>
            </div>
          </div>
          
          <div 
            ref={chartRef}
            className="w-full h-[350px] transition-all duration-500 ease-in-out"
            style={{ height: `${chartHeight}px` }}
            onMouseEnter={() => {
              setIsHovered(true);
              setChartHeight(400); // Expand chart on hover
            }}
            onMouseLeave={() => {
              setIsHovered(false);
              setChartHeight(350); // Return to normal size
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              {renderChart()}
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 text-xs text-slate-500 flex items-center justify-between">
            <div>
              <span className="font-medium">Real-time signal visualization</span> · Updates automatically with each refresh
            </div>
            <div className="flex items-center">
              <ArrowUpRight size={12} className="mr-1" />
              <span>Last updated: {timeLabels[timeLabels.length - 1] || 'N/A'}</span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default SignalChart;