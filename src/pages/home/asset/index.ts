export type Carousel = {
  img: string;
  title: string;
  url: string;
  desc: string;
};

// images import
async function getImage(index: number): Promise<string> {
  const { default: url } = await import(`./carousel${index}.jpeg`);
  console.log(url);
  return url;
}

// list of all carousels
const carouselList: Carousel[] = [
  {
    img: await getImage(1),
    title: "Test 1",
    url: "/image-slide-show",
    desc: "some texts here",
  },
  {
    img: await getImage(2),
    title: "",
    url: "",
    desc: "",
  },
  {
    img: await getImage(3),
    title: "",
    url: "",
    desc: "",
  },
  {
    img: await getImage(4),
    title: "",
    url: "",
    desc: "",
  },
  {
    img: await getImage(5),
    title: "",
    url: "",
    desc: "",
  },
  {
    img: await getImage(6),
    title: "",
    url: "",
    desc: "",
  },
  {
    img: await getImage(1),
    title: "",
    url: "",
    desc: "",
  },
  {
    img: await getImage(1),
    title: "",
    url: "",
    desc: "",
  },
  {
    img: await getImage(1),
    title: "",
    url: "",
    desc: "",
  },
  {
    img: await getImage(1),
    title: "",
    url: "",
    desc: "",
  },
  {
    img: await getImage(1),
    title: "",
    url: "",
    desc: "",
  },
  {
    img: await getImage(1),
    title: "",
    url: "",
    desc: "",
  },
  {
    img: await getImage(1),
    title: "",
    url: "",
    desc: "",
  },
  {
    img: await getImage(1),
    title: "",
    url: "",
    desc: "",
  },
  {
    img: await getImage(1),
    title: "",
    url: "",
    desc: "",
  },
  {
    img: await getImage(1),
    title: "",
    url: "",
    desc: "",
  },
  {
    img: await getImage(1),
    title: "",
    url: "",
    desc: "",
  },
  {
    img: await getImage(1),
    title: "",
    url: "",
    desc: "",
  },
  {
    img: await getImage(1),
    title: "",
    url: "",
    desc: "",
  },
];
export default carouselList;
