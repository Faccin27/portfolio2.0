import { useCallback } from 'react';
import { useAudio } from '@/hooks/useAudio';

export function useSoundEffect() {
  const [, toggleHoverSound] = useAudio("/hover.wav");
  const [, toggleClickSound] = useAudio("/click.wav");

  const playHoverSound = useCallback(() => {
    toggleHoverSound();
  }, [toggleHoverSound]);

  const playClickSound = useCallback(() => {
    toggleClickSound();
  }, [toggleClickSound]);

  return { playHoverSound, playClickSound };
}
