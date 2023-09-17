import { Carousel } from "../asset"; // type

function CarouselsCard({ carousel }: { carousel: Carousel }) {
  const { desc, img, title, url } = carousel;

  return (
    <div className="w-full aspect-video">
      {/* carousel image */}
      <img className="h-full w-full" src={img} alt={title} />
    </div>
  );
}

export default CarouselsCard;
