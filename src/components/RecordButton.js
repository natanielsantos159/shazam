import React, { useContext, useEffect } from "react";
import AppContext from "../context/AppContext";
import microphoneIcon from "../images/microphone2.png";
import MicRecorder from "mic-recorder-to-mp3";
import identifySong from "../services/identifySongApi";
import iTunesSearchApi from "../services/iTunesSearchApi";
import '../styles/RecordButton.css';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

export default function RecordButton() {
  const { 
    isRecording, 
    setIsRecording,
    setIdentifiedSong,
    setIdentified,
    setItunesUrl,
    setIdentifying,
    setStream,
    setCount,
    count,
  } = useContext(AppContext);

  useEffect(() => {
    let timer;
    if (isRecording && count < 10) {
      timer = setInterval(() => {
        setCount(count + 1);
      }, 1000);
    }
    if (isRecording && count >= 10) stopRecording();
    return () => clearInterval(timer);
  }, [count]);

  const recognizeSong = async (file) => {
    setIdentifying(true);
    const { data, identified: indentifiedBool } = await identifySong(file);
    setIdentified(indentifiedBool);
    if (indentifiedBool) {
      setIdentifying(false);
      setIdentifiedSong(data);
      const { artwork, trackUrl } = await iTunesSearchApi(data);
      if (!data.artwork) setIdentifiedSong({ ...data, artwork });
      setItunesUrl(trackUrl);
    }
  };

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then(() => {
        Mp3Recorder.start()
          .then((stream) => {
            setIdentified(undefined)
            setStream(stream);
            setIsRecording(true);
            setCount(1);
          })
          .catch(console.error);
      });
  };

  const stopRecording = () => {
    setIsRecording(false);
    Mp3Recorder.stop()
      .getMp3()
      .then(([ , blob]) => {
        const file = new File([blob], "file.mp3", {
          type: blob.type,
        });
        if (file) recognizeSong(file);
        const track = Mp3Recorder.activeStream.getTracks()[0];
        track.stop();
        Mp3Recorder.activeStream.removeTrack(track);
      })
      .catch((e) => console.log(e));
  };

  return (
    <button
      type="button"
      onClick={isRecording ? stopRecording : startRecording}
      className={`record-button ${isRecording ? 'is-recording': ''}`}
    >
      <div className="card__content">
        <img src={microphoneIcon} alt="Identificar" />
      </div>
      <div className="blob"></div>
      <div className="blob"></div>
      <div className="blob"></div>
    </button>
  );
}
