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
    <div>
      <button onClick={goBack}>⬅ Kembali</button>

      <h2>
        {detail.namaLatin || detail.name?.transliteration?.id}
      </h2>

      {(detail?.ayat || detail?.verses || []).map((a) => (
        <div
          key={a.nomorAyat || a.number?.inSurah}
          style={{
            margin: "15px 0",
            padding: "10px",
            borderBottom: "1px solid #eee"
          }}
        >
          <p style={{ fontSize: "24px", textAlign: "right" }}>
            {a.teksArab || a.text?.arab}
          </p>

          <p>
            <b>Artinya:</b> {a.teksIndonesia || a.translation?.id}
          </p>
        </div>
      ))}
    </div>
  );
}

export default SurahDetail;