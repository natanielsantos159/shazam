import React, { useContext } from "react";
import AppContext from "../context/AppContext";
import "../styles/IdentifiedSongCard.css";

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
        <p className="song-artist">{identifiedSong.artist}</p>
        <p className="song-album">{identifiedSong.album}</p>
      </div>
    </div>
  );
}
