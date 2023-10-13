import { useEffect, useRef, useState } from "react";
import slideShowPhotos from "../assets";

type Props = {
  interval?: number;
  id?: string;
};

function Photoslideshow(props: Props) {
  const { interval = 3, id = "addId" } = props;

  //   local state .....
  const [index, setIndex] = useState(slideShowPhotos.length - 1);
  const [showThumbs, setShowThumbs] = useState(true);
  const [play, setplay] = useState(true);
  const [inView, setInView] = useState(false);

  const observer = useRef<null | IntersectionObserver>(null);

  // helper funcs
  const getElements = (dataname: string = "photo-slideshow") => {
    const el: HTMLDivElement[] = [
      ...document.querySelectorAll(`[data-name="${dataname + id}"]`),
    ] as HTMLDivElement[];
    return el;
  };

  const nextIndex = (forward: boolean, nextIndex?: number) => {
    let idx: number;
    if (typeof nextIndex === "number") {
      idx =
        nextIndex < 0 || nextIndex > slideShowPhotos.length - 1 ? 0 : nextIndex;
    } else {
      if (forward) {
        idx = index + 1 <= slideShowPhotos.length - 1 ? index + 1 : 0;
      } else {
        idx = index - 1 >= 0 ? index - 1 : slideShowPhotos.length - 1;
      }
    }
    return idx;
  };

  // returns a css media query class
  function animationClass() {
    const animationClasses = ["slitVertical", "slitHorizontal", "slitDiagonal"];
    return animationClasses[Math.floor(Math.random() * 3)];
  }

  // photo stacker (re-stacks the image)
  function stack(forward: boolean, nxtIndex?: number) {
    if (index === nxtIndex) return;

    const Babies = getElements(); // all images
    const topmostBaby = Babies[index];
    const nextBaby = Babies[nextIndex(forward, nxtIndex)];

    const animation = animationClass();

    nextBaby.classList.add(animation);
    nextBaby.style.zIndex = "15";
    topmostBaby.style.zIndex = "5";

    Babies.forEach((car, i) => {
      if (i !== index && i !== nextIndex(forward, nxtIndex))
        car.style.zIndex = "1";
    });

    setTimeout(() => {
      nextBaby.classList.remove(animation);
    }, 350);

    setIndex(nextIndex(forward, nxtIndex));
  }

  // effect sets up an observer instance
  useEffect(() => {
    const options = {
      threshold: 1.0,
    };

    observer.current = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, options);

    observer.current.observe(getElements("parent")[0]);

    return () => observer.current?.disconnect();
  }, []);

  //   effect scrolls current thumbnail into view
  useEffect(() => {
    if (!inView) return;
    const currentThumbnail = getElements("photo-slideshow-thumbnail")[index];

    currentThumbnail.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "center",
    });
  }, [index]);

  // auto play effect...
  useEffect(() => {
    if (!play) return;

    const intervalID = setInterval(() => {
      stack(true);
    }, interval * 1000);

    return () => clearInterval(intervalID);
  }, [play, interval, index]);

  return (
    <div data-name={`parent${id}`} className="relative aspect-video text-white">
      {/* carousel header */}
      <h2 className="absolute top-2 left-2 z-30 flex items-center gap-2 bg-slate-900/40 px-3 py-1 text-white font-bold rounded-full">
        {/* aesthetics dot */}
        <span className="bg-yellow-500 h-2 w-2 rounded-full" />

        {/* title */}
        <span className="italic text-xs">Photo Slideshow</span>
      </h2>

      {/* image wrapper */}
      {slideShowPhotos.map((img, i) => {
        return (
          <div
            data-name={`photo-slideshow${id}`}
            className="absolute top-0 bottom-0 aspect-video"
            key={i}
          >
            <img
              className="w-full h-full rounded-[inherit]"
              src={img.src}
              alt="photo slide show"
            />
          </div>
        );
      })}

      {/* thumbnails wrapper */}
      <div
        className={`absolute z-40 right-0 top-0 bottom-0 transition-all ${
          showThumbs ? "w-[200px]" : "w-[0%]"
        }`}
      >
        {/* open/close thumbnail panel button */}
        <button
          onClick={() => setShowThumbs(!showThumbs)}
          className={`absolute top-0 right-[100%] flex items-center justify-center h-9 w-6 bg-slate-900 font-light text-white/70 ${
            showThumbs ? "rotate-[0deg]" : "rotate-[180deg]"
          }`}
        >
          {">"}
        </button>

        {/* thumbnail imgs wrap */}
        <div className="grid grid-cols-2 place-content-start gap-1 bg-black/80 overflow-y-auto h-full">
          {slideShowPhotos.map((_, i) => {
            return (
              <div
                onClick={() => stack(true, i)}
                data-name={`photo-slideshow-thumbnail${id}`}
                className={`h-24 hover:opacity-100 hover:border-2 hover:border-white cursor-pointer ${
                  i === index
                    ? "opacity-100 border-2 border-white"
                    : "opacity-60"
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
        title={play ? "pause slideshow" : "play slideshow"}
        className="absolute z-30 left-2 bottom-1 bg-slate-900/40 order rounded-full h-10 w-10 text-xl"
        onClick={() => setplay(!play)}
      >
        {play ? "⏸️" : "▶️"}
      </button>
    </div>
  );
}

export default Photoslideshow;
