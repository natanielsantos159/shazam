import React,{ useContext } from "react";
import AppContext from "./context/AppContext";
import RecordButton from "./components/RecordButton";

import IdentifiedSongCard from "./components/IdentifiedSongCard";
import MicVisualizer from "./components/MicVisualizer";
import "./App.css";


function App() {
  const {
    isRecording,
    identifiedSong,
    identified,
    stream,
    identifying,
  } = useContext(AppContext);

  return (
    <div className="App">
      <div className={`microphone-container ${identified && identifiedSong ? "identified" : ''}`}>
        <RecordButton />
        <MicVisualizer stream={stream} />
        <div className="state">
          {isRecording && "Escutando..."}
          {(identified === false && !isRecording) && "Não foi possível identificar essa música :/"}    
          { identifying && 'Identificando...'}
        </div>
      </div>
      {identified && identifiedSong && <IdentifiedSongCard />}
    </div>
  );
}

export default App;
