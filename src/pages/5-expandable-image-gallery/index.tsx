import Expandablegallery from "./components/Stackedgallery";

function ExpandableImageGallery() {
  return (
    <section className="w-full max-w-4xl mx-auto">
      <Expandablegallery interval={5} />
    </section>
  );
}
export default ExpandableImageGallery;
