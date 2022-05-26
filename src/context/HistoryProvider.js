import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import HistoryContext from "./HistoryContext";

export default function HistoryProvider({ children }) {
  const [history, setHistory] = useState(JSON.parse(localStorage.getItem("history")) || []);

  useEffect(() => {
    saveInLocalStorage(history);
  }, [history]);

  const saveInLocalStorage = () => {
    localStorage.setItem("history", JSON.stringify(history));
  }

  const addSongToHistory = (songInfo) => {
    const newHistory = [...history, songInfo];
    setHistory(newHistory);
  };

  const removeSongToHistory = (songInfo) => {
    const index = history.findIndex((song) => song.recordId === songInfo.recordId);
    const filtered = history.splice(index, 1);
    setHistory(filtered);
  };

  const contextValues = {
    history,
    setHistory,
    addSongToHistory,
    removeSongToHistory,
  };

  return (
    <HistoryContext.Provider value={ contextValues }>
      { children }
    </HistoryContext.Provider>
  );
}

HistoryProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
