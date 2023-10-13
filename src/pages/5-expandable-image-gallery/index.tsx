import ExpandableGallery from "./components/ExpandableGallery";
import gallery from "./assets";

function ExpandableImageGallery() {
  return (
    <section className="w-full max-w-4xl mx-auto">
      <ExpandableGallery gallery={gallery} interval={5} />
    </section>
  );
}
export default ExpandableImageGallery;
