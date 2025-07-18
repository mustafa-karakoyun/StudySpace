export default function Header() {
  const today = new Date().toLocaleDateString("tr-TR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <header className="bg-blue-900 shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl text-gray-50 font-semibold">Hoş geldin MUSTAFA</h1>
      <span className="text-gray-50">{today}</span>
    </header>
  );
}
