import { Button, Typography } from "@mui/material";
import { useRef, useState, useReducer, useEffect } from "react";
import Countdown, { zeroPad } from "react-countdown";

const AUDIO_PATH = "/sound.mp3";
type Props = {
  title: string;
  timeout: number;
};

const useAudio = () => {
  const [audio, setAudio] = useState(new Audio(AUDIO_PATH));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing, audio]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  });

  return [playing, toggle];
};

export default function SimpleCounter({ title, timeout }: Props) {
  const counterRef = useRef<Countdown>(null);
  const [startTime, setStartTime] = useState(Date.now() + timeout);
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);
  const [playing, toggle] = useAudio();

  const handleStartClick = (): void => {
    console.log(counterRef.current?.getApi());
    counterRef.current?.getApi().start();
  };

  const handlePauseClick = (): void => {
    counterRef.current?.getApi().pause();
  };

  const handleResetClick = (): void => {
    setStartTime(Date.now() + timeout);
  };

  const handleUpdate = (): void => {
    forceUpdate();
  };

  const handleComplete = (): void => {
    toggle();
    forceUpdate();
  };

  return (
    <>
      <div className="countdown">
        <Countdown
          ref={counterRef}
          date={startTime}
          onStart={handleUpdate}
          onPause={handleUpdate}
          onComplete={handleComplete}
          autoStart={false}
          precision={2}
          renderer={({ hours, minutes, seconds, completed }) => (
            <Typography variant="h3">
              {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
            </Typography>
          )}
        />
      </div>
      <div className="buttons">
        <Button
          onClick={handleStartClick}
          variant="contained"
          color="success"
          disabled={counterRef.current?.getApi().isStarted()}
        >
          Start
        </Button>{" "}
        <Button
          onClick={handlePauseClick}
          variant="contained"
          disabled={
            counterRef.current?.getApi().isPaused() ||
            !counterRef.current?.getApi().isStarted()
          }
        >
          Pause
        </Button>{" "}
        <Button onClick={handleResetClick} color="error">
          Reset
        </Button>
      </div>
    </>
  );
}
