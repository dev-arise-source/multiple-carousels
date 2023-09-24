import Stackedgallery from "./components/Stackedgallery";

function StackedGallery() {
  return (
    <section className="w-full max-w-4xl mx-auto red">
      <Stackedgallery interval={5} />
    </section>
  );
}

export default StackedGallery;
