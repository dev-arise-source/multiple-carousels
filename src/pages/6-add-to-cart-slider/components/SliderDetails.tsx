import { Product } from "../assets";

function SliderDetails({ product }: { product: Product }) {
  const { name, price, colors, size, desc, images } = product;

  return <div className="w-full bg-black blue">name:{name}</div>;
}

export default SliderDetails;
