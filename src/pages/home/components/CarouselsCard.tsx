import { Link } from "react-router-dom";
import { Carousel } from "../asset"; // TS type
import youtubeLogo from "../asset/youtube-logo.png"; // Youtube logo
import InfoIcon from "../asset/infoIcon";
import EyeIcon from "../asset/EyeIcon";

function CarouselsCard({ carousel }: { carousel: Carousel }) {
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
        className="absolute flex justify-center items-center w-0 h-0 opacity-0 transition-all duration-500 ease-in-out bg-slate-900/50 rounded-full group-hover:opacity-100 group-hover:w-20 group-hover:h-20"
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
      <div className="absolute left-0 right-0 bottom-[-40px] flex bg-slate-900/50 items-center text-orange-500 p-2 transition-all duration-500 ease-in-out group-hover:bottom-[0%]">
        <button
          // onClick={}
          className="flex items-center gap-1 mr-3"
        >
          <InfoIcon />
          <span className="italic text-xs">Info...</span>
        </button>

        <Link className="flex items-center gap-1 text-cyan-500" to={url}>
          <EyeIcon />
          <span className="italic text-xs">Demo</span>
        </Link>
      </div>
    </div>
  );
}

export default CarouselsCard;
