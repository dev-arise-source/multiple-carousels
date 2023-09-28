// images import
async function getImage(index: number): Promise<string> {
  const { default: img } = await import(`./1-image-slideshow${index}.jpeg`);
  return img;
}

const slideshowImages = [
  {
    id: 1,
    src: await getImage(1),
    name: "Lamborghini",
    desc: "Croissant cookie danish sesame snaps danish. Jujubes sweet roll liquorice chupa chups",
    price: "675.99",
  },
  {
    id: 2,
    src: await getImage(2),
    name: "Mercedez benz",
    desc: "toffee I love oat cake. I love soufflé ice cream gummi bears cookie cotton candy marzipan.",
    price: "985.99",
  },
  {
    id: 3,
    src: await getImage(3),
    name: "Toyota lander",
    desc: "Shortbread brownie chupa chups sesame snaps jujubes jujubes cookie.",
    price: "333.56",
  },
  {
    id: 4,
    src: await getImage(4),
    name: "Honda Breezer",
    desc: "Tiramisu muffin toffee tart sweet pudding I love gummies lollipop.",
    price: "733.77",
  },
  {
    id: 5,
    src: await getImage(5),
    name: "Ferari X345",
    desc: "Sugar plum danish gummies bear claw jelly-o apple pie carrot cake.",
    price: "888.22",
  },
  {
    id: 6,
    src: await getImage(6),
    name: "Mayback anacond",
    desc: "I love lemon drops I love I love pastry tootsie roll.",
    price: "674.00",
  },
];

export default slideshowImages;
