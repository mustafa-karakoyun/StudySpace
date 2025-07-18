import { useEffect, useState } from "react";

interface Note {
  id: number;
  title: string;
  content: string;
  date: string;
}

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>(() => {
    const stored = localStorage.getItem("notes");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const [modalOpen, setModalOpen] = useState(false);

  const [expandedNoteIds, setExpandedNoteIds] = useState<number[]>([]);

  const [form, setForm] = useState({ title: "", content: "" });
  const [formError, setFormError] = useState("");

  const toggleExpand = (id: number) => {
    setExpandedNoteIds((prev) =>
      prev.includes(id) ? prev.filter((nid) => nid !== id) : [...prev, id]
    );
  };
    const deleteNote = (id: number) => {
      const updatedNotes = notes.filter((note) => note.id !== id);
      setNotes(updatedNotes);
    };
  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title.trim() || !form.content.trim()) {
      setFormError("Başlık ve içerik zorunlu!");
      return;
    }

    const newNote: Note = {
      id: Date.now(),
      title: form.title,
      content: form.content,
      date: new Date().toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };



    setNotes([newNote, ...notes]);
    setForm({ title: "", content: "" });
    setFormError("");
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F0F5F1] p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Notlarım
      </h1>

      <button
        className="fixed bottom-8 right-8 bg-blue-400 hover:bg-blue-700 text-white rounded-md w-16 h-16 flex items-center justify-center shadow-lg text-4xl"
        onClick={() => setModalOpen(true)}
        title="Yeni Not Ekle"
      >
        +
      </button>

      {modalOpen && (
        <div className="fixed inset-0 bg-opacity-80 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Yeni Not Ekle</h2>
            <form className="space-y-4" onSubmit={handleAddNote}>
              <input
                type="text"
                placeholder="Başlık"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <textarea
                placeholder="İçerik"
                rows={5}
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              {formError && <p className="text-red-600">{formError}</p>}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition"
              >
                Kaydet
              </button>
            </form>

            <button
              onClick={() => setModalOpen(false)}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
            >
              Kapat
            </button>
          </div>
        </div>
      )}

      {/* Notları listele */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 ">
      
        {notes.length === 0 && (
          <p className="text-center text-gray-500">Henüz not eklenmemiş.</p>
        )}
        
        {notes.map((note) => {
          const isExpanded = expandedNoteIds.includes(note.id);
          const previewContent =
            note.content.length > 150
              ? note.content.slice(0, 150) + "..."
              : note.content;

          return (
            <div
              key={note.id}
              className="bg-indigo-700 rounded-xl shadow-lg p-3 text-sm cursor-pointer transform transition duration-200 hover:scale-102 hover:shadow-xl"
              onClick={() => toggleExpand(note.id)}
            >
              <h2 className="text-2xl font-semibold text-stone-950">
                {note.title}
              </h2>
              <p className="text-white mt-2 whitespace-pre-line">
                {isExpanded ? note.content : previewContent}
              </p>
              {note.content.length > 150 && (
                <button
                  className="mt-2 text-stone-900 hover:underline focus:outline-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExpand(note.id);
                  }}
                >
                  {isExpanded ? "Küçült" : "Devamını Göster"}
                </button>
              )}

              <div className="text-sm text-gray-50 mt-3">{note.date}</div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteNote(note.id);
                }}
                className="bg-zinc-400 hover:bg-red-600 text-white px-4 py-2 rounded-md"
              >
                Sil
              </button>
            </div>
          );
        })}
        
      </div>
    </div>
  );
}
