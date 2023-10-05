async function getPhoto(index: number): Promise<string> {
  const { default: img } = await import(`./4-stacked-gallery${index}.png`);
  return img;
}

const gallery = [
  {
    id: 1,
    src: await getPhoto(1),
  },
  {
    id: 2,
    src: await getPhoto(2),
  },
  {
    id: 3,
    src: await getPhoto(3),
  },
  {
    id: 4,
    src: await getPhoto(4),
  },
  {
    id: 5,
    src: await getPhoto(5),
  },
  {
    id: 6,
    src: await getPhoto(6),
  },
];

export default gallery;
