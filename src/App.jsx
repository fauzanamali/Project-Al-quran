import { useState } from "react";
import SurahList from "./components/SurahList";
import SurahDetail from "./components/SurahDetail";

function App() {
  const [selectedSurah, setSelectedSurah] = useState(null);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>📖 Al-Qur'an Digital</h1>

      {!selectedSurah ? (
        <SurahList onSelect={setSelectedSurah} />
      ) : (
        <SurahDetail
          surah={selectedSurah}
          goBack={() => setSelectedSurah(null)}
        />
      )}
    </div>
  );
}

export default App;