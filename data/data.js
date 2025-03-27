export function getProduct(productId) {
  return products.find((product) => product.id === productId);
}

export function getMatchedProducts(searchedText) {
  let matchedProducts = [];

  products.forEach((product) => {
    if (product.name.toLowerCase().includes(searchedText.toLowerCase())) {
      matchedProducts.push(product);
    }
  });

  return matchedProducts;
}

export function getCategoryProducts(categoryName) {
  let categoryProducts = [];

  products.forEach((product) => {
    if (categoryName.toLowerCase() === product.type) {
      categoryProducts.push(product);
    }
  });

  return categoryProducts;
}

export const categories = [
  {
    id: "1",
    name: "Appliances",
    image: "./Images/appliances/1_appliances-group.png",
  },
  {
    id: "2",
    name: "Kitchenware",
    image: "./Images/kitchenware/1_kitchenware-display3.png",
  },
  {
    id: "3",
    name: "Clothing",
    image: "./Images/clothing/1_shirts-display.jpg",
  },
  {
    id: "4",
    name: "House Components",
    image: "./Images/house-components/1_house-components.jpg",
  },
  {
    id: "5",
    name: "Technology",
    image: "./Images/technology/1_technology-showing.jpg",
  },
];

const products = [
  {
    type: "appliances",
    id: "1000",
    name: "Espresso Machine",
    image: "./Images/appliances/espresso-machine-two-cups.png",
    price: 1999,
    description: "Turn up the heat and make two coffee cups at the same time!!",
  },
  {
    type: "appliances",
    id: "1001",
    name: "Refrigerator",
    image: "./Images/appliances/refrigerator.png",
    price: 29999,
    description: "",
  },
  {
    type: "appliances",
    id: "1002",
    name: "Microwave Oven",
    image: "./Images/appliances/microwave-oven.png",
    price: 14999,
    description: "",
  },
  {
    type: "appliances",
    id: "1003",
    name: "Iron Appliance",
    image: "./Images/appliances/iron-appliance.png",
    price: 1999,
    description: "",
  },
  {
    type: "appliances",
    id: "1004",
    name: "Washing Machine",
    image: "./Images/appliances/washing-machine.png",
    price: 5999,
    description: "",
  },
  {
    type: "appliances",
    id: "1005",
    name: "Air Conditioner",
    image: "./Images/appliances/air-conditioner.png",
    price: 24999,
    description: "",
  },
  {
    type: "appliances",
    id: "1006",
    name: "Window Air Conditioner",
    image: "./Images/appliances/window-air-conditioner.png",
    price: 19999,
    description: "",
  },
  // {
  //   type: "kitchenware",
  //   id: "2000",
  //   name: "Gas Cooker With Oven",
  //   image: "./Images/kitchenware/gas-cooker-with-oven.png",
  //   price: 24999,
  //   description: "",
  // },
  {
    type: "kitchenware",
    id: "2001",
    name: "Spoon",
    image: "./Images/kitchenware/spoon.jpg",
    price: 59,
    description: "",
  },
  {
    type: "kitchenware",
    id: "2002",
    name: "Mug",
    image: "./Images/kitchenware/mug.jpg",
    price: 49,
    description: "",
  },
  // {
  //   type: "kitchenware",
  //   id: "2003",
  //   name: "Cutting Board",
  //   image: "./Images/kitchenware/cutting-board-wooden.png",
  //   price: 199,
  //   description: "A wooden cutting board",
  // },
  {
    type: "kitchenware",
    id: "2004",
    name: "Fork",
    image: "./Images/kitchenware/fork.jpg",
    price: 59,
    description: "A stainless steel fork",
  },
  {
    type: "kitchenware",
    id: "2005",
    name: "Knife",
    image: "./Images/kitchenware/knife.jpg",
    price: 99,
    description: "",
  },
  {
    type: "kitchenware",
    id: "2006",
    name: "Pan",
    image: "./Images/kitchenware/pan.jpg",
    price: 1799,
    description: "",
  },
  // {
  //   type: "kitchenware",
  //   id: "2007",
  //   name: "Soup Ladle",
  //   image: "./Images/kitchenware/plastic-soup-ladle.png",
  //   price: 59,
  //   description: "A plastic soup ladle",
  // },
  // {
  //   type: "kitchenware",
  //   id: "2008",
  //   name: "Rolling Pin",
  //   image: "./Images/kitchenware/rolling-pin-wooden.png",
  //   price: 99,
  //   description: "A wooden rolling pin",
  // },
  // {
  //   type: "kitchenware",
  //   id: "2009",
  //   name: "Dishware Set",
  //   image: "./Images/kitchenware/set-of-dishware-stainless-steel.png",
  //   price: 899,
  //   description: "A set of stainless steel dishware",
  // },
  // {
  //   type: "kitchenware",
  //   id: "2010",
  //   name: "Cooking Spoon",
  //   image: "./Images/kitchenware/spoon-wooden.png",
  //   price: 79,
  //   description: "A wooden spoon for cooking",
  // },
  // {
  //   type: "kitchenware",
  //   id: "2011",
  //   name: "Cooking Spoons Set",
  //   image: "./Images/kitchenware/spoons-wooden.png",
  //   price: 249,
  //   description: "A set of wooden spoons for cooking",
  // },
  // {
  //   type: "kitchenware",
  //   id: "2012",
  //   name: "Square Grill Pan",
  //   image: "./Images/kitchenware/square-grill-pan.png",
  //   price: 339,
  //   description: "",
  // },
  // {
  //   type: "kitchenware",
  //   id: "2013",
  //   name: "Teapot",
  //   image: "./Images/kitchenware/teapot.jpg",
  //   price: 179,
  //   description: "A red teapot",
  // },
  // {
  //   type: "kitchenware",
  //   id: "2014",
  //   name: "Electric Grill",
  //   image: "./Images/kitchenware/electric-grill.png",
  //   price: 2999,
  //   description: "",
  // },

  {
    type: "clothing",
    id: "3000",
    name: "T-Shirt",
    image: "./Images/clothing/men-tshirt-black.png",
    price: 399,
    description: "A black tshirt for men",
  },
  {
    type: "clothing",
    id: "3001",
    name: "Belt",
    image: "./Images/clothing/belt.jpg",
    price: 199,
    description: "A belt for men.",
  },
  {
    type: "house components",
    id: "4000",
    name: "Mustard Chair",
    image: "./Images/house-components/mustard-chair.jpg",
    price: 1999,
    description: "",
  },
  {
    type: "house components",
    id: "4003",
    name: "Towels",
    image: "./Images/house-components/towels.jpg",
    price: 299,
    description: "",
  },
  {
    type: "house components",
    id: "4004",
    name: "Wall Clock",
    image: "./Images/house-components/wall-clock.png",
    price: 149,
    description: "",
  },

  {
    type: "technology",
    id: "5000",
    name: "Smartphone",
    image: "./Images/technology/smartphone.png",
    price: 7499,
    description: "",
  },
  {
    type: "technology",
    id: "5001",
    name: "Laptop",
    image: "./Images/technology/laptop.png",
    price: 19999,
    description: "",
  },
  // {
  //   type: "technology",
  //   id: "5002",
  //   name: "TV",
  //   image: "./Images/technology/tv.png",
  //   price: 24999,
  //   description: "",
  // },
  // {
  //   type: "technology",
  //   id: "5003",
  //   name: "Computer Case",
  //   image: "./Images/technology/computer-case.png",
  //   price: 7999,
  //   description: "",
  // },
  // {
  //   type: "technology",
  //   id: "5004",
  //   name: "Drone",
  //   image: "./Images/technology/flying-drone.png",
  //   price: 9999,
  //   description: "",
  // },
  // {
  //   type: "technology",
  //   id: "5005",
  //   name: "Segway",
  //   image: "./Images/technology/segway.png",
  //   price: 18999,
  //   description: "",
  // },
  {
    type: "technology",
    id: "5006",
    name: "Camera",
    image: "./Images/technology/camera.jpg",
    price: 3999,
    description: "",
  },
  // {
  //   type: "technology",
  //   id: "5007",
  //   name: "Camera Lens",
  //   image: "./Images/technology/camera-lens.png",
  //   price: 1499,
  //   description: "",
  // },
  {
    type: "technology",
    id: "5008",
    name: "Security Camera",
    image: "./Images/technology/security-cam.jpg",
    price: 2299,
    description: "",
  },
];
