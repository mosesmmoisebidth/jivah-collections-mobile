import {
  MaterialIcons,
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

export const categories = [
  {
    name: "ACCESSORIES",
    icon: <MaterialIcons name="widgets" size={24} color="black" />,
    image:
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZnJlZSUyMGltYWdlcyUyMGFjY2Vzc29yaWVzfGVufDB8fDB8fHww", // Example accessory image
  },
  {
    name: "BABY",
    icon: <FontAwesome5 name="baby" size={24} color="black" />,
    image:
      "https://plus.unsplash.com/premium_photo-1670443904610-131c2cd47a41?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmFieSUyMGNsb3RoZXMlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D", // Example baby image
  },
  {
    name: "BAG",
    icon: <MaterialIcons name="shopping-bag" size={24} color="black" />,
    image:
      "https://images.unsplash.com/photo-1529025530948-67e8a5c69b58?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bG91aXMlMjB2dWl0dG9uJTIwYmFnc3xlbnwwfHwwfHx8MA%3D%3D", // Example bag image
  },
  {
    name: "BOTH",
    icon: <MaterialIcons name="merge-type" size={24} color="black" />,
    image:
      "http://t3.gstatic.com/licensed-image?q=tbn:ANd9GcQAgfBNw6-wqxp06D8djsYPnrWpVQfsY5IUvEoqKxI5tLd5Krznqd4_ZdGXAKsQtn44nP_CZBE_IjACD_D8jZw", // Example merging categories image
  },
  {
    name: "BRACELET",
    icon: <MaterialCommunityIcons name="necklace" size={24} color="black" />,
    image:
      "https://plus.unsplash.com/premium_photo-1681276170683-706111cf496e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnJhY2VsZXRlJTIwaW1hZ2VzfGVufDB8fDB8fHww", // Example bracelet image
  },
  {
    name: "CAP",
    icon: (
      <MaterialIcons
        name="airline-seat-recline-extra"
        size={24}
        color="black"
      />
    ),
    image:
      "data:image/jpeg;base64,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", // Example cap image
  },
  {
    name: "CLASSIC",
    icon: <FontAwesome name="star" size={24} color="black" />,
    image:
      "data:image/jpeg;base64,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", // Classic style image
  },
  {
    name: "COMPLETE",
    icon: <MaterialIcons name="check-circle" size={24} color="black" />,
    image:
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZnJlZSUyMGltYWdlcyUyMGFjY2Vzc29yaWVzfGVufDB8fDB8fHww", // Completed fashion look
  },
  {
    name: "DRESSING",
    icon: <MaterialIcons name="checkroom" size={24} color="black" />,
    image:
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZnJlZSUyMGltYWdlcyUyMGFjY2Vzc29yaWVzfGVufDB8fDB8fHww", // Dressing room image
  },
  {
    name: "GENERAL",
    icon: <MaterialIcons name="category" size={24} color="black" />,
    image:
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZnJlZSUyMGltYWdlcyUyMGFjY2Vzc29yaWVzfGVufDB8fDB8fHww", // General category style image
  },
  {
    name: "HAT",
    icon: <FontAwesome name="archive" size={24} color="black" />,
    image:
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZnJlZSUyMGltYWdlcyUyMGFjY2Vzc29yaWVzfGVufDB8fDB8fHww",// Hat image
  },
  {
    name: "JACKET",
    icon: <MaterialIcons name="checkroom" size={24} color="black" />,
    image:
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZnJlZSUyMGltYWdlcyUyMGFjY2Vzc29yaWVzfGVufDB8fDB8fHww", // Jacket image
  },
  {
    name: "LATEST",
    icon: <MaterialIcons name="new-releases" size={24} color="black" />,
    image:
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZnJlZSUyMGltYWdlcyUyMGFjY2Vzc29yaWVzfGVufDB8fDB8fHww",// Latest fashion trend image
  },
  {
    name: "MAN",
    icon: <FontAwesome name="male" size={24} color="black" />,
    image:
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZnJlZSUyMGltYWdlcyUyMGFjY2Vzc29yaWVzfGVufDB8fDB8fHww", // Men's fashion image
  },
  {
    name: "MEN",
    icon: <FontAwesome name="male" size={24} color="black" />,
    image:
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZnJlZSUyMGltYWdlcyUyMGFjY2Vzc29yaWVzfGVufDB8fDB8fHww", // Men's category image
  },
  {
    name: "PANT",
    icon: <MaterialIcons name="pan-tool" size={24} color="black" />,
    image:
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZnJlZSUyMGltYWdlcyUyMGFjY2Vzc29yaWVzfGVufDB8fDB8fHww",// Pant image
  },
  {
    name: "PARFUM",
    icon: <MaterialIcons name="emoji-nature" size={24} color="black" />,
    image:
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZnJlZSUyMGltYWdlcyUyMGFjY2Vzc29yaWVzfGVufDB8fDB8fHww", // Perfume bottle image
  },
  {
    name: "RING",
    icon: <FontAwesome5 name="ring" size={24} color="black" />,
    image:
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZnJlZSUyMGltYWdlcyUyMGFjY2Vzc29yaWVzfGVufDB8fDB8fHww", // Ring image
  },
  {
    name: "SHADES",
    icon: <MaterialIcons name="remove-red-eye" size={24} color="black" />,
    image:
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZnJlZSUyMGltYWdlcyUyMGFjY2Vzc29yaWVzfGVufDB8fDB8fHww",// Shades image
  },
  {
    name: "SHIRT",
    icon: <MaterialIcons name="checkroom" size={24} color="black" />,
    image:
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZnJlZSUyMGltYWdlcyUyMGFjY2Vzc29yaWVzfGVufDB8fDB8fHww", // Shirt image
  },
  {
    name: "SHOES",
    icon: <MaterialIcons name="directions-walk" size={24} color="black" />,
    image:
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZnJlZSUyMGltYWdlcyUyMGFjY2Vzc29yaWVzfGVufDB8fDB8fHww", // Shoes image
  },
  {
    name: "SHORTS",
    icon: <MaterialIcons name="short-text" size={24} color="black" />,
    image:
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZnJlZSUyMGltYWdlcyUyMGFjY2Vzc29yaWVzfGVufDB8fDB8fHww", // Shorts image
  },
  {
    name: "SKIRTS",
    icon: <MaterialIcons name="checkroom" size={24} color="black" />,
    image:
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZnJlZSUyMGltYWdlcyUyMGFjY2Vzc29yaWVzfGVufDB8fDB8fHww", // Skirt image
  },
  {
    name: "SUITS",
    icon: <FontAwesome name="suitcase" size={24} color="black" />,
    image:
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZnJlZSUyMGltYWdlcyUyMGFjY2Vzc29yaWVzfGVufDB8fDB8fHww", // Suit image
  },
  {
    name: "SWEATER",
    icon: <FontAwesome5 name="tshirt" size={24} color="black" />,
    image:
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZnJlZSUyMGltYWdlcyUyMGFjY2Vzc29yaWVzfGVufDB8fDB8fHww", // Sweater image
  },
  {
    name: "T_SHIRTS",
    icon: <FontAwesome5 name="t-shirt" size={24} color="black" />,
    image:
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZnJlZSUyMGltYWdlcyUyMGFjY2Vzc29yaWVzfGVufDB8fDB8fHww", // T-shirt image
  },
  {
    name: "TOPS",
    icon: <MaterialIcons name="checkroom" size={24} color="black" />,
    image:
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZnJlZSUyMGltYWdlcyUyMGFjY2Vzc29yaWVzfGVufDB8fDB8fHww", // Top fashion image
  },
  {
    name: "TROUSER",
    icon: <MaterialIcons name="line-weight" size={24} color="black" />,
    image:
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZnJlZSUyMGltYWdlcyUyMGFjY2Vzc29yaWVzfGVufDB8fDB8fHww",// Trouser image
  },
  {
    name: "WATCH",
    icon: <MaterialIcons name="watch-later" size={24} color="black" />,
    image:
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZnJlZSUyMGltYWdlcyUyMGFjY2Vzc29yaWVzfGVufDB8fDB8fHww",// Watch image
  },
  {
    name: "WATCHES",
    icon: <MaterialIcons name="watch-later" size={24} color="black" />,
    image:
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZnJlZSUyMGltYWdlcyUyMGFjY2Vzc29yaWVzfGVufDB8fDB8fHww", // Watches image
  },
  {
    name: "WOMAN",
    icon: <FontAwesome name="female" size={24} color="black" />,
    image:
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZnJlZSUyMGltYWdlcyUyMGFjY2Vzc29yaWVzfGVufDB8fDB8fHww", // Woman image
  },
  {
    name: "WOMEN",
    icon: <FontAwesome name="female" size={24} color="black" />,
    image:
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZnJlZSUyMGltYWdlcyUyMGFjY2Vzc29yaWVzfGVufDB8fDB8fHww", // Women fashion image
  },
  {
    name: "DRESSES",
    icon: <MaterialIcons name="checkroom" size={24} color="black" />,
    image:
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZnJlZSUyMGltYWdlcyUyMGFjY2Vzc29yaWVzfGVufDB8fDB8fHww", // Dresses image
  },
];
