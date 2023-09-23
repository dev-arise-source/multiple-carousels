import PhotoSlide from "./components/PhotoSlide";

function PhotoSlider() {
  return (
    <section className="w-full max-w-3xl mx-auto">
      <PhotoSlide autoplay={true} interval={5} />
    </section>
  );
}

export default PhotoSlider;
