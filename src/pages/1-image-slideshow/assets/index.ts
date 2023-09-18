// images import
async function getImage(index: number): Promise<string> {
  const { default: img } = await import(`./1-image-slideshow${index}.jpeg`);
  return img;
}

const slideshowImages = [
  {
    id: 1,
    src: await getImage(1),
  },
  {
    id: 2,
    src: await getImage(2),
  },
  {
    id: 3,
    src: await getImage(3),
  },
  {
    id: 4,
    src: await getImage(4),
  },
  {
    id: 5,
    src: await getImage(5),
  },
  {
    id: 6,
    src: await getImage(6),
  },
];

export default slideshowImages;
