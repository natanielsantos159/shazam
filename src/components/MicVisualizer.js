/* eslint-disable no-unused-vars */
import PropTypes from "prop-types"
import { useEffect, useContext, useRef } from "react";
import AppContext from "../context/AppContext";
import "../styles/MicVizualizer.css";

export default function MicVisualizer({ stream }) {
  const { isRecording } = useContext(AppContext);
  const recording = useRef(isRecording);

  const initRenderLoop = (analyser) => {
    const frequencyData = new Uint8Array(analyser.frequencyBinCount);
    const renderFrame = () => {
      analyser.getByteFrequencyData(frequencyData);
      processFrame(frequencyData);
      if (recording.current) requestAnimationFrame(renderFrame);
    };
    requestAnimationFrame(renderFrame);
  };

  const connectStream = (stream) => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
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

  const processFrame = (data) => {
    const values = Object.values(data);
    const dataMapIndex = {
      0:31,
      1:29,
      2:27,
      3:25,
      4:23,
      5:21,
      6:19,
      7:17,
      8:15,
      9:13,
      10:11,
      11:9,
      12:7,
      13:5,
      14:3,
      15:1,
      16:0,
      17:2,
      18:4,
      19:6,
      20:8,
      21:10,
      22:12,
      23:14,
      24:16,
      25:18,
      26:20,
      27:22,
      28:24,
      29:26,
      30:28,
      31:30,
    };
    const linesElements = document.querySelectorAll(".line");
    for (let i = 0; i < 32; ++i) {
      const value = values[dataMapIndex[i]] / 160;
      linesElements[i].style.transform = `scaleY( ${value} )`;
      linesElements[i].style.opacity = Math.max(0.25, value);
    }
  };

  return (
    <div className="vizualizer">
      {new Array(32).fill().map((_current, i) => (
        <div key={i} className={`line ${isRecording ? 'isRecording' : ''}`}></div>
      ))}
    </div>
  );
}

MicVisualizer.propTypes = {
  stream: PropTypes.object
}
