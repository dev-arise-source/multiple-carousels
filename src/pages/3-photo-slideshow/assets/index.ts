async function getPhoto(index: number): Promise<string> {
  const { default: img } = await import(`./3-photo-slideshow${index}.png`);
  return img;
}

const photos = [
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

const sliseShowPhotos = [...photos, ...photos];

export default sliseShowPhotos;
