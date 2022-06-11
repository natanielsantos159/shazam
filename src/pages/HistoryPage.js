import React, { useContext } from "react";
import IdentifiedSongCard from "../components/IdentifiedSongCard";
import HistoryContext from "../context/HistoryContext";
import "../styles/HistoryPage.css";

export default function HistoryPage() {
  const { history } = useContext(HistoryContext);

  return (
    <main className="history-page">
      <div className="identified-songs">
        {history.length ? history.map((songInfo, i) => (
          <IdentifiedSongCard key={i} songInfo={songInfo} />
        )) : ("Histórico vazio.")}
      </div>
    </main>
  );
}
