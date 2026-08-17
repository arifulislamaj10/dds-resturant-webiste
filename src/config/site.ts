export const images = {
  logo: "/images/logo.jpg",
  cheesySpicyCarbonara: "/images/koriyaencheche-noodles.jpg",
  samyangOmelette: "/images/chessycorian.jpg",
  dynamiteLumpia: "/images/dainamite.jpg",
  porkChopMeal: "/images/chao-fan-pork-chop.jpg",
  cheesyRicePlatter: "/images/richeegee.jpg",
  bulkNoodles: "/images/balkorder.jpg",
  dynamiteTray: "/images/dainimte.jpg",
  dynamiteBulkPack: "/images/dainamitebulkorder.jpg",
  lumpiaDynamiteTray: "/images/dainaimte2.jpg",
} as const;

export const siteConfig = {
  name: "DD's",
  tagline: "Homemade food delivery in San Fernando, Pampanga",
  description:
    "DD's sells chao fan, combo meals, pasta, omelette, and fries. Order on Facebook Messenger. We deliver around San Fernando through Lalamove or Maxim.",
  url: "https://www.facebook.com/profile.php?id=100069057264213",
  locale: "en_PH",
  phone: "09335167640",
  phoneAlt: "09948504295",
  email: "madamshai92@gmail.com",
  address: {
    area: "San Agustin",
    city: "San Fernando",
    region: "Pampanga",
    country: "Philippines",
    postalCode: "2000",
  },
  facebook: {
    pageUrl: "https://www.facebook.com/profile.php?id=100069057264213",
    pageName: "DD's",
    messengerUrl: "https://m.me/100069057264213",
  },
  hours: [
    { day: "Monday to Sunday", time: "See open hours section on this website" },
  ],
  deliveryAreas: [
    "San Agustin",
    "San Fernando City",
    "St. Jude Village",
    "Dolores",
    "Sindalan",
    "Nearby areas in Pampanga",
  ],
  deliveryPartners: ["Lalamove", "Maxim"],
  taglines: {
    primary: "Homemade food delivery in San Fernando, Pampanga",
    subtitle:
      "Good food, fair prices, easy ordering. Delivered around San Fernando.",
    cta: "Order now",
  },
  stats: [
    { value: "1.9K+", label: "Facebook followers" },
    { value: "100%", label: "Recommended" },
    { value: "500+", label: "Orders done" },
    { value: "50+", label: "Bulk orders" },
  ],
  keywords: [
    "DD's food delivery",
    "cheesy spicy carbonara San Fernando",
    "samyang omelette Pampanga",
    "homemade food delivery San Fernando",
    "food delivery San Fernando Pampanga",
    "order food messenger Philippines",
  ],
} as const;

export type HeroSlide = {
  id: string;
  image: string;
  tag: string;
  title: string;
  description: string;
  price: string;
  orderItem: string;
};

export const heroSlides: HeroSlide[] = [
  {
    id: "cheesy-spicy-carbonara",
    image: images.cheesySpicyCarbonara,
    tag: "Best seller",
    title: "Cheesy Spicy Carbonara",
    description: "Spicy noodles with cheese sauce. Spiciness: 0%, 50%, or 100%.",
    price: "₱140",
    orderItem: "Cheesy Spicy Carbonara",
  },
  {
    id: "samyang-omelette",
    image: images.samyangOmelette,
    tag: "Customer favorite",
    title: "Samyang Omelette",
    description: "Omelette filled with noodles, cheese sauce, and toppings.",
    price: "₱165",
    orderItem: "Samyang Omelette",
  },
  {
    id: "combo-11",
    image: images.porkChopMeal,
    tag: "Best combo",
    title: "Combo 11",
    description: "Chao Fan Pork Chop w/ Spam & Egg",
    price: "₱149",
    orderItem: "Combo 11 - Chao Fan Pork Chop w/ Spam & Egg",
  },
  {
    id: "combo-overload",
    image: images.cheesyRicePlatter,
    tag: "Heavy meal",
    title: "Combo Overload",
    description: "Chao Fan, Nuggets, Hungarian, Spam, Longganisa, Egg",
    price: "₱190",
    orderItem: "Combo Overload",
  },
  {
    id: "combo-1",
    image: images.cheesyRicePlatter,
    tag: "Combo meal",
    title: "Combo 1",
    description: "Chao Fan, Hungarian w/ Nuggets & Egg",
    price: "₱139",
    orderItem: "Combo 1",
  },
];

export type FacebookPostType = "photo" | "video" | "promo" | "review";

/**
 * Add new Facebook-style posts here when you post on Facebook.
 * - photo: food photo (put file in public/images/)
 * - video: add video to public/videos/ as videoSrc, OR use facebookUrl only
 * - promo: special offer with promoPrice
 * - review: customer feedback (review text stays in Tagalog if you want)
 */
export type FacebookPost = {
  id: string;
  date: string;
  dayLabel: string;
  title: string;
  caption: string;
  image: string;
  type: FacebookPostType;
  tag?: string;
  promoPrice?: string;
  videoSrc?: string;
  facebookUrl?: string;
};

export const facebookPosts: FacebookPost[] = [
  {
    id: "post-1",
    date: "Aug 17, 2026",
    dayLabel: "Today",
    title: "Cheesy Spicy Carbonara",
    caption: "Fresh batch today. Ready for delivery.",
    image: images.cheesySpicyCarbonara,
    type: "photo",
    tag: "Best seller",
    facebookUrl: siteConfig.facebook.pageUrl,
  },
  {
    id: "post-2",
    date: "Aug 17, 2026",
    dayLabel: "Today",
    title: "Weekend promo",
    caption: "Order 2 pasta items and get free cheesy garlic bread.",
    image: images.dynamiteLumpia,
    type: "promo",
    tag: "Promo",
    promoPrice: "Free side dish",
    facebookUrl: siteConfig.facebook.pageUrl,
  },
  {
    id: "post-3",
    date: "Aug 16, 2026",
    dayLabel: "Yesterday",
    title: "Samyang Omelette cooking video",
    caption: "Watch how we prepare our Samyang Omelette.",
    image: images.samyangOmelette,
    type: "video",
    facebookUrl: siteConfig.facebook.pageUrl,
  },
  {
    id: "post-4",
    date: "Aug 16, 2026",
    dayLabel: "Yesterday",
    title: "Customer feedback",
    caption: "Thank you for the 5-star recommendation on Facebook.",
    image: images.cheesyRicePlatter,
    type: "review",
    tag: "5 stars",
    facebookUrl: siteConfig.facebook.pageUrl,
  },
  {
    id: "post-5",
    date: "Aug 15, 2026",
    dayLabel: "2 days ago",
    title: "Dynamite Lumpia",
    caption: "New batch fried today. Crispy and ready to go.",
    image: images.dynamiteLumpia,
    type: "photo",
  },
  {
    id: "post-6",
    date: "Aug 14, 2026",
    dayLabel: "3 days ago",
    title: "Bulk orders packed",
    caption: "12 boxes ready for office lunch delivery.",
    image: images.bulkNoodles,
    type: "photo",
    tag: "Bulk",
  },
];

export type BulkOrder = {
  id: string;
  title: string;
  quantity: string;
  location: string;
  date: string;
  image: string;
  description: string;
  eventType: string;
};

export const completedBulkOrders: BulkOrder[] = [
  {
    id: "bulk-1",
    title: "Cheesy noodle bulk order",
    quantity: "12 meals",
    location: "San Fernando City",
    date: "Aug 10, 2026",
    image: images.bulkNoodles,
    description:
      "Cheesy spicy noodles packed in boxes. Delivered on time for office lunch.",
    eventType: "Office",
  },
  {
    id: "bulk-2",
    title: "Dynamite lumpia tray",
    quantity: "2 large trays",
    location: "St. Jude Village",
    date: "Aug 6, 2026",
    image: images.lumpiaDynamiteTray,
    description:
      "Dynamite lumpia and spring rolls for a birthday party. Finished fast.",
    eventType: "Birthday",
  },
  {
    id: "bulk-3",
    title: "Dynamite bulk packs",
    quantity: "25 packs",
    location: "Dolores, Pampanga",
    date: "Jul 28, 2026",
    image: images.dynamiteBulkPack,
    description:
      "Cheesy pork, cheesy ham, and cheese overload dynamite for a family event.",
    eventType: "Family",
  },
];

export const orderSteps = [
  {
    step: "1",
    title: "Pick your order",
    description:
      "Check the menu on this website. Write down what you want and how many.",
  },
  {
    step: "2",
    title: "Tap Order",
    description:
      "Use the Order button at the bottom right of the screen to message us.",
  },
  {
    step: "3",
    title: "Confirm and pay",
    description:
      "We confirm the price and delivery time. Pay via GCash, Maya, or COD.",
  },
  {
    step: "4",
    title: "Wait for delivery",
    description:
      "We cook after confirmation. Delivery via Lalamove or Maxim.",
  },
];

export const testimonials = [
  {
    name: "Maria, San Agustin",
    text: "Ang sarap ng carbonara nila. Order ako almost every week. Mabilis din mag-reply sa Messenger.",
    rating: 5,
  },
  {
    name: "Jayson, San Fernando",
    text: "Yung Samyang Omelette ang favorite ko. Malaki serving at mainit pa pag dating.",
    rating: 5,
  },
  {
    name: "Facebook review",
    text: "Recommended talaga. Sulit price at hindi tinipid sa cheese. Delivery din mabilis.",
    rating: 5,
  },
];

export const faqs = [
  {
    question: "How do I place an order?",
    answer:
      "Tap the Order button at the bottom right of the screen. Send the item name, quantity, address, and phone number. We confirm everything before we start cooking.",
  },
  {
    question: "How much is the delivery fee?",
    answer:
      "It depends on your location. We use Lalamove or Maxim. We send the exact fee after you share your address.",
  },
  {
    question: "Do you accept bulk orders?",
    answer:
      "Yes. For parties or large groups, message us at least 1 day ahead so we can prepare properly.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "GCash, Maya, and cash on delivery. We send payment details after your order is confirmed.",
  },
];
