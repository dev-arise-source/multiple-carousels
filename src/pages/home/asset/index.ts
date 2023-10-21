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
    img: await getImage(2),
    complexity: "Easy",
    title: "Photo Slider",
    url: "/2-photo-slider",
    desc: "An image slider with cool animation that works by stacking images and sliding out the topmost image",
    youtubeUrl: "https://studio.youtube.com/video/glVNyeqNI5I/comments",
  },
  {
    img: await getImage(3),
    complexity: "Intermediate",
    title: "Photo Slideshow",
    url: "/3-photo-slideshow",
    desc: "A photo slideshow with random slit animation that works by placing the next image on top of the stack",
    youtubeUrl: "https://studio.youtube.com/video/glVNyeqNI5I/comments",
  },
  {
    img: await getImage(4),
    complexity: "Hard",
    title: "Stacked Gallery",
    url: "/4-stacked-gallery",
    desc: "A stacked image gallery with swipe feature that works by swapping out  image sizes and zindex",
    youtubeUrl: "https://studio.youtube.com/video/glVNyeqNI5I/comments",
  },
  {
    img: await getImage(5),
    complexity: "Hard",
    title: "Expandable Gallery",
    url: "5-expandable-image-gallery",
    desc: "Image Gallery Stacked As Narrow Slits And Expands To Show The Full Image On Click",
    youtubeUrl: "https://studio.youtube.com/video/glVNyeqNI5I/comments",
  },

  {
    img: await getImage(6),
    complexity: "Intermediate",
    title: "Cart Slider",
    url: "6-add-to-cart-slider",
    desc: "An add to cart product overview modal with slider for ecommerce works by assigning and reassigning the left property",
    youtubeUrl: "https://studio.youtube.com/video/glVNyeqNI5I/comments",
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
