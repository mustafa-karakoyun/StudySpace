
// import { useState, useEffect } from "react";
// import { Plus } from "lucide-react";
// import EventModal from "./event";

// const weekdays = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

// interface Event {
//   id: string;
//   title: string;
//   date: string; // "YYYY-MM-DD"
//   type: "event" | "exam" | "assignment" | "gorev";
//   description?: string;
// }

// export default function Takvim() {
//   //
//   const [modalOpen, setModalOpen] = useState(false);
//   const [activeDay, setActiveDay] = useState<number | null>(null);

//   const today = new Date();
//   const currentYear = today.getFullYear();
//   const currentMonth = today.getMonth();
//   const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
//   const startWeekDay = firstDayOfMonth.getDay();
//   const offset = (startWeekDay + 6) % 7;
//   const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

//   const [events, setEvents] = useState<Event[]>(() => {
//   if (typeof window !== "undefined") {
//     const stored = localStorage.getItem("etkinlikler");
//     if (stored) {
//       try {
//         return JSON.parse(stored) as Event[];
//       } catch {
//         return [];
//       }
//     }
//   }
//   return [];
// });


//   // localStorage'dan etkinlikleri al
//   useEffect(() => {
//     const stored = localStorage.getItem("etkinlikler");
//     if (stored) {
//       setEvents(JSON.parse(stored));
//     }
//   }, []);

//   // etkinlikler değiştiğinde localStorage'a kaydet
//   useEffect(() => {
//     localStorage.setItem("etkinlikler", JSON.stringify(events));  
//   }, [events]);

//   const getDateString = (day: number) =>
//     `${currentYear}-${(currentMonth + 1).toString().padStart(2, "0")}-${day
//       .toString()
//       .padStart(2, "0")}`;

//   const filteredEvents = (day: number) =>
//     events.filter((e) => e.date === getDateString(day));

//   const handleSave = (e: Omit<Event, "id">) => {
//     const yeni = { ...e, id: Date.now().toString() };
//     setEvents((prev) => [...prev, yeni]);
//     setModalOpen(false);
//   };

//   return (
//     <div className="bg-indigo-300 rounded-xl shadow-md p-4 relative">
//       <h2 className="text-xl font-semibold mb-4">Aylık Takvim</h2>

//       {/* Gün isimleri */}
//       <div className="grid grid-cols-7 gap-2 mb-2 text-sm font-semibold text-center">
//         {weekdays.map((day, i) => (
//           <div key={i}>{day}</div>
//         ))}
//       </div>

//       {/* Gün kutuları */}
//       <div className="grid grid-cols-7 gap-2">
//         {Array.from({ length: offset }).map((_, i) => (
//           <div key={"empty-" + i} className="p-3 rounded-lg bg-transparent" />
//         ))}

//         {Array.from({ length: daysInMonth }).map((_, i) => (
//           <div
//             key={"day-" + (i + 1)}
//             onClick={() => setActiveDay(i + 1)}
//             className={`p-3 rounded-lg text-center cursor-pointer transition bg-gray-300
//              ${activeDay === i + 1 ? "ring-2 ring-yellow-500" : ""}`}
//           >
//             <div className="font-semibold">{i + 1}</div>
//             {filteredEvents(i + 1).length > 0 && (
//               <div className="text-xs mt-1 text-yellow-900">
//                 📌 {filteredEvents(i + 1).length} etkinlik
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Seçili günün etkinlikleri */}
//       {activeDay && (
//         <div className="mt-6 bg-white rounded-lg p-4 shadow">
//           <h3 className="text-lg font-semibold mb-2">
//             {activeDay}. gün etkinlikleri
//           </h3>
//           {filteredEvents(activeDay).length > 0 ? (
//             <ul className="list-disc list-inside text-sm text-gray-800">
//               {filteredEvents(activeDay).map((e, idx) => (
//                 <li key={idx}>
//                   <strong>{e.title}</strong> ({e.type})
//                   {e.description && <> – {e.description}</>}
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-sm text-gray-500">Etkinlik yok.</p>
//           )}
//         </div>
//       )}

//       {/* Artı butonu */}
//       <button
//         onClick={() => setModalOpen(true)}
//         className="absolute bottom-4 right-4 bg-yellow-400 text-black rounded-full p-3 shadow hover:bg-yellow-500 transition"
//       >
//         <Plus />
//       </button>

//       {/* Modal */}
//       {modalOpen && (
//         <EventModal
//           isOpen={modalOpen}
//           onClose={() => setModalOpen(false)}
//           event={null}
//           onSave={handleSave}
//           onDelete={() => {}}
//         />
//       )}
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import EventModal from "./event";

const weekdays = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

interface Event {
  id: string;
  title: string;
  date: string; // "YYYY-MM-DD"
  type: "event" | "exam" | "assignment" | "gorev";
  description?: string;
}

export default function Takvim() {
  const [events, setEvents] = useState<Event[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("etkinlikler");
      if (stored) {
        try {
          return JSON.parse(stored) as Event[];
        } catch {
          return [];
        }
      }
    }
    return [];
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [activeDay, setActiveDay] = useState<number | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const startWeekDay = firstDayOfMonth.getDay();
  const offset = (startWeekDay + 6) % 7;
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // localStorage güncellemesi
  useEffect(() => {
    localStorage.setItem("etkinlikler", JSON.stringify(events));
  }, [events]);

  const getDateString = (day: number) =>
    `${currentYear}-${(currentMonth + 1).toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;

  const filteredEvents = (day: number) =>
    events.filter((e) => e.date === getDateString(day));

  // Kaydet (Yeni veya Güncelle)
  const handleSave = (e: Omit<Event, "id">) => {
    if (selectedEvent) {
      // Güncelle
      setEvents((prev) =>
        prev.map((ev) => (ev.id === selectedEvent.id ? { ...ev, ...e } : ev))
      );
    } else {
      // Yeni etkinlik ekle
      const yeni = { ...e, id: Date.now().toString() };
      setEvents((prev) => [...prev, yeni]);
    }
    setSelectedEvent(null);
    setModalOpen(false);
  };

  // Sil
  const handleDelete = (id: string) => {
    setEvents((prev) => prev.filter((ev) => ev.id !== id));
    setSelectedEvent(null);
    setModalOpen(false);
  };

  return (
    <div className="bg-blue-300 rounded-xl shadow-md p-4 relative">
      <h2 className="text-xl font-semibold mb-4">Aylık Takvim</h2>

      {/* Gün isimleri */}
      <div className="grid grid-cols-7 gap-2 mb-2 text-sm font-semibold text-center">
        {weekdays.map((day, i) => (
          <div key={i}>{day}</div>
        ))}
      </div>

      {/* Gün kutuları */}
      <div className="grid grid-cols-7 gap-2">
        {/* Boş hücreler */}
        {Array.from({ length: offset }).map((_, i) => (
          <div key={"empty-" + i} className="p-3 rounded-lg bg-transparent" />
        ))}

        {/* Günler */}
        {Array.from({ length: daysInMonth }).map((_, i) => (
          <div
            key={"day-" + (i + 1)}
            onClick={() => setActiveDay(i + 1)}
            className={`p-3 rounded-lg text-center cursor-pointer transition bg-gray-300
             ${activeDay === i + 1 ? "ring-2 ring-yellow-500" : ""}`}
          >
            <div className="font-semibold">{i + 1}</div>
            {filteredEvents(i + 1).length > 0 && (
              <div className="text-xs mt-1 text-yellow-900">
                📌 {filteredEvents(i + 1).length} etkinlik
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Seçili günün etkinlikleri */}
      {activeDay && (
        <div className="mt-6 bg-white rounded-lg p-4 shadow">
          <h3 className="text-lg font-semibold mb-2">
            {activeDay}. gün etkinlikleri
          </h3>
          {filteredEvents(activeDay).length > 0 ? (
            <ul className="list-disc list-inside text-sm text-gray-800">
              {filteredEvents(activeDay).map((e, idx) => (
                <li key={idx} className="flex justify-between items-center">
                  <div>
                    <strong>{e.title}</strong> ({e.type})
                    {e.description && <> – {e.description}</>}
                  </div>
                  <button
                    onClick={() => {
                      setSelectedEvent(e);
                      setModalOpen(true);
                    }}
                    className="relative px-15 text-blue-600 hover:underline text-sm"
                  >
                    Düzenle
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">Etkinlik yok.</p>
          )}
        </div>
      )}

      {/* Artı butonu */}
      <button
        onClick={() => {
          setSelectedEvent(null);
          setModalOpen(true);
        }}
        className="absolute bottom-4 right-4 bg-yellow-400 text-black rounded-full p-3 shadow hover:bg-yellow-500 transition"
      >
        <Plus />
      </button>

      {/* Modal */}
      {modalOpen && (
        <EventModal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setSelectedEvent(null);
          }}
          event={selectedEvent}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
