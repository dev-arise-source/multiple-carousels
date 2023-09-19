import { Link } from "react-router-dom";
import { Carousel } from "../asset"; // TS type
import youtubeLogo from "../asset/youtube-logo.png"; // Youtube logo
import InfoIcon from "../asset/infoIcon";
import EyeIcon from "../asset/EyeIcon";

type Props = {
  carousel: Carousel;
  showModal: (carousel: Carousel) => void;
};

function CarouselsCard(props: Props) {
  const { carousel, showModal } = props;
  const { img, title, url, youtubeUrl } = carousel;

  return (
    <div className="relative overflow-hidden z-0 flex items-center justify-center w-full aspect-video group">
      {/* carousel-card image */}
      <img className="h-full w-full" src={img} alt={title} />

      {/* youtube link and logo */}
      <a
        href={youtubeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute flex justify-center items-center w-0 h-0 opacity-0 transition-all duration-500 ease-in-out bg-slate-900/40 rounded-full group-hover:opacity-100 group-hover:w-20 group-hover:h-20"
      >
        <span className="h-12 w-12 rounded-full overflow-hidden">
          <img
            className="h-full w-full scale-125"
            src={youtubeLogo}
            alt="youtube logo"
          />
        </span>
      </a>

      {/* {buttons wrapper */}
      <div className="absolute left-0 right-0 bottom-[-50px] flex bg-slate-900/40 items-center text-white py-3 px-2 transition-all duration-500 ease-in-out group-hover:bottom-[0%]">
        {/* modal (info button) */}
        <button
          onClick={() => showModal(carousel)}
          className="flex items-center gap-1 mr-3"
        >
          <InfoIcon />
          <span className="italic text-xs font-bold">Info</span>
        </button>

        {/* demo link */}
        <Link className="flex items-center gap-1 text-blue-300" to={url}>
          <EyeIcon />
          <span className="italic text-xs font-bold">Demo</span>
        </Link>
      </div>
    </div>
  );
}

export default CarouselsCard;
