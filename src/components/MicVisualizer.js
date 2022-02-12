import { useEffect, useContext, useRef } from "react";
import AppContext from "../context/AppContext";
import "../styles/MicVizualizer.css";

export default function MicVisualizer({ stream }) {
  const { isRecording } = useContext(AppContext);
  const recording = useRef(isRecording);

  const connectStream = (stream) => {
    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);
    analyser.smoothingTimeConstant = 0.65;
    analyser.fftSize = 64;
    initRenderLoop(analyser);
  };

  useEffect(() => {
    if (isRecording) {
      connectStream(stream);

      recording.current = true;
    } else {
      recording.current = false;
    }
  }, [isRecording]);

  return (
    <div className="vizualizer">
      {new Array(32).fill().map(() => (
        <div className={`line ${isRecording ? 'isRecording' : ''}`}></div>
      ))}
    </div>
  );
}
