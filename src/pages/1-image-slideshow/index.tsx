import { useEffect, useState } from "react";
import slideshowImages from "./assets";

type Props = {
  autoplay?: boolean;
  interval?: number;
};

function ImageSlideShow(props: Props) {
  const { autoplay = true, interval = 3 } = props;
  const [index, setIndex] = useState(slideshowImages.length - 1);

  // helper funcs
  const getElements = () => {
    const cars: HTMLDivElement[] = [
      ...document.querySelectorAll(`[data-name="image-slideshow"]`),
    ] as HTMLDivElement[];
    return cars;
  };

  const nextIndex = (forward: boolean) => {
    let idx: number;
    if (forward) {
      idx = index + 1 <= slideshowImages.length - 1 ? index + 1 : 0;
    } else {
      idx = index - 1 >= 0 ? index - 1 : slideshowImages.length - 1;
    }
    return idx;
  };

  // image fader (applies fading effect)
  function fade(el: HTMLDivElement) {
    el.style.opacity = "0";
  }

  // image stacker (re-stacks the image)
  function stack(forward = true) {
    const cars = getElements();
    const topmostImage = cars[index];
    const nextImage = cars[nextIndex(forward)];

    topmostImage.style.zIndex = "20";
    nextImage.style.zIndex = "10";
    nextImage.style.opacity = "1";

    cars.forEach((car, i) => {
      if (i !== index && i !== nextIndex(forward)) {
        car.style.zIndex = "1";
        car.style.opacity = "1";
      }
    });

    setTimeout(() => {
      fade(topmostImage);
    }, 200);
  }

  // slide
  function slide(forward: boolean) {
    stack(forward);
    setIndex(nextIndex(forward));
  }

  useEffect(() => {
    if (!autoplay) return;

    console.log("first");

    const _interval = setInterval(() => {
      slide(true);
    }, interval * 1000);

    return () => {
      clearInterval(_interval);
    };
  }, [index]);

  return (
    <section className="w-full max-w-3xl mx-auto">
      <div className="relative aspect-video">
        <h2 className="absolute top-2 left-2 z-50 flex items-center bg-slate-900/40 p-2 text-white text-xs">
          <span className="bg-red-500 h-2 w-2 mr-2 rounded-full" />
          <span>Simple SlideShow</span>
        </h2>

        {slideshowImages.map((img, i) => {
          return (
            <div
              data-name="image-slideshow"
              className={`absolute aspect-video opacity duration-700 transition-opacity ease-linear origin-center `}
              key={i}
            >
              <p className="absolute">{i}</p>
              <img
                className="w-full h-full"
                src={img.src}
                alt="lamborghini slide show"
              />
            </div>
          );
        })}

        <div>
          <button
            className="text-red-500 absolute z-20 bottom-0"
            onClick={() => slide(true)}
          >
            next
          </button>
          <button
            className="text-red-500 absolute z-20 right-0 bottom-0"
            onClick={() => slide(false)}
          >
            prev
          </button>
        </div>
      </div>
    </section>
  );
}

export default ImageSlideShow;
// ${
//                 i === index ? "opacity-100 z-10" : "opacity-25 z-0"
//               }
