import ImageSlide from "./components/ImageSlide";

function ImageSlideShow() {
  return (
    <section className="w-full max-w-3xl mx-auto">
      <ImageSlide autoplay={true} interval={5} />
    </section>
  );
}

export default ImageSlideShow;
