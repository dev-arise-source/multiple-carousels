import ImageSlideShow from "./components/ImageSlideShow";

function ImageSlideShow1() {
  return (
    <section className="w-full max-w-3xl mx-auto">
      <ImageSlideShow autoplay={false} interval={5} />
    </section>
  );
}

export default ImageSlideShow1;
