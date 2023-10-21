export type Product = {
  name: string;
  price: number;
  colors: string[];
  size: string[];
  desc: string;
  images: {
    src: string;
  }[];
};

async function getPhoto(index: number): Promise<string> {
  const { default: img } = await import(`./6-add-to-cart-slider${index}.png`);
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
