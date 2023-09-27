import { useEffect, useRef, useState } from "react";

function useClickOnce(timeout = 1500) {
  const [startWaiting, setStartwaiting] = useState(false);
  const [clicked, setClicked] = useState(false);
  let func = useRef<() => void>();

  useEffect(() => {
    if (startWaiting || !clicked) return;

    func.current?.();

    setTimeout(() => {
      setClicked(false);
      setStartwaiting(false);
    }, timeout);

    setStartwaiting(true);
  }, [startWaiting, clicked]);

  return (callback: () => void) => {
    func.current = callback;
    setClicked(true);
  };
}

export default useClickOnce;
