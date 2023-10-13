import Expandablegallery from "./components/Stackedgallery";
import gallery from "./assets";

function ExpandableImageGallery() {
  return (
    <section className="w-full max-w-4xl mx-auto">
      <Expandablegallery gallery={gallery} interval={5} />
    </section>
  );
}
export default ExpandableImageGallery;
