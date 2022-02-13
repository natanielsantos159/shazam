import { useEffect, useContext, useState } from "react";
import MicRecorder from "mic-recorder-to-mp3";
import identifySong from "./services/identifySongApi";
import iTunesSearchApi from "./services/iTunesSearchApi";
import AppContext from "./context/AppContext";
import RecordButton from "./components/RecordButton";

import "./App.css";
import IdentifiedSongCard from "./components/IdentifiedSongCard";
import MicVisualizer from "./components/MicVisualizer";

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

function App() {
  const {
    isRecording,
    setIsRecording,
    setIdentifiedSong,
    identifiedSong,
    count,
    setCount,
    identified,
    setIdentified,
  } = useContext(AppContext);
  const [stream, setStream] = useState()

  const recognizeSong = async (file) => {
    const { data, identified: indentifiedBool } = await identifySong(file);
    setIdentified(indentifiedBool);
    if (indentifiedBool) {
      setIdentifiedSong(data);
      if (!data.artwork) {
        const artwork = await iTunesSearchApi(data);
        setIdentifiedSong({ ...data, artwork });
      }
    }
  };

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
      .then(([buffer, blob]) => {
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
    <div className="App">
      <div className={`microphone-container ${identified && identifiedSong ? "identified" : ''}`}>
        <RecordButton
          stopRecording={stopRecording}
          startRecording={startRecording}
        />
        <MicVisualizer stream={stream} />
        <div className="state">
          {isRecording && "Escutando..."}
          {(identified === false && !isRecording) && "Não foi possível identificar essa música :/"}    
        </div>
      </div>
      {identified && identifiedSong && <IdentifiedSongCard />}
    </div>
  );
}

export default App;
