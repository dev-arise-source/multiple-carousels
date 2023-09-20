import PhotiSlide from "./components/PhotoSlide";

function PhotiSlideShow() {
  return (
    <section className="w-full max-w-3xl mx-auto">
      <PhotiSlide autoplay={true} interval={5} />
    </section>
  );
}

export default PhotiSlideShow;
