import PropTypes from "prop-types";
import React, { useState } from "react";
import AppContext from "./AppContext";

export default function Provider({ children }) {
  // const identifiedSongMock = {
  //   album: "Midnight Room",
  //   artist: "Springtime Carnivore",
  //   genre: "Alternative",
  //   release_year: "2016",
  //   title: "Bad Dream Baby",
  //   artwork: "https://i.scdn.co/image/ab67616d0000b2733525ba2609c82b320a811ce9",
  // };

  const [isRecording, setIsRecording] = useState(false);
  const [identifiedSong, setIdentifiedSong] = useState();
  const [count, setCount] = useState(0);
  const [identified, setIdentified] = useState();
  const [itunesUrl, setItunesUrl] = useState();
  const [stream, setStream] = useState();
  const [identifying, setIdentifying] = useState(false);
  const [status, setStatus] = useState(undefined);

  const contextValues = {
    isRecording,
    setIsRecording,
    identifiedSong,
    setIdentifiedSong,
    count,
    setCount,
    identified,
    setIdentified,
    itunesUrl,
    setItunesUrl,
    stream,
    setStream,
    identifying,
    setIdentifying,
    status,
    setStatus,
  };
  return (
    <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
