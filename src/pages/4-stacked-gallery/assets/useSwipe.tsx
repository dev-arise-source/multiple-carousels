import { useEffect, useState } from "react";

type Ref = React.MutableRefObject<any | null>;

function useSwipe(ref: Ref, threshold = 0) {
  const [dir, setDir] = useState<"Down" | "Up" | "Left" | "Right" | undefined>(
    undefined
  );

  //   functions
  function isTouchDevice() {
    try {
      document.createEvent("TouchEvent");
      //   console.log("touch");
      return true;
    } catch (e) {
      //   console.log("mouse");
      return false;
    }
  }
  function getEventType(type: "down" | "move" | "up") {
    let events = {
      mouse: {
        down: "mousedown",
        move: "mousemove",
        up: "mouseup",
      },
      touch: {
        down: "touchstart",
        move: "touchmove",
        up: "touchend",
      },
    };

    return isTouchDevice() ? events.touch[type] : events.mouse[type];
  }

  useEffect(() => {
    const touchEl = ref.current;
    if (!touchEl || !(touchEl as HTMLDivElement).tagName) return;
    const el = touchEl as HTMLDivElement;

    //Initial mouse X and Y positions are 0
    let mouseX: number,
      initialX = 0;
    let mouseY: number,
      initialY = 0;
    let isSwiped = false;

    //Get left and top of touchArea
    let rectLeft = el.getBoundingClientRect().left;
    let rectTop = el.getBoundingClientRect().top;

    //Get Exact X and Y position of mouse/touch
    const getXY = (e: Event) => {
      mouseX =
        (!isTouchDevice()
          ? (e as MouseEvent).pageX
          : (e as TouchEvent).touches[0].pageX) - rectLeft;

      mouseY =
        (!isTouchDevice()
          ? (e as MouseEvent).pageY
          : (e as TouchEvent).touches[0].pageY) - rectTop;
    };
    const downEvent = (event: Event) => {
      isSwiped = true;
      //Get X and Y Position
      getXY(event);
      initialX = mouseX;
      initialY = mouseY;
    };
    const moveEvent = (event: Event) => {
      if (!isTouchDevice()) {
        event.preventDefault();
      }
      if (isSwiped) {
        getXY(event);
        let diffX = mouseX - initialX;
        let diffY = mouseY - initialY;
        if (Math.abs(diffY) > Math.abs(diffX)) {
          setDir(diffY > threshold ? "Down" : "Up");
        } else {
          setDir(diffX > threshold ? "Right" : "Left");
        }
      }
    };
    const upEvent = () => {
      isSwiped = false;
    };

    //Start Swipe (mousedown / touchstart)
    el.addEventListener(getEventType("down"), downEvent);

    // while swiping (Mousemove / touchmove)
    el.addEventListener(getEventType("move"), moveEvent);

    //Stop Drawing (mouseup/touchend)
    el.addEventListener(getEventType("up"), upEvent);

    return () => {
      el.removeEventListener(getEventType("down"), downEvent);
      el.removeEventListener(getEventType("move"), moveEvent);
      el.removeEventListener(getEventType("up"), upEvent);
    };
  }, [ref]);

  return dir;
}

export default useSwipe;

// touchArea.addEventListener("mouseleave", () => {
//   isSwiped = false;
// });

// window.onload = () => {
//   isSwiped = false;
// };

// useEffect(() => {
//   let touchstartX = 0;
//   let touchendX = 0;

//   function checkDirection() {
//     if (touchendX < touchstartX) stack(false);
//     if (touchendX > touchstartX) stack(true);
//   }

//   document.addEventListener("touchstart", (e) => {
//     touchstartX = e.changedTouches[0].screenX;
//   });

//   document.addEventListener("touchend", (e) => {
//     touchendX = e.changedTouches[0].screenX;
//     checkDirection();
//   });

//   return () => {
//     //   document;
//   };
// }, []);
