import { Product } from "../assets";

function SliderDetails({ product }: { product: Product }) {
  const { name, price, colors, sizes, desc } = product;

  return (
    <div className="w-full min-[550px]:w-[50%] bg-black  text-white px-7 py-7">
      <div className="max-w-xs mx-auto">
        {/* name of product */}
        <h1 className="text-cente min-[550px]:text-left md:text-lg line_clamp_2">
          {name}
        </h1>

        {/* price of product */}
        <p className="w-max bg-blue-600 px-5 py-1 rounded-lg mt-2">${price}</p>

        {/* line divider */}
        <div className="border-b border-slate-600 my-4" />

        {/* colors wrapper */}
        <div>
          <p>Color</p>

          <div className="mt-1 flex gap-1">
            {colors.map((c, i) => {
              return (
                <span
                  className={`cursor-pointer rounded-xl capitalize border border-slate-600 bg-zinc-800 px-3 py-1 text-xs ${
                    i === 2 &&
                    "opacity-95 overflow-hidden relative before:absolute before:content-[''] before:top-[50%] before:left-0 before:w-full before:rotate-[153deg] before:border-t before:border-slate-600 text-zinc-500"
                  }`}
                  key={i}
                >
                  {c}
                </span>
              );
            })}
          </div>
        </div>

        {/*product sizes */}
        <div className="mt-4">
          <p>Sizes</p>

          <div className="mt-1 flex flex-wrap gap-1">
            {sizes.map((s) => {
              return (
                <span className="cursor-pointer rounded-xl uppercase border border-slate-600 bg-zinc-800 px-4 py-1 text-xs">
                  {s}
                </span>
              );
            })}
          </div>

          <div></div>
        </div>

        {/* product description */}
        <div className="mt-4">
          <p>Desc</p>
          <small className="text-gray-400 line_clamp_2">{desc}</small>
        </div>

        {/* line divider */}
        <div className="border-b border-slate-600 my-5" />

        {/* add to cart button */}
        <button className="w-full bg-blue-600 h-9 uppercase rounded-lg">
          Add To cart
        </button>
      </div>
    </div>
  );
}

export default SliderDetails;
