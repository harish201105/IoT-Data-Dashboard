import React, { useEffect, useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area, BarChart, Bar, ComposedChart
} from 'recharts';
import { Card } from "@/components/ui/card";
import { SignalData } from "@/types/signals";

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

  useEffect(() => {
    if (!signalData || Object.keys(signalData).length === 0) return;

    // Get current time for x-axis label
    const now = new Date();
    const timeLabel = now.toLocaleTimeString();
    
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
    };
    
    // Update our chart data array (keep last 10 points)
    setChartData(prevData => {
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

  if (isLoading) {
    return (
      <Card className="p-5 h-96 glass-panel shine-effect">
        <div className="w-full h-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </Card>
    );
  }

  if (chartData.length === 0) {
    return (
      <Card className="p-5 h-96 glass-panel">
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-slate-500">No data available. Waiting for signals...</p>
        </div>
      </Card>
    );
  }

  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return (
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '8px' }} />
            <Legend />
            <Line type="monotone" dataKey="east" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="west" stroke="#8b5cf6" strokeWidth={2} activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="north" stroke="#10b981" strokeWidth={2} activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="south" stroke="#f59e0b" strokeWidth={2} activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="South" stroke="#ef4444" strokeWidth={2} activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="outh" stroke="#6b7280" strokeWidth={2} activeDot={{ r: 8 }} />
          </LineChart>
        );
      case 'area':
        return (
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '8px' }} />
            <Legend />
            <Area type="monotone" dataKey="east" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
            <Area type="monotone" dataKey="west" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
            <Area type="monotone" dataKey="north" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
            <Area type="monotone" dataKey="south" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
            <Area type="monotone" dataKey="South" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
            <Area type="monotone" dataKey="outh" stackId="1" stroke="#6b7280" fill="#6b7280" fillOpacity={0.6} />
          </AreaChart>
        );
      case 'bar':
        return (
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '8px' }} />
            <Legend />
            <Bar dataKey="eastDuration" fill="#3b82f6" name="East Duration" />
            <Bar dataKey="westDuration" fill="#8b5cf6" name="West Duration" />
            <Bar dataKey="northDuration" fill="#10b981" name="North Duration" />
            <Bar dataKey="southDuration" fill="#f59e0b" name="South Duration" />
            <Bar dataKey="SouthDuration" fill="#ef4444" name="South (Cap) Duration" />
            <Bar dataKey="outhDuration" fill="#6b7280" name="Outh Duration" />
          </BarChart>
        );
      case 'composed':
      default:
        return (
          <ComposedChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="time" />
            <YAxis yAxisId="left" orientation="left" stroke="#666" />
            <YAxis yAxisId="right" orientation="right" stroke="#666" />
            <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '8px' }} />
            <Legend />
            <Area yAxisId="left" type="monotone" dataKey="east" fill="#3b82f6" stroke="#3b82f6" fillOpacity={0.3} name="East Signal" />
            <Area yAxisId="left" type="monotone" dataKey="west" fill="#8b5cf6" stroke="#8b5cf6" fillOpacity={0.3} name="West Signal" />
            <Area yAxisId="left" type="monotone" dataKey="north" fill="#10b981" stroke="#10b981" fillOpacity={0.3} name="North Signal" />
            <Area yAxisId="left" type="monotone" dataKey="south" fill="#f59e0b" stroke="#f59e0b" fillOpacity={0.3} name="South Signal" />
            <Bar yAxisId="right" dataKey="eastDuration" barSize={10} fill="#3b82f6" fillOpacity={0.8} name="East Duration" />
            <Bar yAxisId="right" dataKey="westDuration" barSize={10} fill="#8b5cf6" fillOpacity={0.8} name="West Duration" />
            <Bar yAxisId="right" dataKey="northDuration" barSize={10} fill="#10b981" fillOpacity={0.8} name="North Duration" />
            <Bar yAxisId="right" dataKey="southDuration" barSize={10} fill="#f59e0b" fillOpacity={0.8} name="South Duration" />
            <Line yAxisId="left" type="monotone" dataKey="east" stroke="#0551c7" strokeWidth={2} dot={{ r: 5 }} activeDot={{ r: 8 }} />
            <Line yAxisId="left" type="monotone" dataKey="west" stroke="#6025c7" strokeWidth={2} dot={{ r: 5 }} activeDot={{ r: 8 }} />
            <Line yAxisId="left" type="monotone" dataKey="north" stroke="#0a8761" strokeWidth={2} dot={{ r: 5 }} activeDot={{ r: 8 }} />
            <Line yAxisId="left" type="monotone" dataKey="south" stroke="#b77708" strokeWidth={2} dot={{ r: 5 }} activeDot={{ r: 8 }} />
          </ComposedChart>
        );
    }
  };

  return (
    <Card className="p-5 h-96 glass-panel shine-effect overflow-hidden">
      <div className="w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default SignalChart;