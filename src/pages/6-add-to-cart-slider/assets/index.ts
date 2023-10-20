async function getPhoto(index: number): Promise<string> {
  const { default: img } = await import(
    `./5-expandable-image-gallery${index}.png`
  );
  return img;
}

const product = {
  name: "Mens Cotton Jacket",
  price: 76.99,
  colors: ["red", "blue", "white"],
  size: ["xs", "s", "m", "l", "xl", "xxl", "xxxl"],
  desc: "",
  images: [
    {
      src: await getPhoto(1),
    },
    {
      src: await getPhoto(2),
    },
    {
      src: await getPhoto(3),
    },
    {
      src: await getPhoto(4),
    },
    {
      src: await getPhoto(5),
    },
  ],
};

export default product;
