import { useEffect, useState } from "react";
import sliseShowPhotos from "../../3-photo-slideshow/assets";

type Props = {
  interval?: number;
  id?: string;
};

function Stackedgallery(props: Props) {
  const { interval = 3, id = "addId" } = props;

  //   local state .....
  const [index, setIndex] = useState(5);

  //   helper funcs
  const getElements = (dataname: string = "photo-slideshow") => {
    const el: HTMLDivElement[] = [
      ...document.querySelectorAll(`[data-name="${dataname + id}"]`),
    ] as HTMLDivElement[];
    return el;
  };
  const nextIndex = (forward: boolean, nextIndex?: number) => {
    let idx: number;
    if (typeof nextIndex === "number") {
      idx = nextIndex < 0 || nextIndex > 6 - 1 ? 0 : nextIndex;
    } else {
      if (forward) {
        idx = index + 1 <= 6 - 1 ? index + 1 : 0;
      } else {
        idx = index - 1 >= 0 ? index - 1 : 6 - 1;
      }
    }
    return idx;
  };
  function getWidth(index: number, totalItems: number, minwidth = 70) {
    let remainingWidth = 100 - minwidth;
    let increment = remainingWidth / (totalItems - 1);
    return 100 - index * increment;
  }
  function getHeight(index: number, totalItems: number, minheight = 70) {
    let remainingHeight = 100 - minheight;
    let increment = remainingHeight / (totalItems - 1);
    let height = minheight + index * increment;

    return height;
  }

  // photo slider (applies slide effect)
  function slide(el: HTMLDivElement, forward: boolean) {
    const tranform = forward ? "translateX(150%)" : "translateX(-150%)";
    el.style.transform = tranform;
  }

  // photo stacker (re-stacks the image and calls slide)
  function stack(forward: boolean, nxtIndex?: number) {
    const photos = getElements(); // all images

    const topmostPhoto = photos[index];
    const nextPhoto = photos[nextIndex(forward, nxtIndex)];

    topmostPhoto.style.zIndex = "20"; //keep on top
    nextPhoto.style.width = `${getWidth(5, 6, 70)}%`;
    nextPhoto.style.height = `${getHeight(5, 6, 70)}%`;
    nextPhoto.style.zIndex = "10";
    topmostPhoto.style.width = "0";

    // stack photos

    setTimeout(() => {
      topmostPhoto.style.zIndex = `${nextIndex(forward, nxtIndex) + 1}`;

      topmostPhoto.style.width = `${getWidth(
        nextIndex(forward, nxtIndex),
        6,
        70
      )}%`;
      topmostPhoto.style.height = `${getHeight(
        nextIndex(forward, nxtIndex),
        6,
        70
      )}%`;

      photos.forEach((car, i) => {
        if (i !== index && i !== nextIndex(forward, nxtIndex)) {
          car.style.zIndex = `${i + 1}`;
          car.style.width = `${getWidth(i, 6, 70)}%`;
          car.style.height = `${getHeight(i, 6, 70)}%`;

          //   car.style.transform = "translateX(0)";
        }
      });

      setIndex(nextIndex(forward, nxtIndex));
    }, 500);

    return;

    topmostPhoto.style.zIndex = "20";

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
    const intervalID = setInterval(() => {
      //   stack(true);
    }, interval * 1000);

    return () => clearInterval(intervalID);
  }, [interval, index]);

  return (
    <section
      style={{ backgroundImage: `url(${sliseShowPhotos[index].src})` }}
      className="relative flex flex-col justify-center items-center bg-bottom bg-cover w-full text-white bg-slate-900 px-[50px] py-3"
    >
      {/* title and pause/play btn */}
      <div className="relative z-10 flex items-center py-6">
        {/* title */}
        <h2 className="text-xl font-[Lobster] md:text-3xl">Discover Italy </h2>

        {/*pause/play slideshow button */}
        <button
          title={true ? "pause slideshow" : "play slideshow"}
          className="bg-slate-900/40 h-10 w-10 text-base md:text-xl"
          // onClick={() => setplay(!play)}
        >
          {true ? "⏸️" : "▶️"}
        </button>
      </div>

      {/* carousel tag */}
      <h2 className="absolute top-2 left-2 z-30 flex items-center gap-2 bg-white/10 px-3 py-1 text-white font-bold rounded-full">
        {/* aesthetics dot */}
        <span className="bg-yellow-500 h-2 w-2 rounded-full" />

        {/* title */}
        <span className="italic text-xs">Stacked Gallery</span>
      </h2>

      {/* linear gradient background */}
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-slate-900 via-slate-900/80 to-slate-600/90" />

      {/* ......carousel container..... */}
      <div className="relative flex justify-center items-center w-full max-w-2xl h-44 xs:h-56 sm:h-72 md:h-80 text-white">
        {/* image wrapper */}
        {sliseShowPhotos.slice(0, 6).map((img, i) => {
          return (
            <div
              style={{
                zIndex: i + 1,
                height: `${getHeight(i, 6, 70)}%`,
                width: `${getWidth(i, 6, 70)}%`,
              }}
              data-name={`photo-slideshow${id}`}
              className={`absolute h-full rounded-3xl  ${
                i === index && "transition-all duration-500"
              }`}
              key={i}
            >
              <img
                className="w-full h-full rounded-[inherit] object-cover"
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
            onClick={() => stack(false)}
          >
            {"<"}
          </button>

          <button
            className="absolute z-20 -right-11 top-[50%] bg-slate-900/40 hover:bg-white/20 transition-colors border rounded-full h-8 w-8 text-sm"
            onClick={() => stack(true)}
          >
            {">"}
          </button>
        </div>
      </div>

      {/* tail */}
      <div className="relative max-w-2xl -mt-16 mb-9 border-b-slate-300 border-b-[3px] py-11 xs:py-12 sm:py-14 w-full rounded-[50%] h-full text-center">
        <span className="absolute left-[50%] translate-y-[-50%] translate-x-[-50%] top-[100%] flex justify-center items-center rounded-full h-6 w-6 bg-slate-300 text-black text-sm">
          {index}
        </span>
      </div>
    </section>
  );
}

export default Stackedgallery;
// ${
//                 i === index && "duration-700 transition-transform ease-in-out "
//               }
