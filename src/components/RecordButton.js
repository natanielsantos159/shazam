import React, { useContext } from "react";
import AppContext from "../context/AppContext";
import microphoneIcon from "../images/microphone2.png";
import '../styles/RecordButton.css';

export default function RecordButton({ stopRecording, startRecording }) {
  const { isRecording } = useContext(AppContext);

  return (
    <button
      type="button"
      onClick={isRecording ? stopRecording : startRecording}
      className="record-button"
    >
      <div className="card__content">
        <img src={microphoneIcon} alt="Identificar" />
      </div>
      <div class="blob"></div>
      <div class="blob"></div>
      <div class="blob"></div>
      <div class="blob"></div>
    </button>
  );
}
