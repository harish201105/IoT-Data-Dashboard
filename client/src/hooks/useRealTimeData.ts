import { useState, useEffect, useRef } from 'react';
import { SignalData } from '@/types/signals';
import { fetchSignalData } from '@/lib/api';

interface UseRealTimeDataProps {
  initialInterval?: number;
  autoStart?: boolean;
  maxHistoryLength?: number;
}

export function useRealTimeData({
  initialInterval = 10000, // Default 10 seconds
  autoStart = true,
  maxHistoryLength = 20
}: UseRealTimeDataProps = {}) {
  const [data, setData] = useState<SignalData>({});
  const [previousData, setPreviousData] = useState<SignalData>({});
  const [historicalData, setHistoricalData] = useState<Array<{
    timestamp: Date;
    data: SignalData;
  }>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [isPolling, setIsPolling] = useState<boolean>(autoStart);
  const [pollingInterval, setPollingInterval] = useState<number>(initialInterval);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Function to fetch fresh data
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const newData = await fetchSignalData();
      
      // Store previous data
      if (Object.keys(data).length > 0) {
        setPreviousData(data);
      }
      
      // Update current data
      setData(newData);
      
      // Add to historical data
      setHistoricalData(prev => {
        const newEntry = {
          timestamp: new Date(),
          data: newData
        };
        const updated = [newEntry, ...prev];
        
        // Limit historical data length
        if (updated.length > maxHistoryLength) {
          return updated.slice(0, maxHistoryLength);
        }
        
        return updated;
      });
      
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch data'));
    } finally {
      setIsLoading(false);
    }
  };

  // Start the polling process
  const startPolling = () => {
    setIsPolling(true);
  };

  // Stop the polling process
  const stopPolling = () => {
    setIsPolling(false);
  };

  // Change the polling interval
  const changePollingInterval = (newInterval: number) => {
    setPollingInterval(newInterval);
    
    // If already polling, restart with new interval
    if (isPolling && timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // Manual refresh function
  const refresh = () => {
    fetchData();
  };

  // Set up and clean up the interval
  useEffect(() => {
    // Initial fetch
    fetchData();

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  // Handle interval changes and polling status
  useEffect(() => {
    if (isPolling) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      timerRef.current = setInterval(fetchData, pollingInterval);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isPolling, pollingInterval]);

  return {
    data,
    previousData,
    historicalData,
    isLoading,
    error,
    isPolling,
    pollingInterval,
    refresh,
    startPolling,
    stopPolling,
    changePollingInterval
  };
}

export default useRealTimeData;