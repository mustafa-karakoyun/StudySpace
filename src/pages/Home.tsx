// import { useState, useEffect, useRef } from "react";
// import { useMusic } from "../context/MusicContext"
// const motivasyonlar = [
//   "Başarı, azimli olanların yoludur.",
//   "Her gün yeni bir başlangıçtır.",
//   "Başarı, küçük adımların toplamıdır.",
//   "Bugün, dünü geride bırakmanın günü.",
//   "Zorluklar seni güçlendirir.",
// ];

// const kitaplar = [
//   {
//     title: "Sapiens",
//     author: "Yuval Noah Harari",
//     desc: "İnsanlık tarihine geniş bir bakış.",
//     cover: "https://...sapiens.jpg",
//   },
//   // diğer kitaplar...
// ];

// const filmler = [
//   {
//     title: "Inception",
//     desc: "Rüya içinde rüya temalı bilim kurgu.",
//     cover: "https://...inception.jpg",
//   },
//   // diğer filmler...
// ];

// function Home() {
//   const [haftaIndex, setHaftaIndex] = useState(0);

//   // Haftayı hesapla (0-4 arası)
//   useEffect(() => {
//     const haftaNo = Math.floor(new Date().getDate() / 7);
//     setHaftaIndex(haftaNo);
//   }, []);

//   // Müzik player için audio ref
//   const audioRef = useRef<HTMLAudioElement>(null);
//   const [isPlaying, setIsPlaying] = useState(false);

//   const playPause = () => {
//     if (!audioRef.current) return;
//     if (isPlaying) {
//       audioRef.current.pause();
//       setIsPlaying(false);
//     } else {
//       audioRef.current.play();
//       setIsPlaying(true);
//     }
//   };

//   return (
//     <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
//       {/* Motivasyon ve Öneriler */}
//       <section className="md:col-span-2  space-y-6">
//         <div className="bg-indigo-300 p-6  rounded-xl shadow">
//           <h2 className="text-xl font-semibold mb-2">Haftalık Motivasyon</h2>
//           <p className="italic text-gray-700">{motivasyonlar[haftaIndex]}</p>
//         </div>

//         <div className="bg-indigo-500 p-6 rounded-xl shadow grid grid-cols-2 gap-4">
//           {/* Kitap */}
//           <div>
//             <h3 className="font-semibold mb-1">Haftanın Kitabı</h3>
//             <img
//               src={kitaplar[haftaIndex]?.cover}
//               alt={kitaplar[haftaIndex]?.title}
//               className="w-full h-48 object-cover rounded"
//             />
//             <h4 className="mt-2 font-bold">{kitaplar[haftaIndex]?.title}</h4>
//             <p className="text-sm">{kitaplar[haftaIndex]?.desc}</p>
//           </div>
//           {/* Film */}
//           <div>
//             <h3 className="font-semibold mb-1">Haftanın Filmi</h3>
//             <img
//               src={filmler[haftaIndex]?.cover}
//               alt={filmler[haftaIndex]?.title}
//               className="w-full h-48 object-cover rounded"
//             />
//             <h4 className="mt-2 font-bold">{filmler[haftaIndex]?.title}</h4>
//             <p className="text-sm">{filmler[haftaIndex]?.desc}</p>
//           </div>
//         </div>
//       </section>

//       {/* İstatistikler ve Müzik Player */}
//       <section className="space-y-6">
//         <div className="bg-indigo-200 p-6 rounded-xl shadow">
//           <h2 className="text-xl font-semibold mb-4">Kullanıcı İstatistikleri</h2>
//           <p>Ders Çalışılan Gün: 12</p>
//           <p>Okunan Kitap: 3</p>
//           <p>Alınan Not: 23</p>
//         </div>

//         <div className="bg-rose-600 p-6 rounded-xl shadow flex flex-col items-center">
//           <audio ref={audioRef} src="/music/sample1.mp3" />
//           <button
//             onClick={playPause}
//             className="bg-red-600 text-white px-4 py-2 rounded mt-4"
//           >
//             {isPlaying ? "Duraklat" : "Oynat"}
//           </button>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Home;

import { useState, useEffect } from "react";
import { useMusic } from "../context/MusicContext";
import { SkipBack, Play, Pause, SkipForward } from "lucide-react";
import Calendar from "../components/calander";

// JSX içinde istediğin yere koy:


const motivasyonlar = [
  "Başarı, azimli olanların yoludur.",
  "Her gün yeni bir başlangıçtır.",
  "Başarı, küçük adımların toplamıdır.",
  "Bugün, dünü geride bırakmanın günü.",
  "Zorluklar seni güçlendirir.",
];


function Home() {
  const [haftaIndex, setHaftaIndex] = useState(0);

  // Haftayı hesapla (0-4 arası)
  useEffect(() => {
    const haftaNo = Math.floor(new Date().getDate() / 7);
    setHaftaIndex(haftaNo);
  }, []);

  // Music context verileri
  const {
    isPlaying,
    togglePlay,
    skipNext,
    skipPrev,
    tracks,
    currentTrackIndex,
  } = useMusic();

  return (
    <div className="p-6  grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Motivasyon ve Öneriler */}
      <section className="md:col-span-2 space-y-6">
        <div className="bg-blue-300 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-2">Haftalık Motivasyon</h2>
          <p className="italic text-gray-700">{motivasyonlar[haftaIndex]}</p>
        </div>
        
        <Calendar />
      </section>

      {/* İstatistikler ve Müzik Player */}
      <section className="space-y-6">
        <div className="bg-blue-300 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">
            Kullanıcı İstatistikleri
          </h2>
          <p>Ders Çalışılan Gün: 12</p>
          <p>Okunan Kitap: 3</p>
          <p>Alınan Not: 23</p>
        </div>

        {/* Mini Music Player */}
        <div className="bg-rose-600 p-6 rounded-xl shadow text-white flex flex-col items-center">
          <p className="font-semibold mb-2">🎵 Mini Player</p>
          <p className="text-center mb-2">
            {tracks[currentTrackIndex].title} -{" "}
            {tracks[currentTrackIndex].artist}
          </p>

          
          <div className="flex space-x-4 mb-4">
            {/* Önceki Butonu */}
            <button
              onClick={skipPrev}
              className="bg-yellow-500  text-white px-4 py-2 rounded hover:bg-yellow-800 transition flex items-center gap-2"
            >
              <SkipBack size={20} />
              Önceki
            </button>

            {/* Oynat / Duraklat Butonu */}
            <button
              onClick={togglePlay}
              className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-800 transition flex items-center gap-2"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              {isPlaying ? "Duraklat" : "Oynat"}
            </button>

            {/* Sonraki Butonu */}
            <button
              onClick={skipNext}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-800 transition flex items-center gap-2"
            >
              Sonraki
              <SkipForward size={20} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
