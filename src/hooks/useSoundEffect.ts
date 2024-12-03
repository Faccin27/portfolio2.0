import { useAudio } from '@/hooks/useAudio';

export function useSoundEffect() {
  const playHoverSound = useAudio("/woosh.wav");
  const playClickSound = useAudio("/click.wav");
  const playKeySound = useAudio("/key2.wav");

  return { playHoverSound, playClickSound, playKeySound };
}

