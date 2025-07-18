
import { useMusic } from "../context/MusicContext"  // 🔁 Context'i çağır
import { useEffect, useState, type MouseEvent } from "react";

export default function MusicPlayer() {
  const {
    tracks,
    currentTrackIndex,
    isPlaying,
    setTrack,
    togglePlay,
    skipNext,
    skipPrev,
    audioRef,
  } = useMusic();

  const [progress, setProgress] = useState(0);

  // 🎵 Şarkı ilerlemesini güncelle
  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;

    const updateProgress = () => {
      setProgress(audio.duration ? audio.currentTime / audio.duration : 0);
    };

    audio.addEventListener("timeupdate", updateProgress);
    return () => audio.removeEventListener("timeupdate", updateProgress);
  }, [currentTrackIndex, audioRef]);

 
  const seek = (e: MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-5 bg-blue-800 rounded-xl shadow-lg text-white font-sans">
      <h1 className="bg-indigo-500 rounded-xl text-3xl font-bold mb-6 text-center drop-shadow-lg select-none">🎶 Müzik Player</h1>

      <audio ref={audioRef}>
        <source src={tracks[currentTrackIndex].src} type="audio/mpeg" />
        Tarayıcınız audio elementini desteklemiyor.
      </audio>

      <div className="flex flex-col gap-6">
        <div className="text-center font-semibold text-lg select-text">
          {tracks[currentTrackIndex].title} - {tracks[currentTrackIndex].artist}
        </div>

        <div
          onClick={seek}
          className="h-3 w-full bg-red bg-opacity-40 rounded-full cursor-pointer mb-6 relative shadow-inner"
          title="Şarkıda ilerle"
        >
          <div
            className="h-3 bg-white rounded-full transition-all duration-300"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        <div className="flex justify-center items-center space-x-10 select-none">
          <button
            onClick={skipPrev}
            className="text-white hover:text-yellow-300 text-4xl transition"
            title="Önceki Şarkı"
          >
            &#9664;
          </button>
          <button
            onClick={togglePlay}
            className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold px-8 py-3 rounded-full shadow-lg transition"
          >
            {isPlaying ? "Duraklat" : "Oynat"}
          </button>
          <button
            onClick={skipNext}
            className="text-white hover:text-rose-300 text-4xl transition"
            title="Sonraki Şarkı"
          >
            &#9654;
          </button>
        </div>

        <ul className="mt-10 max-h-64 overflow-y-auto bg-white bg-opacity-30 rounded-lg p-4 shadow-inner text-purple-900 font-semibold">
          {tracks.map((track, i) => (
            <li
              key={track.id}
              onClick={() => setTrack(i)}
              className={`p-3 rounded-md cursor-pointer hover:bg-indigo-400 transition select-none ${
                i === currentTrackIndex ? "bg-blue-700 text-white font-bold shadow-lg" : ""
              }`}
            >
              {track.title} - <small className="opacity-70">{track.artist}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
