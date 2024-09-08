export function getProduct(productId) {
  return products.find(product => product.id === productId);
}

export function getMatchedProducts(searchedText) {
  let matchedProducts = [];

  products.forEach(product => {
    if(product.name.toLowerCase().includes(searchedText.toLowerCase())) {
      matchedProducts.push(product);
    }
  });

  return matchedProducts;
}

export function getCategoryProducts(categoryName) {
  let categoryProducts = [];

  products.forEach(product => {
    if(categoryName.toLowerCase() === product.type) {
      categoryProducts.push(product);
    }
  });

  return categoryProducts;
}



export const categories = [
  {
    id: '1',
    name: 'Appliances',
    image: './Images/appliances/1_appliances-group.png',
  },
  {
    id: '2',
    name: 'Kitchenware',
    image: './Images/kitchenware/1_kitchenware-display3.png',
  }, 
  {
    id: '3',
    name: 'Clothing',
    image:'./Images/clothing/1_shirts-display.jpg',
  },
  {
    id: '4',
    name: 'House Components',
    image: './Images/house-components/1_house-components.jpg',
    //Chairs, beds ... etc
  }
];


const products = [
  {
    type: 'appliances',
    id: '1000', 
    name: 'Espresso Machine', 
    image: './Images/appliances/espresso-machine-two-cups.png', 
    price: 2000,
    description: 'Turn up the heat and make two coffee cups at the same time!!'
  },
  {
    type: 'appliances',
    id: '1001', 
    name: 'Refrigerator', 
    image: './Images/appliances/refrigerator.png', 
    price: 30000,
    description: ''
  },
  {
    type: 'appliances',
    id: '1002', 
    name: 'Microwave Oven', 
    image: './Images/appliances/microwave-oven.png', 
    price: 15000,
    description: ''
  },
  {
    type: 'appliances',
    id: '1003', 
    name: 'Iron Appliance', 
    image: './Images/appliances/iron-appliance.png', 
    price: 2000,
    description: ''
  },


  {
    type: 'kitchenware',
    id: '1004',
    name: 'Gas Cooker With Oven',
    image: './Images/kitchenware/gas-cooker-with-oven.png',
    price: 25000,
    description: ''
  },
  {
    type: 'kitchenware',
    id: '1005',
    name: 'Hand Mixer',
    image: './Images/kitchenware/Hand-mixer.png',
    price: 800,
    description: ''
  }, 
  {
    type: 'kitchenware',
    id: '1006',
    name: 'Blue Cup',
    image: './Images/kitchenware/blue-cup.png',
    price: 50,
    description: ''
  },
  {
    type: 'kitchenware',
    id: '1007',
    name: 'Cutting Board',
    image: './Images/kitchenware/cutting-board-wooden.png',
    price: 200,
    description: 'A wooden cutting board'
  },
  {
    type: 'kitchenware',
    id: '1008',
    name: 'Fork',
    image: './Images/kitchenware/fork-kitchenware.jpg',
    price: 70,
    description: 'A stainless steel fork'
  },
  {
    type: 'kitchenware',
    id: '1009',
    name: 'Frying Pan',
    image: './Images/kitchenware/frying-pan.png',
    price: 400,
    description: ''
  },
  {
    type: 'kitchenware',
    id: '1010',
    name: 'Glass Cup',
    image: './Images/kitchenware/glass-cup.png',
    price: 75,
    description: ''
  },
  {
    type: 'kitchenware',
    id: '1011',
    name: 'Soup Ladle',
    image: './Images/kitchenware/plastic-soup-ladle.png',
    price: 60,
    description: 'A plastic soup ladle'
  },
  {
    type: 'kitchenware',
    id: '1012',
    name: 'Rolling Pin',
    image: './Images/kitchenware/rolling-pin-wooden.png',
    price: 55,
    description: 'A wooden rolling pin'
  },
  {
    type: 'kitchenware',
    id: '1013',
    name: 'Dishware Set',
    image: './Images/kitchenware/set-of-dishware-stainless-steel.png',
    price: 900,
    description: 'A set of stainless steel dishware'
  }, 
  {
    type: 'kitchenware',
    id: '1014',
    name: 'Cooking Spoon',
    image: './Images/kitchenware/spoon-wooden.png',
    price: 95,
    description: 'A wooden spoon for cooking'
  },
  {
    type: 'kitchenware',
    id: '1015',
    name: 'Cooking Spoons Set',
    image: './Images/kitchenware/spoons-wooden.png',
    price: 250,
    description: 'A set of wooden spoons for cooking'
  },
  {
    type: 'kitchenware',
    id: '1016',
    name: 'Square Grill Pan',
    image: './Images/kitchenware/square-grill-pan.png',
    price: 340,
    description: ''
  },
  {
    type: 'kitchenware',
    id: '1017',
    name: 'Teapot',
    image: './Images/kitchenware/teapot-red.png',
    price: 180,
    description: 'A red teapot'
  },
  {
    type: 'clothing',
    id: '1018',
    name: 'T-Shirt',
    image: './Images/clothing/men-tshirt-black.png',
    price: 400,
    description: 'A black tshirt for men'
  },
  {
    type: 'clothing',
    id: '1019',
    name: 'Belt',
    image: './Images/clothing/leather-belt-black.png',
    price: 200,
    description: 'A black leather belt for men'
  }
]