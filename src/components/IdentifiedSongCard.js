import PropTypes from "prop-types";
import React from "react";
import youtubeIcon from "../images/youtube.png";
import spotifyIcon from "../images/spotify.svg";
import deezerIcon from "../images/deezer.png";
import musicIcon from "../images/music.png";
import itunesIcon from "../images/itunes.png";
import "../styles/IdentifiedSongCard.css";

export default function IdentifiedSongCard({ songInfo }) {
  const { title, artist, album, artwork, itunesUrl } = songInfo;
  return (
    <div className="identified-song">
      <img
        className="song-artwork"
        src={artwork || musicIcon}
        alt="Capa do álbum"
      />
      <div className="song-info-wrapper">
        <h2 className="song-title">{title}</h2>
        <p className="song-artist">{artist}</p>
        <p className="song-album">{album}</p>
      </div>
      <div className="links-container">
        <h3>Escute em: </h3>
        <a
          href={`https://www.youtube.com/results?search_query=${encodeURI(
            `${artist} ${title}`
          )}`}
          target="_blank"
          rel="noreferrer"
        >
          <img src={youtubeIcon} alt="Youtube" />
        </a>
        <a
          href={`https://open.spotify.com/search/${encodeURI(
            `${artist} ${title}`
          )}`}
          target="_blank"
          rel="noreferrer"
        >
          <img src={spotifyIcon} alt="Spotify" />
        </a>
        <a
          href={`https://www.deezer.com/search/${encodeURI(
            `${artist} ${title}`
          )}`}
          target="_blank"
          rel="noreferrer"
        >
          <img src={deezerIcon} alt="deezer" />
        </a>
        <a
          href={
            itunesUrl ||
            `https://music.apple.com/us/search?term=${encodeURI(
              `${artist} ${title}`
            )}`
          }
          target="_blank"
          rel="noreferrer"
        >
          <img src={itunesIcon} alt="itunes" />
        </a>
      </div>
    </div>
  );
}

IdentifiedSongCard.propTypes = {
  songInfo: PropTypes.shape({
    album: PropTypes.string,
    artist: PropTypes.string,
    artwork: PropTypes.string,
    title: PropTypes.string,
    itunesUrl: PropTypes.string,
  }).isRequired,
};
