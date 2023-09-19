import { Carousel } from "../asset"; // type

type ModalProp = {
  modal: boolean;
  carousel: Carousel;
  hideModal: () => void;
};

function Modal(props: ModalProp) {
  const { modal, carousel, hideModal } = props;

  return (
    <section
      className={`fixed top-0 left-0 right-0 bottom-0 w-full h-full z-30 bg-slate-900/60 flex justify-center items-center px-3 ${
        modal ? "block" : "hidden"
      }`}
    >
      {/* modal body .... */}
      <div className="relative max-w-3xl">
        {/* img */}
        <div className="rounded-xl">
          <img
            className="rounded-[inherit]"
            src={carousel.img}
            alt={carousel.title}
          />
        </div>

        {/* overlay */}
        <div className="absolute top-0 bottom-0 right-0 left-0 flex flex-col justify-center items-center text-white rounded-xl">
          {/* complexity */}
          <p className="absolute left-2 top-2 text-xs font-bold bg-slate-900/30 px-3 py-1 rounded-full">
            Complexity:{" "}
            <span
              className={
                carousel.complexity === "Easy"
                  ? "text-green-400"
                  : carousel.complexity === "Intermediate"
                  ? "text-yellow-500"
                  : "text-red-500"
              }
            >
              {carousel.complexity}
            </span>
          </p>
          {/* title */}
          <h2 className="text-xl italic font-[Lobster] bg-slate-900/30 px-3 rounded-full">
            {carousel.title}
          </h2>

          {/* description */}
          <p className="hidden xs:block max-w-[95%] sm:max-w-[90%] mx-auto text-center text-sm sm:text-base mt-5 italic font-light bg-slate-900/30 px-3 py-1 rounded-full">
            {carousel.desc}
          </p>
        </div>

        {/* close button */}
        <button
          onClick={hideModal}
          className="absolute -top-7 right-0 text-lg text-white/50"
        >
          ⓧ
        </button>
      </div>
    </section>
  );
}
export default Modal;
