import { useRef, useState, useReducer } from "react";
import Countdown from "react-countdown";

type Props = {
  title: string;
  timeout: number;
};

export default function SimpleCounter({ title, timeout }: Props) {
  const counterRef = useRef<Countdown>(null);
  const [startTime, setStartTime] = useState(Date.now() + timeout);
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);

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
  return (
    <>
      <h3>{title}</h3>
      <Countdown
        ref={counterRef}
        date={startTime}
        onStart={handleUpdate}
        onPause={handleUpdate}
        onComplete={handleUpdate}
        autoStart={false}
        precision={2}
      />
      <div className="buttons">
        <button
          type="button"
          onClick={handleStartClick}
          disabled={counterRef.current?.getApi().isStarted()}
        >
          Start
        </button>{" "}
        <button
          type="button"
          onClick={handlePauseClick}
          disabled={
            counterRef.current?.getApi().isPaused() ||
            !counterRef.current?.getApi().isStarted()
          }
        >
          Pause
        </button>{" "}
        <button type="button" onClick={handleResetClick}>
          Reset
        </button>
      </div>
    </>
  );
}
