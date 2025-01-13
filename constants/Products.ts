// Products.ts
export interface Product {
  id: number;
  name: string;
  price: number;
  image: any;
  tag: string;
  category: string;
  description: string;
  otherColors?: any[];
  relatedProducts: string[];
}

export const products: Product[] = [
  {
    id: 1,
    name: 'JAQUEMUS',
    price: 59.99,
    image: require('../assets/images/jaquemus.jpg'),
    tag: 'bestselling',
    category: 'Women',
    description: 'A high-quality, elegant dress designed for stylish occasions. Made from breathable fabric, it offers comfort and sophistication for any special event. Available in multiple sizes and colors.',
    relatedProducts: ['2', '3'],
    otherColors: [
      require('../assets/images/cloth1.jpg'),
      require('../assets/images/cloth2.jpg'),
      require('../assets/images/cloth3.jpg'),
    ],
  },
  {
    id: 2,
    name: 'JC COMPLETE',
    price: 39.99,
    image: require('../assets/images/jc_compplete.jpg'),
    tag: 'bestselling',
    category: 'Men',
    description: 'Comfortable and fashionable JC Complete outfit featuring a sleek design and versatile colors. Ideal for both casual and semi-formal settings, this set is perfect for everyday wear.',
    relatedProducts: ['1', '4'],
    otherColors: [
      require('../assets/images/cloth1.jpg'),
      require('../assets/images/cloth2.jpg'),
      require('../assets/images/cloth3.jpg'),
    ],
  },
  {
    id: 3,
    name: 'LACOSTE T-SHIRT',
    price: 19.99,
    image: require('../assets/images/lacoste t-shirt.jpg'),
    tag: 'bestselling',
    category: 'Unisex',
    description: 'Premium cotton t-shirt perfect for casual wear. Featuring the iconic Lacoste logo, it combines comfort, breathability, and timeless style. Available in multiple sizes for both men and women.',
    relatedProducts: ['2', '4'],
    otherColors: [
      require('../assets/images/cloth1.jpg'),
      require('../assets/images/cloth2.jpg'),
      require('../assets/images/cloth3.jpg'),
    ],
  },
  {
    id: 4,
    name: 'SMALL BAG',
    price: 129.99,
    image: require('../assets/images/small_bag.jpg'),
    tag: 'bestselling',
    category: 'Unisex',
    description: 'A sleek and compact small bag made with premium materials. Ideal for carrying essentials, this stylish bag is perfect for both casual outings and more formal events. Available in multiple colors.',
    relatedProducts: ['2', '4'],
    otherColors: [
      require('../assets/images/cloth1.jpg'),
      require('../assets/images/cloth2.jpg'),
      require('../assets/images/cloth3.jpg'),
    ],
  },
  {
    id: 5,
    name: 'HOODI O',
    price: 129.99,
    image: require('../assets/images/hoodie_o.jpg'),
    tag: 'latest',
    category: 'Unisex',
    description: 'An ultra-comfortable hoodie designed for both warmth and style. Made from a soft cotton blend, it’s perfect for layering or casual wear. Available in a variety of colors.',
    relatedProducts: ['1', '6'],
    otherColors: [
      require('../assets/images/cloth1.jpg'),
      require('../assets/images/cloth2.jpg'),
      require('../assets/images/cloth3.jpg'),
    ],
  },
  {
    id: 6,
    name: 'JACKET O',
    price: 129.99,
    image: require('../assets/images/jacket_o.jpg'),
    tag: 'latest',
    category: 'Unisex',
    description: 'A stylish and versatile jacket that can be dressed up or down. Crafted from durable materials, it’s designed for both comfort and functionality. Perfect for transitioning between seasons.',
    relatedProducts: ['2', '4'],
    otherColors: [
      require('../assets/images/cloth1.jpg'),
      require('../assets/images/cloth2.jpg'),
      require('../assets/images/cloth3.jpg'),
    ],
  },
  {
    id: 7,
    name: 'T-SHIRT',
    price: 129.99,
    image: require('../assets/images/t_shirt_w.jpg'),
    tag: 'latest',
    category: 'Unisex',
    description: 'A premium cotton t-shirt perfect for a relaxed, stylish look. Soft to the touch and breathable, it’s designed for all-day comfort while maintaining a casual yet fashionable appearance.',
    relatedProducts: ['8', '5'],
    otherColors: [
      require('../assets/images/cloth1.jpg'),
      require('../assets/images/cloth2.jpg'),
      require('../assets/images/cloth3.jpg'),
    ],
  },
  {
    id: 8,
    name: 'VEST O',
    price: 129.99,
    image: require('../assets/images/vest_o.jpg'),
    tag: 'latest',
    category: 'Unisex',
    description: 'A modern, stylish vest made with high-quality fabric. Perfect for layering, this piece adds a touch of flair to any outfit. Available in multiple colors to suit various preferences.',
    relatedProducts: ['2', '4'],
    otherColors: [
      require('../assets/images/cloth1.jpg'),
      require('../assets/images/cloth2.jpg'),
      require('../assets/images/cloth3.jpg'),
    ],
  },

  // Add more products similarly...
];
