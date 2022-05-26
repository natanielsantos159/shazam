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
    const identifiedId = history.length 
      ? history[history.length - 1].identifiedId + 1
      : 1;

    songInfo.identifiedId = identifiedId;
    const newHistory = [songInfo, ...history];
    setHistory(newHistory);
  };

  const removeSongToHistory = (songInfo) => {
    const copyHistory = [...history];
    const index = copyHistory.findIndex((song) => song.identifiedId === songInfo.identifiedId);
    const filtered = copyHistory.splice(index, 1);
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
