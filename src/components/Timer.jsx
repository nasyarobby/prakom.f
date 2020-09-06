import React, { useState, useEffect } from "react";
export function formatTimer(timer) {
  if (timer > 24 * 3600) {
    return (
      Math.floor(timer / (24 * 3600)) +
      " jam " +
      formatTimer(timer % (24 * 3600))
    );
  }
  if (timer > 3600) {
    return Math.floor(timer / 3600) + " jam " + formatTimer(timer % 3600);
  }
  if (timer > 60) {
    return Math.floor(timer / 60) + " menit " + formatTimer(timer % 60);
  } else {
    return timer + " detik";
  }
}

export default function Timer({ start = true, ...props }) {
  const [timer, setTimer] = useState(props.seconds);

  useEffect(() => {
    if (start) {
      let interval = null;
      interval = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);
  return <span>{formatTimer(timer)}</span>;
}
