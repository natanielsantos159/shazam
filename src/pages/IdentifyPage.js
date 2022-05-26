import React, { useContext } from "react";
import AppContext from "../context/AppContext";

import RecordButton from "../components/RecordButton";
import IdentifiedSongCard from "../components/IdentifiedSongCard";
import MicVisualizer from "../components/MicVisualizer";

export default function IdentifyPage() {
  const {
    identifiedSong,
    identified,
    stream,
    status,
  } = useContext(AppContext);

  return (
    <>
      <div
        className={`microphone-container ${
          identified && identifiedSong ? "identified" : ""
        }`}
      >
        <RecordButton />
        <MicVisualizer stream={stream} />
        <div className="status">{status && status}</div>
      </div>
      {identified && identifiedSong && <IdentifiedSongCard />}
    </>
  );
}
