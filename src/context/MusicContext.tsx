// src/context/MusicContext.tsx

import { createContext, useContext, useRef, useState, useEffect, type ReactNode } from "react";

interface Track {
  id: number;
  title: string;
  artist: string;
  src: string;
}

interface MusicContextType {
  tracks: Track[];
  currentTrackIndex: number;
  isPlaying: boolean;
  setTrack: (index: number) => void;
  togglePlay: () => void;
  skipNext: () => void;
  skipPrev: () => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

const defaultTracks: Track[] = [
  {id:1 , title: "Aşkın Olayım", artist: "Simge", src:"/public/music/Simge  - Aşkın Olayım.mp3" },
  { id: 2, title: "Felek Sen Ne Feleksen", artist: "Sanatçı 1", src: "/public/music/5-Kahtali-Mici-Felek-Sen-Ne-Feleksen.mp3" },
  { id: 3, title: "Senden Daha Güzel", artist: "DUMAN", src: "/public/music/13-Duman-Senden-Daha-Guzel.mp3" },
  { id: 4, title: "Sana Güvenmiyorum 3", artist: "Aleyna Tilki", src: "/public/music/19-Aleyna-Tilki-Sana-Guvenmiyorum-ft-Dedubluman.mp3" },
  { id: 5, title: "İçime Ata Ata", artist: "Burak Bulut", src: "/public/music/içime ata.mp3" },
  { id: 6, title: "Üçgen Park", artist: "Eleman", src: "/public/music/SİVEREK ÜÇGEN PARKI.mp3" }
  
];

export function MusicProvider({ children }: { children: ReactNode }) {
  const [tracks] = useState<Track[]>(defaultTracks);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const setTrack = (index: number) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  };
  const skipNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    setIsPlaying(true);
  };

  const skipPrev = () => {
    setCurrentTrackIndex((prev) => (prev === 0 ? tracks.length - 1 : prev - 1));
    setIsPlaying(true);
  };

  // Şarkı bittiğinde otomatik sonrakine geç
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onEnded = () => {
      setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    };

    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("ended", onEnded);
    };
  }, [tracks]);

  useEffect(() => {
  const audio = audioRef.current;
  if (!audio) return;

  audio.load();
  if (isPlaying) {
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.warn("Şarkı oynatılamadı:", error);
      });
    }
  }
}, [currentTrackIndex]);


  return (
    <MusicContext.Provider
      value={{ tracks, currentTrackIndex, isPlaying, setTrack, togglePlay,skipNext,
        skipPrev, audioRef }}
    >
      {/* Global Audio Element */}
    <audio ref={audioRef}>
      <source src={tracks[currentTrackIndex].src} type="audio/mpeg" />
    </audio>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusic hook'u MusicProvider içinde kullanılmalıdır.");
  }
  return context;
}
