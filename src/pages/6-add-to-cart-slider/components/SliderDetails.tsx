import { Product } from "../assets";

function SliderDetails({ product }: { product: Product }) {
  const { name, price, colors, size, desc, images } = product;

  return <div className="w-[50%] bg-black blu text-white">name:{name}</div>;
}

export default SliderDetails;
