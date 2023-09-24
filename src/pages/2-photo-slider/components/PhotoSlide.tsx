import { useEffect, useState } from "react";
import slidePhotos from "../assets";
import EyeClosedIcon from "../assets/EyeClosedIcon";
import EyeOpenIcon from "../assets/EyeOpenIcon";

type Props = {
  autoplay?: boolean;
  interval?: number;
};

function PhotoSlide(props: Props) {
  const { autoplay = true, interval = 3 } = props;
  const [index, setIndex] = useState(slidePhotos.length - 1);
  const [preview, setPreview] = useState(false);

  // helper funcs
  const getElements = () => {
    const el: HTMLDivElement[] = [
      ...document.querySelectorAll(`[data-name="photo-slide"]`),
    ] as HTMLDivElement[];
    return el;
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
    const photos = getElements(); // all images
    const topmostPhoto = photos[index];
    const nextPhoto = photos[nextIndex(forward, nxtIndex)];

    // stack photos
    topmostPhoto.style.zIndex = "20";
    nextPhoto.style.zIndex = "10";
    nextPhoto.style.transform = "translateX(0)";

    photos.forEach((car, i) => {
      if (i !== index && i !== nextIndex(forward, nxtIndex)) {
        car.style.zIndex = "1";
        car.style.transform = "translateX(0)";
      }
    });

    slide(topmostPhoto, forward);

    setTimeout(() => {
      setIndex(nextIndex(forward, nxtIndex));
    }, 700);
  }

  // auto play effect...
  useEffect(() => {
    if (!autoplay) return;

    const _interval = setInterval(() => {
      stack(true);
    }, interval * 1000);

    return () => clearInterval(_interval);
  }, [index, interval, autoplay]);

  return (
    <div className="relative aspect-video text-white overflow-hidden">
      {/* carousel header */}
      <h2 className="absolute top-2 left-2 z-50 flex items-center gap-2 bg-slate-900/40 px-3 py-1 text-white font-bold rounded-full">
        {/* aesthetics dot */}
        <span className="bg-green-400 h-2 w-2 rounded-full" />

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
            data-name="photo-slide"
            className={`absolute aspect-video ${
              i === index && "duration-700 transition-transform ease-in-out"
            }`}
            key={i}
          >
            <img
              className="w-full h-full rounded-[inherit]"
              src={img.src}
              alt="family photo slide"
            />
          </div>
        );
      })}

      {/* buttons wrapper */}
      <div>
        <button
          className="absolute z-20 left-2 top-[50%] bg-slate-900/40 border rounded-full h-8 w-8 text-sm"
          onClick={() => stack(false)}
        >
          {"<"}
        </button>

        <button
          className="absolute z-20 right-2 top-[50%] bg-slate-900/40 border rounded-full h-8 w-8 text-sm"
          onClick={() => stack(true)}
        >
          {">"}
        </button>
      </div>

      {/* indicator && thumbnail wrapper*/}
      <div className="absolute left-0 right-0 bottom-[0] z-20">
        <div className="flex overflow-x-auto w-max max-w-[90%] mx-auto py-2">
          {slidePhotos.map((img, i) => {
            return preview ? (
              <button
                key={i}
                className={i === index ? "opacity-100" : "opacity-50"}
                onClick={() => stack(true, i)}
              >
                <img src={img.src} className="h-9 w-16 min-w-[64px]" />
              </button>
            ) : (
              <button
                key={i + 1}
                onClick={() => stack(true, i)}
                className={`inline-block border h-2 w-2 mx-1.5 rounded-full ${
                  i === index
                    ? "bg-white border-slate-900 scale-150"
                    : "bg-slate-900"
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PhotoSlide;
