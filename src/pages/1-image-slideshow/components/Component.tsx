type Props = {
  id: number;
  src: string;
  name: string;
  desc: string;
  price: string;
};

function Component(props: Props) {
  const { src, name, desc, price } = props;
  return (
    <div
      data-name="image-slideshow"
      className={`absolute aspect-video duration-700 transition-opacity ease-linear origin-center bg-gradient-to-r from-purple-500 to-pink-500 left-0 right-0 bottom-0`}
    >
      <div className="flex items-center gap-2 h-full py-10 px-3">
        <div className="w-[50%] flex flex-col justify-center items-center">
          <h2 className="text-sm sm:text-base">{name} </h2>

          <p className="text-center text-xs xs:text-sm mt-1 italic">{desc}</p>

          <div className="mt-2 flex gap-2 items-center">
            <p className="text-xs text-yellow-400">{price}</p>
            <button className="bg-red-400 px-2 rounded-lg text-xs">
              Buy Now
            </button>
          </div>
        </div>

        <div className="w-[50%] max-h-[80%] py-4">
          <img
            className="w-full h-full object-cover"
            src={src}
            alt="lamborghini slide show"
          />
        </div>
      </div>
    </div>
  );
}

export default Component;
