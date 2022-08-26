/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from "react";
import "./assets/css/style.css";

function App() {
  const [breakLength, setBreakLength] = useState(5 * 60);
  const [sessionLength, setSessionLength] = useState(25 * 60);
  const [timer, setTimer] = useState(sessionLength);
  const [timerStatus, setTimerStatus] = useState(false);
  const [title, setTitle] = useState("Session");
  const alarm = document.getElementById("beep");

  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time - minutes * 60;
    return (
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds)
    );
  };

  const encrease = (value) => {
    if (timerStatus === false && timer === sessionLength) {
      if (value === "break") {
        if (breakLength < 3600) {
          setBreakLength(breakLength + 60);
        }
      } else {
        if (sessionLength < 3600) {
          setSessionLength(sessionLength + 60);
          setTimer(timer + 60);
        }
      }
    }
  };

  const decrease = (value) => {
    if (timerStatus === false && timer === sessionLength) {
      if (value === "break") {
        if (breakLength > 60) {
          setBreakLength(breakLength - 60);
        }
      } else {
        if (sessionLength > 60) {
          setSessionLength(sessionLength - 60);
          setTimer(timer - 60);
        }
      }
    }
  };

  const timeout = setTimeout(() => {
    if (timer && timerStatus) {
      setTimer(timer - 1);
    }
  }, 1000);

  const reset = () => {
    clearTimeout(timeout);
    setTimerStatus(false);
    setTimeout(() => {
      setSessionLength(25 * 60);
      setBreakLength(5 * 60);
      setTimer(25 * 60);
      setTitle("Session");      
      alarm.pause();
      alarm.currentTime = 0;
    }, 1000);
  };

  const playStop = () => {
    clearTimeout(timeout);
    setTimerStatus(!timerStatus);
    alarm.pause();
  };

  const playSound = () => {
    alarm.currentTime = 0;
    alarm.volume = 0.5;
    alarm.play();
    setTimeout(() => {
      alarm.pause();
    }, 5000);
  };

  const changeTimer = () => {
    if (!timer && title === "Session") {
      playSound();
      setTimer(breakLength);
      setTitle("Break");
    }
    if (!timer && title === "Break") {      
      playSound();
      setTimer(sessionLength);
      setTitle("Session");
    }
  };

  const stopwatch = () => {
    if (timerStatus) {
      timeout;
      changeTimer();
    } else {
      clearTimeout(timeout);
    }
  };

  useEffect(() => {
    stopwatch();
  }, [timerStatus, timer, timeout]);

  const changeMode = () => {
    document.getElementById("App").classList.toggle("dark-mode");
  };

  return (
    <div id="App">
      <button id="mode" onClick={changeMode}>
        &#128161;
      </button>
      <h1>25 + 5 Clock</h1>
      <div className="intervals">
        <div id="length">
          <div className="break">
            <h3 id="break-label">Break Length</h3>
            <div>
              <button
                id="break-decrement"
                className="btn plus-minus"
                onClick={() => decrease("break")}
              >
                -
              </button>
              <span id="break-length">{Math.round(breakLength / 60)}</span>
              <button
                id="break-increment"
                className="btn plus-minus"
                onClick={() => encrease("break")}
              >
                +
              </button>
            </div>
          </div>
          <div className="session">
            <h3 id="session-label">Session Length</h3>
            <div>
              <button
                id="session-decrement"
                className="btn plus-minus"
                onClick={() => decrease("session")}
              >
                -
              </button>
              <span id="session-length">{Math.round(sessionLength / 60)}</span>
              <button
                id="session-increment"
                className="btn plus-minus"
                onClick={() => encrease("session")}
              >
                +
              </button>
            </div>
          </div>
        </div>
        <div className="timer">
          <h2 id="timer-label">{title}</h2>
          <span id="time-left">{formatTime(timer)}</span>
          <div id="timer-btns">
            <button id="start_stop" className="btn" onClick={playStop}>
              &#9655;&#2405;
            </button>
            <button id="reset" className="btn" onClick={reset}>
              &#8635;
            </button>
          </div>
        </div>
      </div>
      <audio
        id="beep"
        preload="auto"
        src="https://assets.mixkit.co/sfx/preview/mixkit-classic-alarm-995.mp3"
      />
    </div>
  );
}

export default App;
