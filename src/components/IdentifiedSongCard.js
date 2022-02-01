import React, { useContext } from "react";
import AppContext from "../context/AppContext";

export default function IdentifiedSongCard() {
  const { identifiedSong } = useContext(AppContext);
  return (
    <div className="identified-song">
      {identifiedSong.artwork && (
        <img
          className="song-artwork"
          src={identifiedSong.artwork}
          alt="Capa do álbum"
        />
      )}
      <div className="song-info-wrapper">
        <h2 className="song-title">{identifiedSong.title}</h2>
        <h3 className="song-artist">{identifiedSong.artist}</h3>
        <h3 className="song-album">{identifiedSong.album}</h3>
      </div>
    </div>
  );
}
