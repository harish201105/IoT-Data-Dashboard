import { useState, useEffect, useCallback } from 'react';
import { Howl } from 'howler';

type SoundType = 'hover' | 'signal' | 'notification' | 'success' | 'error';

interface SoundMap {
  [key: string]: Howl;
}

/**
 * Custom hook for managing sound effects throughout the application
 */
export function useSoundEffects() {
  const [sounds, setSounds] = useState<SoundMap>({});
  const [isMuted, setIsMuted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize sound effects
  useEffect(() => {
    const soundMap: SoundMap = {
      hover: new Howl({
        src: ['/sounds/hover.mp3'],
        volume: 0.3,
        preload: true
      }),
      signal: new Howl({
        src: ['/sounds/signal.mp3'],
        volume: 0.4,
        preload: true
      }),
      notification: new Howl({
        src: ['/sounds/notification.mp3'],
        volume: 0.5,
        preload: true
      }),
      success: new Howl({
        src: ['/sounds/success.mp3'],
        volume: 0.5,
        preload: true
      }),
      error: new Howl({
        src: ['/sounds/error.mp3'],
        volume: 0.5,
        preload: true
      })
    };
    
    setSounds(soundMap);
    setIsLoaded(true);
    
    // Cleanup sounds on unmount
    return () => {
      Object.values(soundMap).forEach(sound => sound.unload());
    };
  }, []);

  // Play a sound effect
  const playSound = useCallback((type: SoundType) => {
    if (isMuted || !isLoaded) return;
    const sound = sounds[type];
    if (sound) {
      sound.play();
    }
  }, [sounds, isMuted, isLoaded]);

  // Toggle mute status
  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  return { playSound, toggleMute, isMuted, isLoaded };
}