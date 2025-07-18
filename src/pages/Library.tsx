import { useEffect, useState } from "react";

interface Book {
  id: number;
  title: string;
  author: string;
  notes: string[];
  status: "read" | "reading";
}

export default function Library() {
  const [books, setBooks] = useState<Book[]>([

  ]);
  const [initialized, setInitialized] = useState(false);
    // İlk yüklemede localStorage'dan veri al
  useEffect(() => {
    try {
      const storedBooks = localStorage.getItem("my-books");
      console.log("localStorage'dan gelen:", storedBooks);
      if (storedBooks) {
        const parsed = JSON.parse(storedBooks);
        console.log("JSONparse sonucu:", parsed);
        if (Array.isArray(parsed)) {
          setBooks(parsed);
        }
      }
    } catch (error) {
      console.error("LocalStorage'dan veri çekilirken hata:", error);
    }
    setInitialized(true);
  }, []);

  // Kitaplar değişince localStorage'a kaydet
  useEffect(() => {
    if (initialized) {
      localStorage.setItem("my-books", JSON.stringify(books));
      console.log("📥 Kitaplar kaydediliyor:", books);
    }
  }, [books, initialized]);


  const [searchTerm, setSearchTerm] = useState("");

  const addBook = (
    title: string,
    author: string,
    note: string,
    status: Book["status"]
  ) => {
    if (!title.trim() || !author.trim()) return;
    const newBook: Book = {
      id: Date.now(),
      title: title.trim(),
      author: author.trim(),
      notes: note.trim() ? [note.trim()] : [],
      status,
    };
    setBooks((prevBooks) => [...prevBooks, newBook]);
  };

  const addNote = (id: number, newNote: string) => {
    if (!newNote.trim()) return;
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id ? { ...book, notes: [...book.notes, newNote.trim()] } : book
      )
    );
  };

  const markAsRead = (id: number) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id ? { ...book, status: "read" } : book
      )
    );
  };

  const deleteBook = (id: number) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getBooksByStatus = (status: Book["status"]) =>
    filteredBooks.filter((book) => book.status === status);

  return (
    <div className="p-6 bg-[#F0F5F1] space-y-12 max-w-7xl mx-auto">
      {/* Arama Kutusu */}
      <div className="max-w-xl mx-auto">
        <input
          type="text"
          placeholder="Kitap ya da yazar ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
      </div>

      {/* Okuduklarım */}
      <BookSection
        title="✅ Okuduklarım"
        books={getBooksByStatus("read")}
        addNote={addNote}
        markAsRead={markAsRead}
        deleteBook={deleteBook}
      />

      {/* Okuyorum */}
      <BookSection
        title="🕓 Okuyorum"
        books={getBooksByStatus("reading")}
        addNote={addNote}
        markAsRead={markAsRead}
        deleteBook={deleteBook}
      />

      {/* Kitap Ekle */}
      <AddBookCard onAddBook={addBook} />
    </div>
  );
}

function BookSection({
  title,
  books,
  addNote,
  markAsRead,
  deleteBook,
}: {
  title: string;
  books: Book[];
  addNote: (id: number, note: string) => void;
  markAsRead: (id: number) => void;
  deleteBook: (id: number) => void;
}) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
      {books.length === 0 ? (
        <p className="text-gray-500 text-sm">Bu kategoride kitap yok.</p>
      ) : (
        <div className="space-y-4">
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              addNote={addNote}
              markAsRead={markAsRead}
              deleteBook={deleteBook}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function BookCard({
  book,
  addNote,
  markAsRead,
  deleteBook,
}: {
  book: Book;
  addNote: (id: number, note: string) => void;
  markAsRead: (id: number) => void;
  deleteBook: (id: number) => void;
}) {
  const [noteInput, setNoteInput] = useState("");

  const handleAddNote = () => {
    if (!noteInput.trim()) return;
    addNote(book.id, noteInput);
    setNoteInput("");
  };

  return (
    <div className="border border-gray-200 rounded-lg bg-indigo-600 p-4 hover:shadow-md transition space-y-2">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{book.title}</h3>
          <p className="text-sm text-white">{book.author}</p>
        </div>
        <div className="flex gap-2">
          {book.status !== "read" && (
            <button
              onClick={() => markAsRead(book.id)}
              className="text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
            >
              Okudum
            </button>
          )}
          <button
            onClick={() => deleteBook(book.id)}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
          >
            Sil
          </button>
        </div>
      </div>

      {/* Notlar */}
      <ul className="list-disc list-inside text-sm text-white space-y-1 max-h-32 overflow-y-auto">
        {book.notes.map((note, idx) => (
          <li key={idx}>{note}</li>
        ))}
      </ul>

      {/* Not Ekle */}
      <div className="flex gap-2 mt-2">
        <input
          type="text"
          placeholder="Not ekle..."
          value={noteInput}
          onChange={(e) => setNoteInput(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded text-sm"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAddNote();
          }}
        />
        <button
          onClick={handleAddNote}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
        >
          Ekle
        </button>
      </div>
    </div>
  );
}

function AddBookCard({ onAddBook }: { onAddBook: Function }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<"reading" | "read">("reading");

  const handleAdd = () => {
    if (!title.trim() || !author.trim()) return;
    onAddBook(title, author, note, status);
    setTitle("");
    setAuthor("");
    setNote("");
    setStatus("reading");
  };

  return (
    <div className="max-w-5xl mx-auto border border-dashed border-gray-400 rounded-lg bg-stone-950 p-6 space-y-4">
      <h2 className="text-xl font-semibold text-white">➕ Yeni Kitap Ekle</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Kitap adı"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 text-white border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Yazar adı"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="p-2 text-white border border-gray-300 rounded"
        />
      </div>
      <textarea
        placeholder="İlk not (isteğe bağlı)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="w-full p-2 text-white border border-gray-300 rounded"
        rows={3}
      ></textarea>
      <div className="flex items-center gap-4">
        <label className="text-sm text-white">Durum:</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as "read" | "reading")}
          className="p-2 bg-white border border-gray-300 rounded"
        >
          <option value="reading">📖 Okuyorum</option>
          <option value="read">✅ Okudum</option>
        </select>
        <button
          onClick={handleAdd}
          className="ml-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Ekle
        </button>
      </div>
    </div>
  );
}
