import { Carousel } from "../asset"; // type

type ModalProp = {
  modal: boolean;
  carousel: Carousel;
};

function Modal(props: ModalProp) {
  const { modal, carousel } = props;

  return (
    <section
      className={`fixed top-0 left-0 right-0 bottom-0 w-full h-full z-30 bg-black-1/60 ${
        modal ? "block" : "hidden"
      }`}
    >
      {/* modal body .... */}
      <div className="relative max-w-[700px] w-[97%] sm:w-[85%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white rounded-xl">
        {/* img */}
        <div className="red">hello</div>

        {/* overlay */}
        <div></div>
      </div>
    </section>
  );
}
export default Modal;
