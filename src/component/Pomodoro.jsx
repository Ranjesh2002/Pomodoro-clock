import { useState, useEffect } from "react";

const Pomodoro = () => {
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isWorkTime, setIsWorkTime] = useState(true);
  const [roundsCompleted, setRoundsCompleted] = useState(0);

  useEffect(() => {
    let interval = null;

    if (isActive && !isPaused && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      clearInterval(interval);
      if (isWorkTime) {
        setTime(5 * 60); // Break time
        setIsWorkTime(false);
      } else {
        setTime(25 * 60); // Work time
        setIsWorkTime(true);
        setRoundsCompleted((prevRounds) => prevRounds + 1);
      }
    }

    return () => clearInterval(interval);
  }, [isActive, isPaused, time, isWorkTime]);

  const startTimer = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const pauseTimer = () => {
    setIsPaused(true);
  };

  const resumeTimer = () => {
    setIsPaused(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsPaused(false);
    setTime(25 * 60);
    setIsWorkTime(true);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-teal-600 text-white">
      {/* Timer Circle */}
      <div className="w-64 h-64 rounded-full bg-gray-800 flex items-center justify-center shadow-2xl shadow-black/50 mb-10">
        <span className="text-5xl font-bold tracking-wider">
          {formatTime(time)}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-xl mb-8">
        {isWorkTime ? "Click start for work time" : "Its break time"}
      </h1>

      {/* Buttons */}
      <div className="flex flex-wrap justify-center gap-4 w-full max-w-md">
        <button
          onClick={startTimer}
          className="px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:scale-105 transition-transform"
        >
          Start
        </button>
        <button
          onClick={pauseTimer}
          className="px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:scale-105 transition-transform"
        >
          Pause
        </button>
        <button
          onClick={resumeTimer}
          className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:scale-105 transition-transform"
        >
          Resume
        </button>
        <button
          onClick={resetTimer}
          className="px-6 py-3 bg-orange-500 text-white font-bold rounded-lg hover:scale-105 transition-transform"
        >
          Reset
        </button>
      </div>

      {/* Pomodoro Counts */}
      <div className="mt-8 flex flex-col items-center animate-fade-in">
        <span className="text-5xl font-bold">{roundsCompleted}</span>
        <p className="text-xl font-semibold">Pomodoro Completed</p>
      </div>
    </div>
  );
};

export default Pomodoro;
