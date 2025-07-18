import { useState } from "react";

export default function Ai() {
  const [input, setInput] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      });
      const data = await res.json();
      setAnswer(data.answer);
    } catch (err) {
      setAnswer("⚠️ Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-[#F0F5F1] flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-gray-800"> Yapay Zeka Asistanı</h1>
      <p className="text-gray-600 mb-4"> Henüz konuşmayı öğrenmedi</p>
      <textarea
        className="w-full max-w-md p-4 border rounded-lg mb-4"
        placeholder="Sorunuzu buraya yazın..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Yanıtlanıyor..." : "Soruyu Gönder"}
      </button>

      {answer && (
        <div className="mt-6 bg-white border p-4 rounded w-full max-w-md shadow">
          <p className="text-gray-800 whitespace-pre-line">{answer}</p>
        </div>
      )}
    </div>
  );
}
