import { useEffect, useState } from "react";

function SurahDetail({ surah, goBack }) {
  const [detail, setDetail] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://equran.id/api/v2/surat/${surah}`)
      .then(res => {
        if (!res.ok) throw new Error("API Error");
        return res.json();
      })
      .then(data => setDetail(data.data))
      .catch(async () => {
        try {
          const res = await fetch(`https://api.quran.gading.dev/surah/${surah}`);
          const data = await res.json();
          setDetail(data.data);
        } catch {
          setError("Gagal load ayat 😢");
        }
      });
  }, [surah]);

  if (error) return <p>{error}</p>;
  if (!detail) return <p>Loading...</p>;

  return (
  <div
    style={{
      maxWidth: "800px",
      margin: "auto",
      padding: "20px",
      fontFamily: "sans-serif",
      background: "#f9fafb",
      minHeight: "100vh",
    }}
  >
    <button
      onClick={goBack}
      style={{
        marginBottom: "20px",
        padding: "8px 14px",
        borderRadius: "8px",
        border: "none",
        background: "#4f46e5",
        color: "#fff",
        cursor: "pointer",
      }}
    >
      ⬅ Kembali
    </button>

    <h2
      style={{
        textAlign: "center",
        marginBottom: "30px",
        color: "#111827",
      }}
    >
      {detail.namaLatin || detail.name?.transliteration?.id}
    </h2>

    {(detail?.ayat || detail?.verses || []).map((a) => (
      <div
        key={a.nomorAyat || a.number?.inSurah}
        style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "16px",
          marginBottom: "15px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
        }}
      >
        <p
          style={{
            fontSize: "26px",
            textAlign: "right",
            marginBottom: "10px",
            lineHeight: "1.8",
            color: "#111",
          }}
        >
          {a.teksArab || a.text?.arab}
        </p>

        <p
          style={{
            fontSize: "14px",
            color: "#6b7280",
            marginBottom: "8px",
          }}
        >
          Ayat {a.nomorAyat || a.number?.inSurah}
        </p>

        <p
          style={{
            fontSize: "16px",
            color: "#374151",
          }}
        >
          <b>Artinya:</b> {a.teksIndonesia || a.translation?.id}
        </p>
      </div>
    ))}
  </div>
);
}

export default SurahDetail;