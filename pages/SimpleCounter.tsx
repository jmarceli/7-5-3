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
  const [isPlaying, setIsPlaying] = useState(false);

  const play = () => setIsPlaying(true);

  useEffect(() => {
    if (isPlaying) {
      audio.currentTime = 0;
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying, audio]);

  useEffect(() => {
    audio.addEventListener("ended", () => setIsPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setIsPlaying(false));
    };
  });

  // see https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/hooks/#custom-hooks
  return [isPlaying, play] as const;
};

export default function SimpleCounter({ title, timeout }: Props) {
  const counterRef = useRef<Countdown>(null);
  const [startTime, setStartTime] = useState(Date.now() + timeout);
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);
  const [_isPlaying, play] = useAudio();

  const handleStartClick = (): void => {
    if (!counterRef.current?.getApi().isPaused()) {
      // if completed start from the beginning
      setStartTime(Date.now() + timeout);
    }
    counterRef.current?.getApi().start();
  };

  const handlePauseClick = (): void => {
    counterRef.current?.getApi().pause();
  };

  const handleResetClick = (): void => {
    counterRef.current?.getApi().pause();
    setStartTime(Date.now() + timeout);
  };

  const handleUpdate = (): void => {
    forceUpdate();
  };

  const handleComplete = (): void => {
    play();
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
