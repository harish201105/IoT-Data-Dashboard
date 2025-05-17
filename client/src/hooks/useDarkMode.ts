import { useState, useEffect } from 'react';

export function useDarkMode() {
  // Get initial dark mode preference from local storage or system preference
  const getInitialMode = () => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      return JSON.parse(savedMode);
    }
    
    // Check system preference if no saved preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return true;
    }
    
    return false;
  };
  
  const [isDarkMode, setIsDarkMode] = useState<boolean>(getInitialMode);
  
  // Update document body with dark mode class
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      document.documentElement.classList.add('dark');
    } else {
      document.body.classList.remove('dark-mode');
      document.documentElement.classList.remove('dark');
    }
    
    // Save to local storage
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);
  
  // Toggle dark mode function
  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };
  
  return { isDarkMode, toggleDarkMode };
}

export default useDarkMode;