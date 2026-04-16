import { useState } from "react";
import SurahList from "./components/SurahList";
import SurahDetail from "./components/SurahDetail";

function App() {
  const [selectedSurah, setSelectedSurah] = useState(null);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #eef2ff, #f9fafb)",
        fontFamily: "sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "#4f46e5",
          color: "white",
          padding: "20px",
          textAlign: "center",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ margin: 0 }}>📖 Al-Qur'an Digital</h1>
        <p style={{ margin: "5px 0 0", fontSize: "14px", opacity: 0.9 }}>
          Baca Al-Qur'an dengan mudah & nyaman
        </p>
      </div>

      {/* Content */}
      <div
        style={{
          maxWidth: "900px",
          margin: "auto",
          padding: "20px",
        }}
      >
        {!selectedSurah ? (
          <SurahList onSelect={setSelectedSurah} />
        ) : (
          <SurahDetail
            surah={selectedSurah}
            goBack={() => setSelectedSurah(null)}
          />
        )}
      </div>
    </div>
  );
}

export default App;