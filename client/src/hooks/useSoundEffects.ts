import { useEffect, useRef } from 'react';
import { Howl } from 'howler';

type SoundType = 'hover' | 'signal' | 'notification' | 'success' | 'error';

interface SoundMap {
  [key: string]: Howl;
}

export function useSoundEffects() {
  const soundsRef = useRef<SoundMap | null>(null);
  
  useEffect(() => {
    // Only create the sounds once
    if (!soundsRef.current) {
      soundsRef.current = {
        hover: new Howl({
          src: ['/sounds/hover.mp3'],
          volume: 0.2,
          preload: true,
          html5: true
        }),
        signal: new Howl({
          src: ['/sounds/signal.mp3'],
          volume: 0.3,
          preload: true,
          html5: true
        }),
        notification: new Howl({
          src: ['/sounds/notification.mp3'],
          volume: 0.4,
          preload: true,
          html5: true
        }),
        success: new Howl({
          src: ['/sounds/success.mp3'],
          volume: 0.4,
          preload: true,
          html5: true
        }),
        error: new Howl({
          src: ['/sounds/error.mp3'],
          volume: 0.4,
          preload: true,
          html5: true
        })
      };
    }
    
    // Clean up sounds when component unmounts
    return () => {
      if (soundsRef.current) {
        Object.values(soundsRef.current).forEach(sound => {
          sound.unload();
        });
      }
    };
  }, []);
  
  // Function to play sound
  const playSound = (type: SoundType) => {
    // Skip if sounds aren't loaded or if user has disabled sound
    if (!soundsRef.current) return;
    
    // Get user sound preference from localStorage
    const soundEnabled = localStorage.getItem('soundEnabled') !== 'false';
    if (!soundEnabled) return;
    
    const sound = soundsRef.current[type];
    if (sound) {
      sound.play();
    }
  };
  
  // Function to toggle sound on/off
  const toggleSound = () => {
    const currentSetting = localStorage.getItem('soundEnabled') !== 'false';
    localStorage.setItem('soundEnabled', (!currentSetting).toString());
    return !currentSetting;
  };
  
  // Function to check if sound is enabled
  const isSoundEnabled = () => {
    return localStorage.getItem('soundEnabled') !== 'false';
  };
  
  return { playSound, toggleSound, isSoundEnabled };
}

export default useSoundEffects;