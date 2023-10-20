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
  const { default: img } = await import(
    `../../5-expandable-image-gallery/assets/5-expandable-image-gallery${index}.png`
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
      src: "https://keycense-test.vercel.app/_next/image?url=https%3A%2F%2Ffakestoreapi.com%2Fimg%2F71li-ujtlUL._AC_UX679_.jpg&w=640&q=75",
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
