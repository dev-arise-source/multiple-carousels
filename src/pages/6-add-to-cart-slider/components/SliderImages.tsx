import { useState } from "react";
import { Product } from "../assets";

type Props = {
  id?: string;
  images: Product["images"];
};

function SliderImages(props: Props) {
  const { images, id } = props;
  const [index, setIndex] = useState(images.length - 1);

  //   helper funcs
  const getElements = (dataname: string = "slider-images") => {
    const el: HTMLDivElement[] = [
      ...document.querySelectorAll(`[data-name="${dataname + id}"]`),
    ] as HTMLDivElement[];
    return el;
  };

  const nextIndex = (forward: boolean, nextIndex?: number) => {
    let idx: number;
    if (typeof nextIndex === "number") {
      idx = nextIndex < 0 || nextIndex > images.length - 1 ? 0 : nextIndex;
    } else {
      if (forward) {
        idx = index + 1 <= images.length - 1 ? index + 1 : 0;
      } else {
        idx = index - 1 >= 0 ? index - 1 : images.length - 1;
      }
    }

    return idx;
  };

  function slide(index: number) {
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
      el.classList.remove("transition_6");
      el.classList.add("noTransition_6");
      el.style.transform = "translateX(0)";
    });

    // re-arrange stack
    if (getDirection() === "right") nextPhoto.style.left = "100%";
    else nextPhoto.style.left = "-100%";
    nextPhoto.style.zIndex = "10";

    // slide photos
    function slide() {
      photos.forEach((el) => {
        el.classList.remove("noTransition_6");
        el.classList.add("transition_6");
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

  return (
    <section className="relative flex flex-col justify-center items-center bg-white w-full px-5 pt-5 pb-5 min-[550px]:w-[50%] min-[550px]:pb-6 min-[550px]:pt-12">
      {/* image wrapper */}
      <div className="relative flex justify-center items-center w-[220px] min-[550px]:w-[250px] h-[220px] min-[550px]:h-[320px] md:h-[350px] overflow-hidden">
        {images.map((img, i) => {
          return (
            <div
              data-name={`slider-images${id}`}
              className={`absolute left-0 h-full w-full ${
                i === index && "z-10"
              }`}
              key={i}
            >
              <img
                className="w-full h-full object-contain bg-white"
                src={img.src}
                alt="add to cart slider"
              />
            </div>
          );
        })}
      </div>

      {/*arrow buttons wrapper */}
      <div>
        <button
          className="absolute z-20 left-2 top-[50%] bg-slate-400/40 rounded-full h-6 w-6 text-white text-xs"
          onClick={() => stack(false)}
        >
          {"<"}
        </button>

        <button
          className="absolute z-20 right-2 top-[50%] bg-slate-400/40 rounded-full h-6 w-6 text-white text-xs"
          onClick={() => stack(true)}
        >
          {">"}
        </button>
      </div>

      {/* thumbnail wrapper */}
      <div className="flex w-max mx-auto overflow-x-auto max-w-[95%] min-[550px]:mt-5">
        {images.map((img, i) => {
          return (
            <div
              key={i}
              onClick={() => slide(i)}
              className={`h-10 min-w-[50px] mx-1 ${
                i === index && "border border-slate-900 p-1"
              }`}
            >
              <img
                className="h-full w-full object-contain"
                src={img.src}
                alt="add to cart slider"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default SliderImages;
