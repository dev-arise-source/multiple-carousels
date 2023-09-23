import { useState } from "react";
import slidePhotos from "../assets";
import EyeClosedIcon from "../assets/EyeClosedIcon";
import EyeOpenIcon from "../assets/EyeOpenIcon";
import { Props } from "./Photoslideshow";

export function Photoslideshow(props: Props) {
  const { autoplay = true, interval = 3 } = props;

  //   local state
  const [index, setIndex] = useState(slidePhotos.length - 1);
  const [preview, setPreview] = useState(false);

  // helper funcs
  const getElements = () => {
    const cars: HTMLDivElement[] = [
      ...document.querySelectorAll(`[data-name="photo-slideshow"]`),
    ] as HTMLDivElement[];
    return cars;
  };

  const nextIndex = (forward: boolean, nextIndex?: number) => {
    let idx: number;
    if (typeof nextIndex === "number") {
      idx = nextIndex < 0 || nextIndex > slidePhotos.length - 1 ? 0 : nextIndex;
    } else {
      if (forward) {
        idx = index + 1 <= slidePhotos.length - 1 ? index + 1 : 0;
      } else {
        idx = index - 1 >= 0 ? index - 1 : slidePhotos.length - 1;
      }
    }

    return idx;
  };

  // photo slider (applies slide effect)
  function slide(el: HTMLDivElement, forward: boolean) {
    const tranform = forward ? "translateX(100%)" : "translateX(-100%)";
    el.style.transform = tranform;
  }

  // photo stacker (re-stacks the image and calls slide)
  function stack(forward: boolean, nxtIndex?: number) {
    const cars = getElements(); // all images
    const topmostImage = cars[index];
    const nextImage = cars[nextIndex(forward, nxtIndex)];

    topmostImage.style.zIndex = "20";
    nextImage.style.zIndex = "10";
    nextImage.style.transform = "translateX(0)";

    cars.forEach((car, i) => {
      if (i !== index && i !== nextIndex(forward, nxtIndex)) {
        car.style.zIndex = "1";
        car.style.transform = "translateX(0)";
      }
    });

    slide(topmostImage, forward);

    setTimeout(() => {
      setIndex(nextIndex(forward, nxtIndex));
    }, 700);
  }

  // auto play effect...
  //   useEffect(() => {
  //     if (!autoplay) return;
  //     const _interval = setInterval(() => {
  //       stack(true);
  //     }, interval * 1000);
  //     return () => clearInterval(_interval);
  //   }, [index, interval, autoplay]);
  return (
    <div className="relative flex aspect-video text-white">
      {/* carousel header */}
      <h2 className="absolute top-2 left-2 z-50 flex items-center gap-2 bg-slate-900/40 px-3 py-1 text-white font-bold rounded-full">
        {/* aesthetics dot */}
        <span className="bg-blue-400 h-2 w-2 rounded-full" />

        {/* title */}
        <span className="italic text-xs">Photo Slider</span>

        {/* indicator btn */}
        <button onClick={() => setPreview(!preview)} className="opacity-100">
          {preview ? <EyeOpenIcon /> : <EyeClosedIcon />}
        </button>
      </h2>

      {/* image wrapper */}
      {slidePhotos.map((img, i) => {
        return (
          <div
            data-name="photo-slideshow"
            className={`absolute top-0 bottom-0 aspect-video ${
              i === index && "duration-700 transition-transform ease-in-out"
            }`}
            key={i}
          >
            <img
              className="w-full h-full rounded-[inherit]"
              src={img.src}
              alt="family photo slide show"
            />
          </div>
        );
      })}

      {/* thumbnails */}
      <div
        className={`absolute right-0 top-0 bottom-0 transition-all oveflow-y-auto  ${
          preview ? "w-[200px]" : "w-[0%]"
        }`}
      >
        {/* close thumbnail */}
        <button
          onClick={() => setPreview(!preview)}
          className={`absolute top-0 right-[100%] flex items-center justify-center h-9 w-6 bg-slate-900 font-light text-white/70 ${
            preview ? "rotate-[0deg]" : "rotate-[180deg]"
          }`}
        >
          {">"}
        </button>

        <div className="grid grid-cols-2 gap-1 bg-white ">
          {slidePhotos.map((_, i) => {
            return (
              <div className="h-24" key={i}>
                <img className="object-cover h-full w-full" src={_.src} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
