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
    <h2
      style={{
        marginBottom: "15px",
        color: "#111827",
        textAlign: "center",
      }}
    >
      Daftar Surah
    </h2>

    {/* 🔍 Search Box */}
    <input
      type="text"
      placeholder="🔍 Cari surah..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      style={{
        padding: "12px",
        width: "100%",
        marginBottom: "20px",
        borderRadius: "10px",
        border: "1px solid #ddd",
        outline: "none",
        fontSize: "14px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
      }}
    />

    {/* 📦 List */}
    <div
      style={{
        display: "grid",
        gap: "12px",
      }}
    >
      {filteredSurah.map((s) => {
        const nomor = s.nomor || s.number;
        const nama = s.namaLatin || s.name?.transliteration?.id;
        const arti = s.arti || s.translation?.id;

        return (
          <div
            key={nomor}
            onClick={() => onSelect(nomor)}
            style={{
              cursor: "pointer",
              background: "#fff",
              padding: "15px",
              borderRadius: "12px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
              transition: "0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.02)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            {/* Kiri */}
            <div>
              <p
                style={{
                  margin: 0,
                  fontWeight: "bold",
                  color: "#111",
                }}
              >
                {nomor}. {nama}
              </p>
              <p
                style={{
                  margin: "4px 0 0",
                  fontSize: "13px",
                  color: "#6b7280",
                }}
              >
                {arti}
              </p>
            </div>

            {/* Kanan */}
            <div
              style={{
                background: "#4f46e5",
                color: "#fff",
                padding: "6px 10px",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            >
              Buka
            </div>
          </div>
        );
      })}
    </div>

    {filteredSurah.length === 0 && (
      <p style={{ textAlign: "center", marginTop: "20px" }}>
        Tidak ditemukan 😢
      </p>
    )}
  </div>
);
}

export default SurahList;