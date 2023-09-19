export type Carousel = {
  img: string;
  title: string;
  url: string;
  desc: string;
  youtubeUrl: string;
  complexity: "Easy" | "Intermediate" | "Hard";
};

// images import
async function getImage(index: number): Promise<string> {
  const { default: img } = await import(`./carousel${index}.png`);
  return img;
}

// list of all carousels
const carouselList: Carousel[] = [
  {
    img: await getImage(1),
    complexity: "Easy",
    title: "Image Slide Show",
    url: "/1-image-slideshow",
    desc: "A basic image slide-show that works by stacking images and fading the topmost image",
    youtubeUrl: "https://studio.youtube.com/video/glVNyeqNI5I/comments",
  },
  {
    img: await getImage(1),
    complexity: "Intermediate",
    title: "Photo Slide Show",
    url: "/2-photo-slideshow",
    desc: "An image slide-show with cool sweeping fading animation that works by stacking images and sweeping out the topmost image",
    youtubeUrl: "https://studio.youtube.com/video/glVNyeqNI5I/comments",
  },
  // {
  //   img: await getImage(2),
  //   title: "",
  //   url: "",
  //   desc: "",
  //   youtubeUrl: "",
  //   complexity: "Easy",
  // },
  // {
  //   img: await getImage(3),
  //   title: "",
  //   url: "",
  //   desc: "",
  //   youtubeUrl: "",
  //   complexity: "Easy",
  // },
  // {
  //   img: await getImage(4),
  //   title: "",
  //   url: "",
  //   desc: "",
  //   youtubeUrl: "",
  //   complexity: "Easy",
  // },
  // {
  //   img: await getImage(5),
  //   title: "",
  //   url: "",
  //   desc: "",
  //   youtubeUrl: "",
  //   complexity: "Easy",
  // },
  // {
  //   img: await getImage(6),
  //   title: "",
  //   url: "",
  //   desc: "",
  //   youtubeUrl: "",
  //   complexity: "Easy",
  // },

  {
    img: await getImage(1),
    title: "",
    url: "",
    desc: "",
    youtubeUrl: "",
    complexity: "Easy",
  },
  {
    img: await getImage(1),
    title: "",
    url: "",
    desc: "",
    youtubeUrl: "",
    complexity: "Easy",
  },
  {
    img: await getImage(1),
    title: "",
    url: "",
    desc: "",
    complexity: "Easy",
    youtubeUrl: "",
  },
  {
    img: await getImage(1),
    title: "",
    url: "",
    desc: "",
    youtubeUrl: "",
    complexity: "Easy",
  },
  {
    img: await getImage(1),
    title: "",
    url: "",
    desc: "",
    youtubeUrl: "",
    complexity: "Easy",
  },
  {
    img: await getImage(1),
    title: "",
    url: "",
    desc: "",
    youtubeUrl: "",
    complexity: "Easy",
  },
  {
    img: await getImage(1),
    title: "",
    url: "",
    desc: "",
    youtubeUrl: "",
    complexity: "Easy",
  },
];
export default carouselList;
