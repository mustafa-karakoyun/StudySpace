// import { useState, useEffect } from "react";

// interface Gorev {
//   id: number;
//   text: string;
//   done: boolean;
// }

// interface Ders {
//   id: number;
//   ad: string;
//   notlar: string[];
//   gorevler: Gorev[];
//   saatler: string;
//   sinavTarihi: string;
// }

// export default function Lesson() {
//   // Başlangıçta localStorage'dan yükle, yoksa boş array
//   const [dersler, setDersler] = useState<Ders[]>(() => {
//     try {
//       const kayit = localStorage.getItem("derslerData");
//       return kayit ? JSON.parse(kayit) : [];
//     } catch {
//       return [];
//     }
//   });

//   // Aktif dersi localStorage'dan oku, yoksa null
//   const [aktifDersId, setAktifDersId] = useState<number | null>(() => {
//     try {
//       const kayit = localStorage.getItem("aktifDersId");
//       return kayit ? Number(kayit) : null;
//     } catch {
//       return null;
//     }
//   });

//   const [yeniDersAdi, setYeniDersAdi] = useState("");
//   const [yeniNot, setYeniNot] = useState("");
//   const [yeniGorev, setYeniGorev] = useState("");
//   const [saatlerInput, setSaatlerInput] = useState("");
//   const [sinavTarihiInput, setSinavTarihiInput] = useState("");

//   const aktifDers = dersler.find((d) => d.id === aktifDersId);

//   const [vize, setVize] = useState<number>(() => {
//   const saved = localStorage.getItem("vizeNotu");
//   return saved ? Number(saved) : 0;
// });

// const [final, setFinal] = useState<number>(() => {
//   const saved = localStorage.getItem("finalNotu");
//   return saved ? Number(saved) : 0;
// });

// useEffect(() => {
//   localStorage.setItem("vizeNotu", String(vize));
// }, [vize]);

// useEffect(() => {
//   localStorage.setItem("finalNotu", String(final));
// }, [final]);


//   // Dersler state değişince localStorage güncelle
//   useEffect(() => {
//     localStorage.setItem("derslerData", JSON.stringify(dersler));
//   }, [dersler]);

//   // Aktif ders id değişince localStorage güncelle ve saat/sınav inputlarını set et
//   useEffect(() => {
//     if (aktifDersId !== null) {
//       localStorage.setItem("aktifDersId", aktifDersId.toString());
//     }
//     if (aktifDers) {
//       setSaatlerInput(aktifDers.saatler);
//       setSinavTarihiInput(aktifDers.sinavTarihi);
//     } else {
//       setSaatlerInput("");
//       setSinavTarihiInput("");
//     }
//   }, [aktifDersId, aktifDers]);

//   const dersEkle = () => {
//     if (yeniDersAdi.trim() === "") return;
//     const yeniDers: Ders = {
//       id: Date.now(),
//       ad: yeniDersAdi,
//       notlar: [],
//       gorevler: [],
//       saatler: "",
//       sinavTarihi: "",
//     };
//     const yeniListe = [...dersler, yeniDers];
//     setDersler(yeniListe);
//     setYeniDersAdi("");
//     setAktifDersId(yeniDers.id);
//   };

//   const notEkle = () => {
//     if (!aktifDers || yeniNot.trim() === "") return;
//     const guncellenmisDersler = dersler.map((d) =>
//       d.id === aktifDers.id ? { ...d, notlar: [...d.notlar, yeniNot] } : d
//     );
//     setDersler(guncellenmisDersler);
//     setYeniNot("");
//   };

//   const gorevEkle = () => {
//     if (!aktifDers || yeniGorev.trim() === "") return;
//     const yeniGorevObj: Gorev = {
//       id: Date.now(),
//       text: yeniGorev,
//       done: false,
//     };
//     const guncellenmisDersler = dersler.map((d) =>
//       d.id === aktifDers.id
//         ? { ...d, gorevler: [...d.gorevler, yeniGorevObj] }
//         : d
//     );
//     setDersler(guncellenmisDersler);
//     setYeniGorev("");
//   };

//   const gorevToggle = (gorevId: number) => {
//     if (!aktifDers) return;
//     const guncellenmisDersler = dersler.map((d) => {
//       if (d.id === aktifDers.id) {
//         const yeniGorevler = d.gorevler.map((g) =>
//           g.id === gorevId ? { ...g, done: !g.done } : g
//         );
//         return { ...d, gorevler: yeniGorevler };
//       }
//       return d;
//     });
//     setDersler(guncellenmisDersler);
//   };

//   const saatlerGuncelle = (yeniSaatler: string) => {
//     if (!aktifDers) return;
//     const guncellenmisDersler = dersler.map((d) =>
//       d.id === aktifDers.id ? { ...d, saatler: yeniSaatler } : d
//     );
//     setDersler(guncellenmisDersler);
//     setSaatlerInput(yeniSaatler);
//   };

//   const sinavTarihiGuncelle = (yeniTarih: string) => {
//     if (!aktifDers) return;
//     const guncellenmisDersler = dersler.map((d) =>
//       d.id === aktifDers.id ? { ...d, sinavTarihi: yeniTarih } : d
//     );
//     setDersler(guncellenmisDersler);
//     setSinavTarihiInput(yeniTarih);
//   };

//   return (
//     <div className="flex bg-gradient-to-br from-gray-100 to-white min-h-screen">
//       {/* Sol Panel: Ders Listesi */}
//       <aside className="w-72 bg-indigo-600 text-white p-6 shadow-lg">
//         <h2 className="text-xl font-bold mb-4">Dersler</h2>
//         <div className="mb-4 space-y-2 overflow-y-auto max-h-[calc(100vh-200px)]">
//           {dersler.map((ders) => (
//             <div
//               key={ders.id}
//               onClick={() => setAktifDersId(ders.id)}
//               className={`cursor-pointer px-3 py-2 rounded hover:bg-indigo-500 transition ${
//                 ders.id === aktifDersId
//                   ? "bg-white text-indigo-600 font-bold"
//                   : ""
//               }`}
//             >
//               {ders.ad}
//             </div>
//           ))}
//         </div>
//         <div className="mt-6 space-y-2">
//           <input
//             type="text"
//             placeholder="Yeni ders adı"
//             value={yeniDersAdi}
//             onChange={(e) => setYeniDersAdi(e.target.value)}
//             className="w-full px-3 py-2 text-black rounded focus:outline-none"
//           />
//           <button
//             onClick={dersEkle}
//             className="w-full bg-yellow-300 text-indigo-800 font-semibold py-2 rounded hover:bg-yellow-400"
//           >
//             Ekle
//           </button>
//         </div>
//       </aside>

//       {/* Sağ Panel: Ders Detayları */}
//       <main className="bg-stone-50 flex-1 p-5 overflow-y-auto">
//         {aktifDers ? (
//           <>
//             <h1 className="text-3xl font-bold text-stone-700 mb-4">
//               {aktifDers.ad}
//             </h1>

//             <div className="mb-6">
//               <label className="block font-semibold mb-1 text-stone-700">
//                 Ders Saatleri
//               </label>
//               <input
//                 type="text"
//                 value={saatlerInput}
//                 onChange={(e) => saatlerGuncelle(e.target.value)}
//                 placeholder="Örn: Pazartesi 10:00-12:00, Çarşamba 14:00-16:00"
//                 className="w-full px-3 py-2 border rounded"
//               />
//             </div>

//             <div className="flex items-center gap-6 mb-6">
//               <div>
//                 <label className="block font-semibold mb-1 text-stone-700">
//                   Sınav Tarihi
//                 </label>
//                 <input
//                   type="date"
//                   value={sinavTarihiInput}
//                   onChange={(e) => sinavTarihiGuncelle(e.target.value)}
//                   className="w-48 px-3 py-2 border rounded"
//                 />
//               </div>

//               <div>
//                 <label className="block font-semibold mb-1 text-stone-700">
//                   Vize Notu
//                 </label>
//                 <input
//                   type="number"
//                   placeholder="Vize Notu"
//                   className="w-24 px-3 py-2 border rounded"
//                   // value={vizeNotu} onChange={} ekleyebilirsin
//                 />
//               </div>

//               <div>
//                 <label className="block font-semibold mb-1 text-stone-700">
//                   Final Notu
//                 </label>
//                 <input
//                   type="number"
//                   placeholder="Final Notu"
//                   className="w-24 px-3 py-2 border rounded"
//                   // value={finalNotu} onChange={} ekleyebilirsin
//                 />
//               </div>
//             </div>

//             <section className="mb-8">
//               <h2 className="font-semibold text-stone-700 mb-2">Notlar</h2>
//               <div className="space-y-3 mb-4">
//                 {aktifDers.notlar.length === 0 && (
//                   <p className="text-gray-500">Henüz not girilmedi.</p>
//                 )}
//                 {aktifDers.notlar.map((n, i) => (
//                   <div
//                     key={i}
//                     className="bg-stone-100 rounded shadow px-4 py-2 text-gray-800"
//                   >
//                     • {n}
//                   </div>
//                 ))}
//               </div>
//               <div className="flex gap-2">
//                 <input
//                   type="text"
//                   placeholder="Yeni not ya da yapılacak"
//                   value={yeniNot}
//                   onChange={(e) => setYeniNot(e.target.value)}
//                   className="flex-1 px-4 py-2 border rounded"
//                 />
//                 <button
//                   onClick={notEkle}
//                   className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded"
//                 >
//                   Not Ekle
//                 </button>
//               </div>
//             </section>

//             <section>
//               <h2 className="font-semibold text-stone-700 mb-2">Görevler</h2>
//               {aktifDers.gorevler.length === 0 && (
//                 <p className="text-gray-500 mb-4">Henüz görev eklenmedi.</p>
//               )}
//               <ul className="mb-4 space-y-2 max-h-40 overflow-y-auto">
//                 {aktifDers.gorevler.map((g) => (
//                   <li key={g.id} className="flex items-center space-x-3">
//                     <input
//                       type="checkbox"
//                       checked={g.done}
//                       onChange={() => gorevToggle(g.id)}
//                       className="w-5 h-5"
//                     />
//                     <span
//                       className={g.done ? "line-through text-gray-400" : ""}
//                     >
//                       {g.text}
//                     </span>
//                   </li>
//                 ))}
//               </ul>
//               <div className="flex gap-2">
//                 <input
//                   type="text"
//                   placeholder="Yeni görev ekle"
//                   value={yeniGorev}
//                   onChange={(e) => setYeniGorev(e.target.value)}
//                   className="flex-1 px-4 py-2 border rounded"
//                 />
//                 <button
//                   onClick={gorevEkle}
//                   className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded"
//                 >
//                   Görev Ekle
//                 </button>
//               </div>
//             </section>
//           </>
//         ) : (
//           <p className="text-gray-600 text-lg">Lütfen bir ders seçin.</p>
//         )}
//       </main>
//     </div>
//   );
// }

// import { useState, useEffect } from "react";

// interface Gorev {
//   id: number;
//   text: string;
//   done: boolean;
// }

// interface Ders {
//   id: number;
//   ad: string;
//   notlar: string[];
//   gorevler: Gorev[];
//   saatler: string;
//   sinavTarihi: string;
//   vizeNotu: number;
//   finalNotu: number;
// }

// export default function Lesson() {
//   const [dersler, setDersler] = useState<Ders[]>(() => {
//     try {
//       const kayit = localStorage.getItem("derslerData");
//       return kayit ? JSON.parse(kayit) : [];
//     } catch {
//       return [];
//     }
//   });

//   const [aktifDersId, setAktifDersId] = useState<number | null>(() => {
//     try {
//       const kayit = localStorage.getItem("aktifDersId");
//       return kayit ? Number(kayit) : null;
//     } catch {
//       return null;
//     }
//   });

//   const [yeniDersAdi, setYeniDersAdi] = useState("");
//   const [yeniNot, setYeniNot] = useState("");
//   const [yeniGorev, setYeniGorev] = useState("");
//   const [saatlerInput, setSaatlerInput] = useState("");
//   const [sinavTarihiInput, setSinavTarihiInput] = useState("");

//   const aktifDers = dersler.find((d) => d.id === aktifDersId);

//   useEffect(() => {
//     localStorage.setItem("derslerData", JSON.stringify(dersler));
//   }, [dersler]);

//   useEffect(() => {
//     if (aktifDersId !== null) {
//       localStorage.setItem("aktifDersId", aktifDersId.toString());
//     }
//     if (aktifDers) {
//       setSaatlerInput(aktifDers.saatler);
//       setSinavTarihiInput(aktifDers.sinavTarihi);
//     } else {
//       setSaatlerInput("");
//       setSinavTarihiInput("");
//     }
//   }, [aktifDersId, aktifDers]);

//   const dersEkle = () => {
//     if (yeniDersAdi.trim() === "") return;
//     const yeniDers: Ders = {
//       id: Date.now(),
//       ad: yeniDersAdi,
//       notlar: [],
//       gorevler: [],
//       saatler: "",
//       sinavTarihi: "",
//       vizeNotu: 0,
//       finalNotu: 0,
//     };
//     const yeniListe = [...dersler, yeniDers];
//     setDersler(yeniListe);
//     setYeniDersAdi("");
//     setAktifDersId(yeniDers.id);
//   };

//   const notEkle = () => {
//     if (!aktifDers || yeniNot.trim() === "") return;
//     const guncellenmisDersler = dersler.map((d) =>
//       d.id === aktifDers.id ? { ...d, notlar: [...d.notlar, yeniNot] } : d
//     );
//     setDersler(guncellenmisDersler);
//     setYeniNot("");
//   };

//   const gorevEkle = () => {
//     if (!aktifDers || yeniGorev.trim() === "") return;
//     const yeniGorevObj: Gorev = {
//       id: Date.now(),
//       text: yeniGorev,
//       done: false,
//     };
//     const guncellenmisDersler = dersler.map((d) =>
//       d.id === aktifDers.id
//         ? { ...d, gorevler: [...d.gorevler, yeniGorevObj] }
//         : d
//     );
//     setDersler(guncellenmisDersler);
//     setYeniGorev("");
//   };

//   const gorevToggle = (gorevId: number) => {
//     if (!aktifDers) return;
//     const guncellenmisDersler = dersler.map((d) => {
//       if (d.id === aktifDers.id) {
//         const yeniGorevler = d.gorevler.map((g) =>
//           g.id === gorevId ? { ...g, done: !g.done } : g
//         );
//         return { ...d, gorevler: yeniGorevler };
//       }
//       return d;
//     });
//     setDersler(guncellenmisDersler);
//   };

//   const saatlerGuncelle = (yeniSaatler: string) => {
//     if (!aktifDers) return;
//     const guncellenmisDersler = dersler.map((d) =>
//       d.id === aktifDers.id ? { ...d, saatler: yeniSaatler } : d
//     );
//     setDersler(guncellenmisDersler);
//     setSaatlerInput(yeniSaatler);
//   };

//   const sinavTarihiGuncelle = (yeniTarih: string) => {
//     if (!aktifDers) return;
//     const guncellenmisDersler = dersler.map((d) =>
//       d.id === aktifDers.id ? { ...d, sinavTarihi: yeniTarih } : d
//     );
//     setDersler(guncellenmisDersler);
//     setSinavTarihiInput(yeniTarih);
//   };

//   const vizeGuncelle = (vize: number) => {
//     if (!aktifDers) return;
//     const guncellenmis = dersler.map((d) =>
//       d.id === aktifDers.id ? { ...d, vizeNotu: vize } : d
//     );
//     setDersler(guncellenmis);
//   };

//   const finalGuncelle = (final: number) => {
//     if (!aktifDers) return;
//     const guncellenmis = dersler.map((d) =>
//       d.id === aktifDers.id ? { ...d, finalNotu: final } : d
//     );
//     setDersler(guncellenmis);
//   };

//   return (
//     <div className="flex bg-gradient-to-br from-gray-100 to-white min-h-screen">
//       {/* Sol Panel */}
//       <aside className="w-72 bg-indigo-600 text-white p-6 shadow-lg">
//         <h2 className="text-xl font-bold mb-4">Dersler</h2>
//         <div className="mb-4 space-y-2 overflow-y-auto max-h-[calc(100vh-200px)]">
//           {dersler.map((ders) => (
//             <div
//               key={ders.id}
//               onClick={() => setAktifDersId(ders.id)}
//               className={`cursor-pointer px-3 py-2 rounded hover:bg-indigo-500 transition ${
//                 ders.id === aktifDersId ? "bg-white text-indigo-600 font-bold" : ""
//               }`}
//             >
//               {ders.ad}
//             </div>
//           ))}
//         </div>
//         <div className="mt-6 space-y-2">
//           <input
//             type="text"
//             placeholder="Yeni ders adı"
//             value={yeniDersAdi}
//             onChange={(e) => setYeniDersAdi(e.target.value)}
//             className="w-full px-3 py-2 text-black rounded focus:outline-none"
//           />
//           <button
//             onClick={dersEkle}
//             className="w-full bg-yellow-300 text-indigo-800 font-semibold py-2 rounded hover:bg-yellow-400"
//           >
//             Ekle
//           </button>
//         </div>
//       </aside>

//       {/* Sağ Panel */}
//       <main className="bg-stone-50 flex-1 p-5 overflow-y-auto">
//         {aktifDers ? (
//           <>
//             <h1 className="text-3xl font-bold text-stone-700 mb-4">{aktifDers.ad}</h1>

//             {/* Saat ve sınav */}
//             <div className="mb-6">
//               <label className="block font-semibold mb-1 text-stone-700">Ders Saatleri</label>
//               <input
//                 type="text"
//                 value={saatlerInput}
//                 onChange={(e) => saatlerGuncelle(e.target.value)}
//                 className="w-full px-3 py-2 border rounded"
//               />
//             </div>

//             <div className="flex gap-6 mb-6">
//               <div>
//                 <label className="block font-semibold mb-1 text-stone-700">Sınav Tarihi</label>
//                 <input
//                   type="date"
//                   value={sinavTarihiInput}
//                   onChange={(e) => sinavTarihiGuncelle(e.target.value)}
//                   className="w-48 px-3 py-2 border rounded"
//                 />
//               </div>
//               <div>
//                 <label className="block font-semibold mb-1 text-stone-700">Vize Notu</label>
//                 <input
//                   type="number"
//                   value={aktifDers.vizeNotu}
//                   onChange={(e) => vizeGuncelle(Number(e.target.value))}
//                   className="w-24 px-3 py-2 border rounded"
//                 />
//               </div>
//               <div>
//                 <label className="block font-semibold mb-1 text-stone-700">Final Notu</label>
//                 <input
//                   type="number"
//                   value={aktifDers.finalNotu}
//                   onChange={(e) => finalGuncelle(Number(e.target.value))}
//                   className="w-24 px-3 py-2 border rounded"
//                 />
//               </div>
//             </div>

//             {/* Notlar */}
//             <section className="mb-8">
//               <h2 className="font-semibold text-stone-700 mb-2">Notlar</h2>
//               <div className="space-y-3 mb-4">
//                 {aktifDers.notlar.map((n, i) => (
//                   <div key={i} className="bg-stone-100 rounded shadow px-4 py-2 text-gray-800">
//                     • {n}
//                   </div>
//                 ))}
//               </div>
//               <div className="flex gap-2">
//                 <input
//                   type="text"
//                   placeholder="Yeni not"
//                   value={yeniNot}
//                   onChange={(e) => setYeniNot(e.target.value)}
//                   className="flex-1 px-4 py-2 border rounded"
//                 />
//                 <button
//                   onClick={notEkle}
//                   className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded"
//                 >
//                   Not Ekle
//                 </button>
//               </div>
//             </section>

//             {/* Görevler */}
//             <section>
//               <h2 className="font-semibold text-stone-700 mb-2">Görevler</h2>
//               <ul className="mb-4 space-y-2 max-h-40 overflow-y-auto">
//                 {aktifDers.gorevler.map((g) => (
//                   <li key={g.id} className="flex items-center space-x-3">
//                     <input
//                       type="checkbox"
//                       checked={g.done}
//                       onChange={() => gorevToggle(g.id)}
//                       className="w-5 h-5"
//                     />
//                     <span className={g.done ? "line-through text-gray-400" : ""}>{g.text}</span>
//                   </li>
//                 ))}
//               </ul>
//               <div className="flex gap-2">
//                 <input
//                   type="text"
//                   placeholder="Yeni görev"
//                   value={yeniGorev}
//                   onChange={(e) => setYeniGorev(e.target.value)}
//                   className="flex-1 px-4 py-2 border rounded"
//                 />
//                 <button
//                   onClick={gorevEkle}
//                   className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded"
//                 >
//                   Görev Ekle
//                 </button>
//               </div>
//             </section>
//           </>
//         ) : (
//           <p className="text-gray-600 text-lg">Lütfen bir ders seçin.</p>
//         )}
//       </main>
//     </div>
//   );
// }

import { useState, useEffect } from "react";

interface Gorev {
  id: number;
  text: string;
  done: boolean;
}

interface Ders {
  id: number;
  ad: string;
  notlar: string[];
  gorevler: Gorev[];
  saatler: string;
  sinavTarihi: string;
  vizeNotu: number;
  finalNotu: number;
}

export default function Lesson() {
  const [dersler, setDersler] = useState<Ders[]>(() => {
    try {
      const kayit = localStorage.getItem("derslerData");
      return kayit ? JSON.parse(kayit) : [];
    } catch {
      return [];
    }
  });

  const [aktifDersId, setAktifDersId] = useState<number | null>(() => {
    try {
      const kayit = localStorage.getItem("aktifDersId");
      return kayit ? Number(kayit) : null;
    } catch {
      return null;
    }
  });

  const [yeniDersAdi, setYeniDersAdi] = useState("");
  const [yeniNot, setYeniNot] = useState("");
  const [yeniGorev, setYeniGorev] = useState("");
  const [saatlerInput, setSaatlerInput] = useState("");
  const [sinavTarihiInput, setSinavTarihiInput] = useState("");

  const aktifDers = dersler.find((d) => d.id === aktifDersId);

  useEffect(() => {
    localStorage.setItem("derslerData", JSON.stringify(dersler));
  }, [dersler]);

  useEffect(() => {
    if (aktifDersId !== null) {
      localStorage.setItem("aktifDersId", aktifDersId.toString());
    }
    if (aktifDers) {
      setSaatlerInput(aktifDers.saatler);
      setSinavTarihiInput(aktifDers.sinavTarihi);
    } else {
      setSaatlerInput("");
      setSinavTarihiInput("");
    }
  }, [aktifDersId, aktifDers]);

  const dersEkle = () => {
    if (yeniDersAdi.trim() === "") return;
    const yeniDers: Ders = {
      id: Date.now(),
      ad: yeniDersAdi,
      notlar: [],
      gorevler: [],
      saatler: "",
      sinavTarihi: "",
      vizeNotu: 0,
      finalNotu: 0,
    };
    const yeniListe = [...dersler, yeniDers];
    setDersler(yeniListe);
    setYeniDersAdi("");
    setAktifDersId(yeniDers.id);
  };

  const dersSil = (id: number) => {
    const filtrelenmis = dersler.filter((d) => d.id !== id);
    setDersler(filtrelenmis);
    if (aktifDersId === id) {
      setAktifDersId(null);
    }
  };

  const notEkle = () => {
    if (!aktifDers || yeniNot.trim() === "") return;
    const guncellenmisDersler = dersler.map((d) =>
      d.id === aktifDers.id ? { ...d, notlar: [...d.notlar, yeniNot] } : d
    );
    setDersler(guncellenmisDersler);
    setYeniNot("");
  };

  const gorevEkle = () => {
    if (!aktifDers || yeniGorev.trim() === "") return;
    const yeniGorevObj: Gorev = {
      id: Date.now(),
      text: yeniGorev,
      done: false,
    };
    const guncellenmisDersler = dersler.map((d) =>
      d.id === aktifDers.id
        ? { ...d, gorevler: [...d.gorevler, yeniGorevObj] }
        : d
    );
    setDersler(guncellenmisDersler);
    setYeniGorev("");
  };

  const gorevToggle = (gorevId: number) => {
    if (!aktifDers) return;
    const guncellenmisDersler = dersler.map((d) => {
      if (d.id === aktifDers.id) {
        const yeniGorevler = d.gorevler.map((g) =>
          g.id === gorevId ? { ...g, done: !g.done } : g
        );
        return { ...d, gorevler: yeniGorevler };
      }
      return d;
    });
    setDersler(guncellenmisDersler);
  };

  const saatlerGuncelle = (yeniSaatler: string) => {
    if (!aktifDers) return;
    const guncellenmisDersler = dersler.map((d) =>
      d.id === aktifDers.id ? { ...d, saatler: yeniSaatler } : d
    );
    setDersler(guncellenmisDersler);
    setSaatlerInput(yeniSaatler);
  };

  const sinavTarihiGuncelle = (yeniTarih: string) => {
    if (!aktifDers) return;
    const guncellenmisDersler = dersler.map((d) =>
      d.id === aktifDers.id ? { ...d, sinavTarihi: yeniTarih } : d
    );
    setDersler(guncellenmisDersler);
    setSinavTarihiInput(yeniTarih);
  };

  const vizeGuncelle = (vize: number) => {
    if (!aktifDers) return;
    const guncellenmis = dersler.map((d) =>
      d.id === aktifDers.id ? { ...d, vizeNotu: vize } : d
    );
    setDersler(guncellenmis);
  };

  const finalGuncelle = (final: number) => {
    if (!aktifDers) return;
    const guncellenmis = dersler.map((d) =>
      d.id === aktifDers.id ? { ...d, finalNotu: final } : d
    );
    setDersler(guncellenmis);
  };

  return (
    <div className="flex bg-gradient-to-br from-gray-100 to-white min-h-screen">
      {/* Sol Panel */}
      <aside className="w-72 bg-indigo-600 text-white p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Dersler</h2>
        <div className="mb-4 space-y-2 overflow-y-auto max-h-[calc(100vh-200px)]">
          {dersler.map((ders) => (
            <div
              key={ders.id}
              className={`flex items-center justify-between px-3 py-2 rounded hover:bg-indigo-500 transition group ${
                ders.id === aktifDersId ? "bg-white text-indigo-600 font-bold" : ""
              }`}
            >
              <span
                onClick={() => setAktifDersId(ders.id)}
                className="cursor-pointer flex-1"
              >
                {ders.ad}
              </span>
              <button
                onClick={() => dersSil(ders.id)}
                className="ml-2 text-sm bg-red-500 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
              >
                Sil
              </button>
            </div>
          ))}
        </div>
        <div className="mt-6 space-y-2">
          <input
            type="text"
            placeholder="Yeni ders adı"
            value={yeniDersAdi}
            onChange={(e) => setYeniDersAdi(e.target.value)}
            className="w-full px-3 py-2 text-black rounded focus:outline-none"
          />
          <button
            onClick={dersEkle}
            className="w-full bg-yellow-300 text-indigo-800 font-semibold py-2 rounded hover:bg-yellow-400"
          >
            Ekle
          </button>
        </div>
      </aside>

      {/* Sağ Panel */}
      <main className="bg-stone-50 flex-1 p-5 overflow-y-auto">
        {aktifDers ? (
          <>
            <h1 className="text-3xl font-bold text-stone-700 mb-4">{aktifDers.ad}</h1>

            <div className="mb-6">
              <label className="block font-semibold mb-1 text-stone-700">Ders Saatleri</label>
              <input
                type="text"
                value={saatlerInput}
                onChange={(e) => saatlerGuncelle(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div className="flex gap-6 mb-6">
              <div>
                <label className="block font-semibold mb-1 text-stone-700">Sınav Tarihi</label>
                <input
                  type="date"
                  value={sinavTarihiInput}
                  onChange={(e) => sinavTarihiGuncelle(e.target.value)}
                  className="w-48 px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1 text-stone-700">Vize Notu</label>
                <input
                  type="number"
                  value={aktifDers.vizeNotu}
                  onChange={(e) => vizeGuncelle(Number(e.target.value))}
                  className="w-24 px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1 text-stone-700">Final Notu</label>
                <input
                  type="number"
                  value={aktifDers.finalNotu}
                  onChange={(e) => finalGuncelle(Number(e.target.value))}
                  className="w-24 px-3 py-2 border rounded"
                />
              </div>
            </div>

            <section className="mb-8">
              <h2 className="font-semibold text-stone-900 mb-2">Notlar</h2>
              <div className="space-y-3 mb-4">
                {aktifDers.notlar.map((n, i) => (
                  <div key={i} className="bg-blue-300 rounded shadow px-4 py-2 text-stone-800">
                    • {n}
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Yeni not"
                  value={yeniNot}
                  onChange={(e) => setYeniNot(e.target.value)}
                  className="flex-1 px-4 py-2 border rounded"
                />
                <button
                  onClick={notEkle}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded"
                >
                  Not Ekle
                </button>
              </div>
            </section>

            <section>
              <h2 className="font-semibold text-stone-700 mb-2">Görevler</h2>
              <ul className="mb-4 space-y-2 max-h-40 overflow-y-auto">
                {aktifDers.gorevler.map((g) => (
                  <li key={g.id} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={g.done}
                      onChange={() => gorevToggle(g.id)}
                      className="w-5 h-5"
                    />
                    <span className={g.done ? "line-through text-gray-400" : ""}>{g.text}</span>
                  </li>
                ))}
              </ul>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Yeni görev"
                  value={yeniGorev}
                  onChange={(e) => setYeniGorev(e.target.value)}
                  className="flex-1 px-4 py-2 border rounded"
                />
                <button
                  onClick={gorevEkle}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded"
                >
                  Görev Ekle
                </button>
              </div>
            </section>
          </>
        ) : (
          <p className="text-gray-600 text-lg">Lütfen bir ders seçin.</p>
        )}
      </main>
    </div>
  );
}
