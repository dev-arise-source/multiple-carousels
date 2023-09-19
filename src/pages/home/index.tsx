import { useState } from "react";
import carouselList, { Carousel } from "./asset";
import CarouselsCard from "./components/CarouselsCard";
import Modal from "./components/Modal";

function Home() {
  const [modal, setModal] = useState(false);
  const [carousel, setCarousel] = useState<Carousel>(carouselList[0]);

  function showModal(carousel: Carousel) {
    setCarousel(carousel);
    setModal(true);
  }

  function hideModal() {
    setModal(false);
  }

  return (
    <section>
      <h2 className="pt-5 italic text-blue-500 font-bold text-center text-xl">
        Carousels
      </h2>

      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto w-full px-3 py-5">
        {carouselList.map((c, i) => (
          <CarouselsCard showModal={showModal} carousel={c} key={i} />
        ))}
      </div>

      <Modal modal={modal} hideModal={hideModal} carousel={carousel} />
    </section>
  );
}

export default Home;
