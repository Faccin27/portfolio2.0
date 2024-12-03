import { useCallback } from 'react';

export function useAudio(src: string) {
  const play = useCallback(() => {
    const audio = new Audio(src);
    audio.play();
  }, [src]);

  return play;
}

