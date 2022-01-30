import React, { useState } from "react";
import AppContext from "./AppContext";

export default function Provider({ children }) {
  const [isRecording, setIsRecording] = useState(false);
  const [identifiedSong, setIdentifiedSong] = useState({
    album: "Midnight Room",
    artist: "Springtime Carnivore",
    genre: "Alternative",
    release_year: "2016",
    title: "Bad Dream Baby",
  });
  const [count, setCount] = useState(0);

  const contextValues = {
    isRecording,
    setIsRecording,
    identifiedSong,
    setIdentifiedSong,
    count,
    setCount,
  };
  return (
    <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
  );
}
