import React, { useEffect, useState } from "react";
import RenderSounds, { soundPlay, soundStop } from "./sounds";
import volumeComponent from "./volumeComponent";
import "./App.css";
import SimpleModal from "./modal";
import logo from "./drunk_souls.png";
import test from "./track-03.mp3";
function App() {
  let startTime = parseInt(localStorage.getItem("timer")) || 120;
  let alarmDuration = localStorage.getItem("alarm") || 5;
  const [counter, setCounter] = useState(startTime);
  const [isStopped, setIsStopped] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(Math.floor(startTime / 60));
  //wywołanie funkcji z każdą zmianą countera
  useEffect(() => {
    if (!isStopped) {
      if (counter === startTime - alarmDuration) {
        soundStop();
      }
      if (counter === 5) {
        soundPlay(test);
      }

      if (counter > 0) {
        const timer = setTimeout(() => setCounter(counter - 1), 1000);
        return () => clearTimeout(timer);
      }

      if (counter === 0) {
        setCounter(startTime);
        soundPlay(document.getElementById("soundList").value);
      }
    }
  }, [counter, isStopped]);

  useEffect(() => {
    counterIntoTime();
  }, [counterIntoTime]);
  //Zamiana countera na sekundy i minuty
  function counterIntoTime() {
    if (counter >= 60) {
      setMinutes(Math.floor(counter / 60));
      setSeconds(counter - Math.floor(minutes * 60));
    } else {
      setMinutes(0);
      setSeconds(counter);
    }
  }

  //Zatrzymanie czasu spacją
  document.body.onkeyup = function (e) {
    if (e.keyCode === 32) {
      setIsStopped(!isStopped);
    }
  };
  return (
    <div className="App">
      <div>
        <img src={logo} alt=""></img>
      </div>
      <div className="margin">
        {volumeComponent()}
        {RenderSounds()}
        <div className="timerFontSize">
          Pozostały czas{" "}
          <div>
            {counter < 10 ? (
              <div style={{ color: "red" }}>0:0{seconds} </div>
            ) : seconds < 10 ? (
              minutes + ":" + "0" + seconds
            ) : (
              minutes + ":" + seconds
            )}
          </div>
        </div>
        <button
          onClick={() => {
            setCounter(counter + 10);
          }}
        >
          Dodaj 10
        </button>
        <button
          onClick={() => {
            counter < 10 ? setCounter(0) : setCounter(counter - 10);
          }}
        >
          Zabierz 10
        </button>
        <button
          onClick={() => {
            setIsStopped(!isStopped);
          }}
        >
          {isStopped ? "Wznów" : "Zatrzymaj"}
        </button>
        <button
          onClick={() => {
            setCounter(startTime);
          }}
        >
          Resetuj
        </button>
        {isStopped ? (
          <div style={{ color: "red", fontSize: 25 }}>Zatrzymano</div>
        ) : (
          ""
        )}
        <p></p>
        <div>{SimpleModal()}</div>
      </div>
    </div>
  );
}

export default App;
