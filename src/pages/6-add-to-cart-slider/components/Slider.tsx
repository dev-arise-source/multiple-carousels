import { useEffect, useRef, useState } from "react";
import gallery from "../../5-expandable-image-gallery/assets";

type Props = {
  interval?: number;
  id?: string;
};

function ExpandableGallery(props: Props) {
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
    <section
      style={{ backgroundImage: `url(${gallery[index].src})` }}
      className="relative flex flex-col justify-center items-center bg-center bg-cover w-full text-white px-5 sm:px-[50px] py-3"
    >
      {/* carousel tag */}
      <h2 className="absolute top-2 left-2 z-30 flex items-center gap-2 bg-white/10 px-3 py-1 text-white font-bold rounded-full">
        {/* aesthetics dot */}
        <span className="bg-red-500 h-2 w-2 rounded-full" />

        {/* title */}
        <span className="italic text-xs">Expandable Gallery</span>
      </h2>

      {/* title and pause/play btn */}
      <div className="relative z-10 flex items-center py-6">
        {/* title */}
        <h2 className="text-xl font-[Lobster] md:text-3xl">Landscape Views</h2>

        {/*pause/play slideshow button */}
        <button
          title={play ? "pause slideshow" : "play slideshow"}
          className="h-10 w-10 text-base md:text-xl"
          onClick={() => setPlay(!play)}
        >
          {play ? "⏸️" : "▶️"}
        </button>
      </div>

      {/* background overlay  */}
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-slate-900/60 via-slate-900/60 to-slate-800/50" />

      <div ref={carousel} className="w-full">
        {/* .....expandable carousel container..... */}

        <div className="relative aspect-video w-full text-white overflow-hidden rounded-3xl">
          {gallery.map((img, i) => {
            return (
              <div
                data-name={`expandable-gallery${id}`}
                className={`absolute left-0 w-full aspect-video ${
                  i === index && "z-10"
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

          {/*arrow buttons wrapper */}
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
        </div>
      </div>

      {/* indicators wrapper */}
      <div className="flex justify-center w-full overflow-x-auto max-w-[90%] py-5 relative z-20">
        {gallery.map((_, i) => {
          return (
            <button
              key={i}
              onClick={() => handleExpand(i)}
              className={`border h-2 mx-1.5 rounded-full ${
                i === index
                  ? "bg-white border-slate-900 w-4"
                  : "bg-slate-900 w-2"
              }`}
            />
          );
        })}
      </div>
    </section>
  );
}

export default ExpandableGallery;
