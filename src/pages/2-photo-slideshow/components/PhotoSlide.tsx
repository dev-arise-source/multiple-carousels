import { useEffect, useState } from "react";
import slideshowPhotos from "../assets";
import EyeClosedIcon from "../assets/EyeClosedIcon";
import EyeOpenIcon from "../assets/EyeOpenIcon";

type Props = {
  autoplay?: boolean;
  interval?: number;
};

function PhotoSlide(props: Props) {
  const { autoplay = true, interval = 3 } = props;
  const [index, setIndex] = useState(slideshowPhotos.length - 1);
  const [preview, setPreview] = useState(false);

  // helper funcs
  const getElements = () => {
    const cars: HTMLDivElement[] = [
      ...document.querySelectorAll(`[data-name="image-slideshow"]`),
    ] as HTMLDivElement[];
    return cars;
  };

  const nextIndex = (forward: boolean, nextIndex?: number) => {
    let idx: number;
    if (typeof nextIndex === "number") {
      idx =
        nextIndex < 0 || nextIndex > slideshowPhotos.length - 1 ? 0 : nextIndex;
    } else {
      if (forward) {
        idx = index + 1 <= slideshowPhotos.length - 1 ? index + 1 : 0;
      } else {
        idx = index - 1 >= 0 ? index - 1 : slideshowPhotos.length - 1;
      }
    }

    return idx;
  };

  // photo slider (applies sweep effect)
  function sweep(el: HTMLDivElement, forward: boolean) {
    const tranform = forward ? "translateX(100%)" : "translateX(-100%)";
    el.style.transform = tranform;
  }

  // photo stacker (re-stacks the image and calls fade)
  function slide(forward: boolean, nxtIndex?: number) {
    const cars = getElements(); // all images
    const topmostImage = cars[index];
    const nextImage = cars[nextIndex(forward, nxtIndex)];

    // stack photos
    topmostImage.style.zIndex = "20";
    nextImage.style.zIndex = "10";
    nextImage.style.transform = "translateX(0)";

    cars.forEach((car, i) => {
      if (i !== index && i !== nextIndex(forward, nxtIndex)) {
        car.style.zIndex = "1";
        car.style.transform = "translateX(0)";
      }
    });

    sweep(topmostImage, forward);

    setTimeout(() => {
      setIndex(nextIndex(forward, nxtIndex));
    }, 700);
  }

  // auto play effect...
  useEffect(() => {
    if (!autoplay) return;

    const _interval = setInterval(() => {
      slide(true);
    }, interval * 1000);

    return () => clearInterval(_interval);
  }, [index, interval, autoplay]);

  return (
    <div className="relative aspect-video text-white overflow-hidden">
      {/* carousel header */}
      <h2 className="absolute top-2 left-2 z-50 flex items-center gap-2 bg-slate-900/40 px-3 py-1 text-white font-bold rounded-full">
        {/* aesthetics dot */}
        <span className="bg-yellow-400 h-2 w-2 rounded-full" />

        {/* title */}
        <span className="italic text-xs">Photo SlideShow</span>

        {/* indicator btn */}
        <button onClick={() => setPreview(!preview)} className="opacity-100">
          {preview ? <EyeOpenIcon /> : <EyeClosedIcon />}
        </button>
      </h2>

      {/* image wrapper */}
      {slideshowPhotos.map((img, i) => {
        return (
          <div
            data-name="image-slideshow"
            className={`absolute aspect-video ${
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

      {/* buttons wrapper */}
      <div>
        <button
          className="absolute z-20 left-2 top-[50%] bg-slate-900/40 border rounded-full h-8 w-8 text-sm"
          onClick={() => slide(false)}
        >
          {"<"}
        </button>

        <button
          className="absolute z-20 right-2 top-[50%] bg-slate-900/40 border rounded-full h-8 w-8 text-sm"
          onClick={() => slide(true)}
        >
          {">"}
        </button>
      </div>

      {/* indicator wrapper */}
      <div className="absolute left-0 right-0 bottom-[0] z-20">
        <div className="flex overflow-x-auto w-max max-w-[90%] mx-auto py-2">
          {slideshowPhotos.map((img, i) => {
            return preview ? (
              <button
                key={i}
                className={i === index ? "opacity-100" : "opacity-50"}
                onClick={() => slide(true, i)}
              >
                <img src={img.src} className="h-9 w-16 min-w-[64px]" />
              </button>
            ) : (
              <button
                key={i + 1}
                onClick={() => slide(true, i)}
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
