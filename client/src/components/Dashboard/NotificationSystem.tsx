import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import { SignalData } from '@/types/signals';
import { Card } from '@/components/ui/card';

interface NotificationProps {
  signalData: SignalData;
  previousData?: SignalData;
}

const NotificationSystem: React.FC<NotificationProps> = ({ signalData, previousData }) => {
  const [notifications, setNotifications] = useState<Array<{
    id: string;
    type: 'info' | 'warning' | 'success';
    message: string;
    timestamp: Date;
  }>>([]);

  // Check for changes in signal data
  useEffect(() => {
    if (!previousData || Object.keys(previousData).length === 0) return;
    
    // Check each direction for changes
    Object.entries(signalData).forEach(([direction, currentSignal]) => {
      if (!previousData[direction]) return;
      
      const prevSignal = previousData[direction];
      
      // Check for signal color changes
      if (currentSignal.signal !== prevSignal.signal) {
        setNotifications(prev => [...prev, {
          id: `${direction}-${Date.now()}`,
          type: 'info',
          message: `${direction.charAt(0).toUpperCase() + direction.slice(1)} signal changed from ${prevSignal.signal} to ${currentSignal.signal}`,
          timestamp: new Date()
        }]);
      }
      
      // Check for status changes (on/off)
      if (currentSignal.status !== prevSignal.status) {
        setNotifications(prev => [...prev, {
          id: `${direction}-status-${Date.now()}`,
          type: currentSignal.status === 'on' ? 'success' : 'warning',
          message: `${direction.charAt(0).toUpperCase() + direction.slice(1)} signal is now ${currentSignal.status === 'on' ? 'active' : 'inactive'}`,
          timestamp: new Date()
        }]);
      }
      
      // Check for duration changes
      if (currentSignal.duration !== prevSignal.duration) {
        setNotifications(prev => [...prev, {
          id: `${direction}-duration-${Date.now()}`,
          type: 'info',
          message: `${direction.charAt(0).toUpperCase() + direction.slice(1)} signal duration updated to ${currentSignal.duration}s`,
          timestamp: new Date()
        }]);
      }
    });
    
    // Remove old notifications after 5 seconds
    const timer = setTimeout(() => {
      setNotifications(prev => 
        prev.filter(notif => new Date().getTime() - notif.timestamp.getTime() < 5000)
      );
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [signalData, previousData]);

  if (notifications.length === 0) return null;

  return (
    <AnimatePresence>
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {notifications.map(notification => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="notification-item"
          >
            <Card className={`p-4 shadow-lg border-l-4 ${
              notification.type === 'warning' ? 'border-l-amber-500 bg-amber-50' :
              notification.type === 'success' ? 'border-l-emerald-500 bg-emerald-50' :
              'border-l-blue-500 bg-blue-50'
            }`}>
              <div className="flex items-start">
                <div className={`p-2 rounded-full mr-3 ${
                  notification.type === 'warning' ? 'bg-amber-100 text-amber-600' :
                  notification.type === 'success' ? 'bg-emerald-100 text-emerald-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  {notification.type === 'warning' ? <AlertTriangle size={16} /> :
                   notification.type === 'success' ? <CheckCircle2 size={16} /> :
                   <Info size={16} />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{notification.message}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    {notification.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </AnimatePresence>
  );
};

export default NotificationSystem;