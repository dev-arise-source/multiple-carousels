import SliderDetails from "./SliderDetails";
import product from "../assets";
import SliderImages from "./SliderImages";

type Props = {
  interval?: number;
  id?: string;
};

function Slider(props: Props) {
  const { id = "addId" } = props;

  return (
    <section className="flex flex-col min-[550px]:flex-row relative max-w-max min-[550px]:max-w-3xl mx-auto">
      {/* carousel tag */}
      <h2 className="absolute top-2 left-2 z-30 flex items-center gap-2 bg-black/10 px-3 py-1 font-bold rounded-full">
        {/* aesthetics dot */}
        <span className="bg-yellow-500 h-2 w-2 rounded-full" />

        {/* title */}
        <span className="italic text-xs">Add To Cart Slider</span>
      </h2>

      {/* slider images component here */}
      <SliderImages id={id} images={product.images} />

      {/* slider details component here */}
      <SliderDetails product={product} />
    </section>
  );
}

export default Slider;
