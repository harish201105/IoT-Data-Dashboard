import { useState } from 'react';

/**
 * Custom hook for managing tooltip visibility
 */
export function useTooltip(initialState = false) {
  const [isVisible, setIsVisible] = useState(initialState);
  
  const showTooltip = () => setIsVisible(true);
  const hideTooltip = () => setIsVisible(false);
  const toggleTooltip = () => setIsVisible(prev => !prev);
  
  return {
    isVisible,
    showTooltip,
    hideTooltip,
    toggleTooltip
  };
}