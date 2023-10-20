import { useEffect, useRef, useState } from "react";
import gallery from "../../5-expandable-image-gallery/assets";
import SliderDetails from "./SliderDetails";
import product from "../assets";
import SliderImages from "./SliderImages";

type Props = {
  interval?: number;
  id?: string;
};

function Slider(props: Props) {
  const { interval = 3, id = "addId" } = props;
  const [index, setIndex] = useState(gallery.length - 1);
  const [play, setPlay] = useState(false);

  const carousel = useRef<null | HTMLDivElement>(null);

  //   helper funcs
  const getElements = (dataname: string = "expandable-gallery") => {
    const el: HTMLDivElement[] = [
      ...document.querySelectorAll(`[data-name="${dataname + id}"]`),
    ] as HTMLDivElement[];
    return el;
  };

  const nextIndex = (forward: boolean, nextIndex?: number) => {
    let idx: number;
    if (typeof nextIndex === "number") {
      idx = nextIndex < 0 || nextIndex > gallery.length - 1 ? 0 : nextIndex;
    } else {
      if (forward) {
        idx = index + 1 <= gallery.length - 1 ? index + 1 : 0;
      } else {
        idx = index - 1 >= 0 ? index - 1 : gallery.length - 1;
      }
    }

    return idx;
  };

  function handleExpand(index: number) {
    stack(true, index);
  }

  // photo stacker (re-stacks the image and calls slide)
  function stack(forward: boolean, nxtIndex?: number) {
    const NEXT_INDEX = nextIndex(forward, nxtIndex);
    const photos = getElements(); // all images
    const photoInView = photos[index];
    const nextPhoto = photos[NEXT_INDEX];

    function getDirection() {
      let dir: "left" | "right";
      if (typeof nxtIndex === "number") {
        const isForward = NEXT_INDEX > index;
        dir = isForward ? "right" : "left";
      } else {
        dir = forward ? "right" : "left";
      }
      return dir;
    }

    // reset stack
    photoInView.style.zIndex = "20";
    photos.forEach((el, i) => {
      if (i !== index) {
        el.style.zIndex = "1";
      }
      el.style.left = "0";
      el.classList.remove("transition_5");
      el.classList.add("noTransition_5");
      el.style.transform = "translateX(0)";
    });

    // re-arrange stack
    if (getDirection() === "right") nextPhoto.style.left = "100%";
    else nextPhoto.style.left = "-100%";
    nextPhoto.style.zIndex = "10";

    // slide photos
    function slide() {
      photos.forEach((el) => {
        el.classList.remove("noTransition_5");
        el.classList.add("transition_5");
        if (getDirection() === "right")
          el.style.transform = "translateX(-100%)";
        else el.style.transform = "translateX(100%)";
      });
    }

    setTimeout(() => {
      slide();
    }, 0);

    setIndex(NEXT_INDEX);
  }

  useEffect(() => {
    if (!play) return;

    const intervalID = setInterval(() => {
      stack(true);
    }, interval * 1000);

    return () => clearInterval(intervalID);
  }, [play, interval, index]); // auto play effect...

  return (
    <section className="flex flex-col min-[550px]:flex-row relative w-[95%] max-w-3xl mx-auto">
      {/* carousel tag */}
      <h2 className="absolute top-2 left-2 z-30 flex items-center gap-2 bg-black/10 px-3 py-1 font-bold rounded-full">
        {/* aesthetics dot */}
        <span className="bg-yellow-500 h-2 w-2 rounded-full" />

        {/* title */}
        <span className="italic text-xs">Add To Cart Slider</span>
      </h2>

      {/* slider images component here */}
      <SliderImages images={product.images} />

      {/* slider details component here */}
      <SliderDetails product={product} />
    </section>
  );
}

export default Slider;
