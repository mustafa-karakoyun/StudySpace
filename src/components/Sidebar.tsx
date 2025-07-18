// import { Home, Music, Book, Pencil, Brain } from "lucide-react";

// const navItems = [
//   { label: "Anasayfa", icon: <Home />, path: "/" },
//   { label: "Müzik", icon: <Music />, path: "/music" },
//   { label: "Kitaplık", icon: <Book />, path: "/library" },
//   { label: "Notlar", icon: <Pencil />, path: "/notes" },
//   { label: "Ders", icon: <Book />, path: "/Lesson" },
//   { label: "Yapay Zeka", icon: <Brain />, path: "/ai" },
// ];

// export default function Sidebar() {
//   return (
//     <aside className="w-64 h-screen bg-[#1111] text-white p-4 flex flex-col">
//       <h2 className="text-2xl font-bold mb-6">📚 StudySpace</h2>
//       <nav className="space-y-3">
//         {navItems.map((item) => (
//           <a
//             key={item.label}
//             href={item.path}
//             className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded"
//           >
//             {item.icon}
//             <span>{item.label}</span>
//           </a>
//         ))}
//       </nav>
//     </aside>
//   );
// }

import { useState } from "react";
import { Home, Music, Book, Pencil, Brain, Menu, X } from "lucide-react";

const navItems = [
  { label: "Anasayfa", icon: <Home />, path: "/" },
  { label: "Müzik", icon: <Music />, path: "/music" },
  { label: "Kitaplık", icon: <Book />, path: "/library" },
  { label: "Notlar", icon: <Pencil />, path: "/notes" },
  { label: "Ders", icon: <Book />, path: "/Lesson" },
  { label: "Yapay Zeka", icon: <Brain />, path: "/ai" },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-16"
      } bg-blue-900 text-white h-screen p-4 transition-all duration-300`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white mb-6 focus:outline-none"
      >
        {isOpen ? <X /> : <Menu />}
      </button>

      {/* Başlık */}
      {isOpen && <h2 className="text-2xl font-bold mb-6">📚 StudySpace</h2>}

      {/* Navigasyon */}
      <nav className="space-y-3">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.path}
            className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded transition"
          >
            <span>{item.icon}</span>
            {isOpen && <span>{item.label}</span>}
          </a>
        ))}
      </nav>
    </aside>
  );
}
