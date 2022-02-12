import { useEffect, useContext, useRef } from "react";
import AppContext from "../context/AppContext";
import "../styles/MicVizualizer.css";

export default function MicVizualizer({ stream }) {
  const { isRecording } = useContext(AppContext);
 
  return (
    <div className="vizualizer">
      {new Array(32).fill().map(() => (
        <div className={`line ${isRecording ? 'isRecording' : ''}`}></div>
      ))}
    </div>
  );
}
