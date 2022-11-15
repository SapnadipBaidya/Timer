import React, { Fragment, useEffect, useState } from "react";

function Timer() {
  let [time, setTime] = useState();
  let [mins, setMins] = useState();
  let [secs, setSecs] = useState();

  let handleMins = (e) => {
    setMins(e);
  };
  let handleSecs = (e) => {
    setSecs(e);
  };
  let [onlySecs, SetOnlySecs] = useState();
  let handleStart = () => {
    setTime(mins + ":" + secs);
    SetOnlySecs(toSecsOnly(mins, secs));
  };
  let handleReset=()=>{
    setTime("00:00");
    SetOnlySecs(0);
    setMins("");
    setSecs("")
  }

  function secsToMinsSecs(secs) {
    let mins = Math.floor(secs / 60).toString();
    let seconds = Number(
      ((secs / 60 - mins).toFixed(2) * 60).toFixed(0)
    ).toString();

    return {
      minute: (() => {
        if (mins?.length !== 1) {
          return mins;
        }
        if (mins?.length === 1) {
          return "0" + mins;
        }
      })(),
      seconds: (() => {
        if (seconds?.length !== 1) {
          return seconds;
        }
        if (seconds?.length === 1) {
          return "0" + seconds;
        }
      })()
    };
  }

  function toSecsOnly(mins, secs) {
    let minTosec = mins * 60;
    return Number(minTosec) + Number(secs);
  }

  useEffect(() => {
    if (onlySecs > 0) {
      let interval = setInterval(() => {
        SetOnlySecs(onlySecs - 1);
        let timeinMMSS = secsToMinsSecs(onlySecs);
        setTime(timeinMMSS.minute + ":" + timeinMMSS.seconds);
      }, 1000);
      return () => clearInterval(interval);
    }
    if (onlySecs === 0) {
      setTime("00:00");
    }
  }, [onlySecs]);
  return (
    <Fragment>
      <label>
        <input type="number" onChange={(e) => handleMins(e.target.value)} value={mins}/>
        Minutes
      </label>
      <label>
        <input type="number" onChange={(e) => handleSecs(e.target.value)} value={secs}/>
        Seconds
      </label>

      <button onClick={handleStart}>START</button>
      <button>PAUSE / RESUME</button>
      <button onClick={handleReset}>RESET</button>

      {time ? (
        <h1 data-testid="running-clock">{time}</h1>
      ) : (
        <h1 data-testid="running-clock">00:00</h1>
      )}
    </Fragment>
  );
}

export default Timer;
