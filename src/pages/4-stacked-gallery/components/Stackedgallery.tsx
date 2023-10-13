import { useEffect, useRef, useState } from "react";
import useSwipe from "../assets/useSwipe";
import gallery from "../assets";
import useClickOnce from "../assets/useClickOnce";

type Props = {
  interval?: number;
  id?: string;
};

function Stackedgallery(props: Props) {
  const { interval = 3, id = "addId" } = props;
  const [index, setIndex] = useState(gallery.length - 1);
  const [play, setPlay] = useState(false);
  const carousel = useRef(null);
  const dir = useSwipe(carousel, 280);
  const clickonce = useClickOnce(500);

  //   helper funcs
  const getElements = (dataname: string = "stacked-gallery") => {
    const el: HTMLDivElement[] = [
      ...document.querySelectorAll(`[data-name="${dataname + id}"]`),
    ] as HTMLDivElement[];
    return el;
  };
  const nextIndex = (forward: boolean) => {
    let idx: number;
    if (forward) {
      idx = index + 1 <= gallery.length - 1 ? index + 1 : 0;
    } else {
      idx = index - 1 >= 0 ? index - 1 : gallery.length - 1;
    }
    return idx;
  };
  function getSize(
    type: "height" | "width",
    index = gallery.length - 1,
    minSize = 70,
    totalItems = gallery.length
  ) {
    let remainingSize = 100 - minSize;
    let increment = remainingSize / (totalItems - 1);

    return type === "width"
      ? 100 - index * increment
      : minSize + index * increment;
  }

  function stack(forward: boolean) {
    const photos = getElements(); // all images
    const nxtIndex = nextIndex(forward); // next image index

    const topmostPhoto = photos[index];
    const nextPhoto = photos[nxtIndex];

    let prevSizes = photos.map((p, i) => {
      let width = p.style.width,
        height = p.style.height,
        zIndex = p.style.zIndex;

      if (i !== index && i !== nxtIndex) p.style.width = `${getSize("width")}%`;
      else p.style.width = "0";

      return { width, height, zIndex };
    });

    setTimeout(() => {
      nextPhoto.style.zIndex = "10";
      topmostPhoto.style.zIndex = prevSizes[nxtIndex].zIndex;

      nextPhoto.style.width = `${getSize("width")}%`;
      nextPhoto.style.height = `${getSize("height")}%`;

      topmostPhoto.style.width = prevSizes[nxtIndex].width;
      topmostPhoto.style.height = prevSizes[nxtIndex].height;

      photos.forEach((p, i) => {
        if (i !== index && i !== nxtIndex) p.style.width = prevSizes[i].width;
      });
    }, 300);

    setIndex(nxtIndex);
  } // photo stacker (re-stacks and resize the images)

  useEffect(() => {
    if (!play) return;

    const intervalID = setInterval(() => {
      stack(true);
    }, interval * 1000);

    return () => clearInterval(intervalID);
  }, [play, interval, index]); // auto play effect...

  useEffect(() => {
    if (dir === "Left" || dir === "Right") {
      dir === "Left"
        ? clickonce(() => {
            stack(false);
          })
        : clickonce(() => {
            stack(true);
          });
    }
  }, [dir]); // swipe efffect

  return (
    <section
      ref={carousel}
      style={{ backgroundImage: `url(${gallery[index].src})` }}
      className="relative flex flex-col justify-center items-center bg-bottom bg-cover w-full text-white px-[50px] py-3"
    >
      {/* carousel tag */}
      <h2 className="absolute top-2 left-2 z-30 flex items-center gap-2 bg-white/10 px-3 py-1 text-white font-bold rounded-full">
        {/* aesthetics dot */}
        <span className="bg-red-500 h-2 w-2 rounded-full" />

        {/* title */}
        <span className="italic text-xs">Stacked Gallery</span>
      </h2>

      {/* title and pause/play btn */}
      <div className="relative z-10 flex items-center py-6">
        {/* title */}
        <h2 className="text-xl font-[Lobster] md:text-3xl">Discover Italy </h2>

        {/*pause/play slideshow button */}
        <button
          title={play ? "pause slideshow" : "play slideshow"}
          className="bg-slate-900/40 h-10 w-10 text-base md:text-xl"
          onClick={() => setPlay(!play)}
        >
          {play ? "⏸️" : "▶️"}
        </button>
      </div>

      {/* linear gradient background */}
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800/50" />

      {/* ......carousel container..... */}
      <div className="relative flex justify-center items-center w-full max-w-2xl h-44 xs:h-56 sm:h-72 md:h-80 text-white">
        {/* image wrapper */}
        {gallery.map((img, i) => {
          return (
            <div
              style={{
                zIndex: i + 1,
                height: `${getSize("height", i)}%`,
                width: `${getSize("width", i)}%`,
              }}
              data-name={`stacked-gallery${id}`}
              className="absolute h-full rounded-3xl ease-linear duration-300 transition-[width]"
              key={i}
            >
              <img
                className="w-full h-full rounded-[inherit] object-fill"
                src={img.src}
                alt="stacked image gallery"
              />
            </div>
          );
        })}

        {/*arrow buttons wrapper */}
        <div>
          <button
            className="absolute z-20 -left-11 top-[50%] bg-slate-900/40 hover:bg-white/20 transition-colors border rounded-full h-8 w-8 text-sm"
            onClick={() =>
              clickonce(() => {
                stack(false);
              })
            }
          >
            {"<"}
          </button>

          <button
            className="absolute z-20 -right-11 top-[50%] bg-slate-900/40 hover:bg-white/20 transition-colors border rounded-full h-8 w-8 text-sm"
            onClick={() =>
              clickonce(() => {
                stack(true);
              })
            }
          >
            {">"}
          </button>
        </div>
      </div>

      {/* tail */}
      <div className="relative max-w-2xl -mt-16 mb-9 border-b-slate-300 border-b-[3px] py-11 xs:py-12 sm:py-14 w-full rounded-[50%] h-full text-center">
        <span className="absolute left-[50%] translate-y-[-50%] translate-x-[-50%] top-[100%] flex justify-center items-center rounded-full h-7 w-7 bg-slate-300 text-black text-xs">
          {index + 1}/6
        </span>
      </div>
    </section>
  );
}

export default Stackedgallery;
