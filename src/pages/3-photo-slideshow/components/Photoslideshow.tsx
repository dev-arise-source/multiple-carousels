import { useEffect, useState } from "react";
import slidePhotos from "../assets";
import EyeClosedIcon from "../assets/EyeClosedIcon";
import EyeOpenIcon from "../assets/EyeOpenIcon";

type Props = {
  autoplay?: boolean;
  interval?: number;
};

function Photoslideshow(props: Props) {
  const { autoplay = true, interval = 3 } = props;

  //   local state
  const [index, setIndex] = useState(slidePhotos.length - 1);
  const [showThumbs, setShowThumbs] = useState(true);
  const [play, setplay] = useState(false);

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

  useEffect(() => {
    const currentElementDisplayed = getElements()[index];
    currentElementDisplayed.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "center",
    });
  }, [index]);

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
      <h2 className="absolute top-2 left-2 z-30 flex items-center gap-2 bg-slate-900/40 px-3 py-1 text-white font-bold rounded-full">
        {/* aesthetics dot */}
        <span className="bg-blue-400 h-2 w-2 rounded-full" />

        {/* title */}
        <span className="italic text-xs">Photo Slideshow</span>
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

      {/* thumbnails wrapper */}
      <div
        className={`absolute z-30 right-0 top-0 bottom-0 transition-all  ${
          showThumbs ? "w-[200px]" : "w-[0%]"
        }`}
      >
        {/* open/close thumbnails */}
        <button
          onClick={() => setShowThumbs(!showThumbs)}
          className={`absolute top-0 right-[100%] flex items-center justify-center h-9 w-6 bg-slate-900 font-light text-white/70 ${
            showThumbs ? "rotate-[0deg]" : "rotate-[180deg]"
          }`}
        >
          {">"}
        </button>

        {/* thumbnail imgs wrap */}
        <div className="grid grid-cols-2 place-content-start gap-1 bg-black/60 overflow-y-auto h-full">
          {slidePhotos.map((_, i) => {
            return (
              <div
                className={`h-24 opacity-60 hover:opacity-100 hover:border-2 hover:border-white ${
                  i === index && "opacity-100"
                }`}
                key={i}
              >
                <img className="object-cover h-full w-full" src={_.src} />
              </div>
            );
          })}
        </div>
      </div>

      {/*pause/play slideshow button */}
      <button
        title={play ? "" : ""}
        className="absolute z-20 left-2 bottom-0 bg-slate-900/40 order rounded-full h-10 w-10 text-xl"
        onClick={() => setplay(!play)}
      >
        {play ? "⏸️" : "▶️"}
      </button>
    </div>
  );
}

export default Photoslideshow;

//   {
//     /* indicator && thumbnail wrapper */
//   }
//   <div className="absolute left-0 right-0 bottom-[0] z-20">
//     <div className="flex overflow-x-auto w-max max-w-[90%] mx-auto py-2">
//       {slidePhotos.map((img, i) => {
//         return preview ? (
//           <button
//             key={i}
//             className={i === index ? "opacity-100" : "opacity-50"}
//             // onClick={() => stack(true, i)}
//           >
//             <img src={img.src} className="h-9 w-16 min-w-[64px]" />
//           </button>
//         ) : (
//           <button
//             key={i + 1}
//             // onClick={() => stack(true, i)}
//             className={`inline-block border h-2 w-2 mx-1.5 rounded-full ${
//               i === index
//                 ? "bg-white border-slate-900 scale-150"
//                 : "bg-slate-900"
//             }`}
//           />
//         );
//       })}
//     </div>
//   </div>;
