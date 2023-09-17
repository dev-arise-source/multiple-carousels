import { Link } from "react-router-dom";
import { Carousel } from "../asset"; // TS type
import youtubeLogo from "../asset/youtube-logo.png"; // Youtube logo

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
        className="absolute flex justify-center items-center w-0 h-0 opacity-0 transition-all duration-500 ease-in-out bg-slate-900/50 rounded-none group-hover:opacity-100 group-hover:w-20 group-hover:h-20 group-hover:rounded-full"
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="text-sm"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
          </svg>

          <span className="italic text-xs">Info...</span>
        </button>

        <Link className="flex items-center gap-1 text-cyan-500" to={url}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
          </svg>
          <span className="italic text-xs">Demo</span>
        </Link>
      </div>
    </div>
  );
}

export default CarouselsCard;
