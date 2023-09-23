import Photoslideshow from "./components/Photoslideshow";

function PhotoSlideShow() {
  return (
    <section className="w-full max-w-3xl mx-auto">
      <Photoslideshow autoplay={true} interval={5} />
    </section>
  );
}

export default PhotoSlideShow;
