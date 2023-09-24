import Photoslideshow from "./components/Photoslideshow";

function PhotoSlideShow() {
  return (
    <section className="w-full max-w-3xl mx-auto">
      <Photoslideshow interval={3} />
    </section>
  );
}

export default PhotoSlideShow;
