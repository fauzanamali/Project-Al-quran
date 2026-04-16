import { useEffect, useState } from "react";

function SurahList({ onSelect }) {
  const [surah, setSurah] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://equran.id/api/v2/surat")
      .then(res => {
        if (!res.ok) throw new Error("API Error " + res.status);
        return res.json();
      })
      .then(data => setSurah(data.data))
      .catch(async () => {
        try {
          const res = await fetch("https://api.quran.gading.dev/surah");
          const data = await res.json();
          setSurah(data.data);
        } catch {
          setError("Gagal ambil data 😢");
        }
      });
  }, []);

  if (error) return <p>{error}</p>;

  // 🔍 Filter search
  const filteredSurah = surah.filter((s) => {
    const name = s.namaLatin || s.name?.transliteration?.id || "";
    return name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div>
      <h2>Daftar Surah</h2>

      {/* 🔍 Input Search */}
      <input
        type="text"
        placeholder="Cari surah..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "100%",
          marginBottom: "10px",
          borderRadius: "8px",
          border: "1px solid #ccc"
        }}
      />

      {filteredSurah.map((s) => (
        <div
          key={s.nomor || s.number}
          onClick={() => onSelect(s.nomor || s.number)}
          style={{
            cursor: "pointer",
            border: "1px solid #ccc",
            padding: "10px",
            margin: "5px 0",
            borderRadius: "8px"
          }}
        >
          <strong>
            {s.namaLatin || s.name?.transliteration?.id}
          </strong>
        </div>
      ))}

      {filteredSurah.length === 0 && <p>Tidak ditemukan 😢</p>}
    </div>
  );
}

export default SurahList;