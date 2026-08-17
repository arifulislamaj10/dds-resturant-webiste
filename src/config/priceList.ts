import { images, siteConfig } from "@/config/site";

/**
 * ============================================================
 *  PRICE LIST & MENU — official prices (edit here only)
 * ============================================================
 *
 * All menu and price list data comes from this file.
 * When prices change, update menuCatalog below once.
 */

export type PriceListItem = {
  name: string;
  price: string;
  note?: string;
  popular?: boolean;
};

export type PriceListCategory = {
  category: string;
  items: PriceListItem[];
};

export type MenuCategory = "chaoFan" | "specialties" | "combos";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: string;
  category: MenuCategory;
  image: string;
  popular?: boolean;
  spicy?: boolean;
};

const chaoFanImage = images.porkChopMeal;
const comboImage = images.cheesyRicePlatter;

/** Official menu — matches menu-price-list.jpg */
export const menuCatalog: MenuItem[] = [
  {
    id: "chao-fan-shanghai",
    name: "Chao Fan Shanghai",
    description: "Fried rice with shanghai rolls.",
    price: "₱80",
    category: "chaoFan",
    image: chaoFanImage,
  },
  {
    id: "chao-fan-siomai",
    name: "Chao Fan Siomai",
    description: "Fried rice with siomai.",
    price: "₱80",
    category: "chaoFan",
    image: chaoFanImage,
  },
  {
    id: "chao-fan-longganisa",
    name: "Chao Fan Longganisa",
    description: "Fried rice with longganisa.",
    price: "₱80",
    category: "chaoFan",
    image: chaoFanImage,
  },
  {
    id: "chao-fan-korean-spam",
    name: "Chao Fan Korean Spam",
    description: "Fried rice with Korean spam.",
    price: "₱90",
    category: "chaoFan",
    image: chaoFanImage,
  },
  {
    id: "chao-fan-hotdog",
    name: "Chao Fan Hotdog",
    description: "Fried rice with hotdog.",
    price: "₱90",
    category: "chaoFan",
    image: chaoFanImage,
  },
  {
    id: "chao-fan-nuggets",
    name: "Chao Fan Nuggets",
    description: "Fried rice with chicken nuggets.",
    price: "₱90",
    category: "chaoFan",
    image: chaoFanImage,
  },
  {
    id: "chao-fan-hungarian",
    name: "Chao Fan Hungarian",
    description: "Fried rice with Hungarian sausage.",
    price: "₱90",
    category: "chaoFan",
    image: chaoFanImage,
    popular: true,
  },
  {
    id: "chao-fan-fried-chicken",
    name: "Chao Fan Fried Chicken",
    description: "Fried rice with crispy fried chicken.",
    price: "₱99",
    category: "chaoFan",
    image: chaoFanImage,
    popular: true,
  },
  {
    id: "chao-fan-pork-chop",
    name: "Chao Fan Pork Chop",
    description: "Fried rice with breaded pork chop.",
    price: "₱109",
    category: "chaoFan",
    image: images.porkChopMeal,
    popular: true,
  },
  {
    id: "cheesy-fries",
    name: "Cheesy Fries",
    description: "Crispy fries topped with cheese sauce.",
    price: "₱60 / ₱100",
    category: "specialties",
    image: images.cheesySpicyCarbonara,
    popular: true,
  },
  {
    id: "cheesy-spicy-carbonara",
    name: "Cheesy Spicy Carbonara",
    description: "Spicy noodles with cheese sauce. Choose spiciness: 0%, 50%, or 100%.",
    price: "₱140",
    category: "specialties",
    image: images.cheesySpicyCarbonara,
    popular: true,
    spicy: true,
  },
  {
    id: "samyang-omelette",
    name: "Samyang Omelette",
    description: "Omelette filled with Samyang noodles and cheese sauce.",
    price: "₱165",
    category: "specialties",
    image: images.samyangOmelette,
    popular: true,
    spicy: true,
  },
  {
    id: "combo-1",
    name: "Combo 1",
    description: "Chao Fan, Hungarian w/ Nuggets & Egg",
    price: "₱139",
    category: "combos",
    image: comboImage,
  },
  {
    id: "combo-2",
    name: "Combo 2",
    description: "Chao Fan, Longganisa w/ Korean Spam & Egg",
    price: "₱120",
    category: "combos",
    image: comboImage,
  },
  {
    id: "combo-3",
    name: "Combo 3",
    description: "Chao Fan, Hotdog w/ Nuggets & Egg",
    price: "₱139",
    category: "combos",
    image: comboImage,
  },
  {
    id: "combo-4",
    name: "Combo 4",
    description: "Chao Fan, Shanghai w/ Siomai & Egg",
    price: "₱129",
    category: "combos",
    image: comboImage,
  },
  {
    id: "combo-5",
    name: "Combo 5",
    description: "Chao Fan, Hungarian w/ Siomai & Egg",
    price: "₱129",
    category: "combos",
    image: comboImage,
  },
  {
    id: "combo-6",
    name: "Combo 6",
    description: "Chao Fan, Fried Chicken w/ K. Spam & Egg",
    price: "₱139",
    category: "combos",
    image: comboImage,
  },
  {
    id: "combo-7",
    name: "Combo 7",
    description: "Cheesy Carb w/ Hungarian & Fries",
    price: "₱239",
    category: "combos",
    image: images.cheesySpicyCarbonara,
  },
  {
    id: "combo-8",
    name: "Combo 8",
    description: "Cheesy Spicy Carbonara w/ Hungarian & Seaweed",
    price: "₱235",
    category: "combos",
    image: images.cheesySpicyCarbonara,
    spicy: true,
  },
  {
    id: "combo-9",
    name: "Combo 9",
    description: "Cheesy Fries w/ Pepper Nuggets",
    price: "₱150",
    category: "combos",
    image: images.cheesySpicyCarbonara,
  },
  {
    id: "combo-10",
    name: "Combo 10",
    description: "Samyang Omelette w/ Chicken Fries",
    price: "₱269",
    category: "combos",
    image: images.samyangOmelette,
    spicy: true,
  },
  {
    id: "combo-11",
    name: "Combo 11",
    description: "Chao Fan Pork Chop w/ Spam & Egg",
    price: "₱149",
    category: "combos",
    image: images.porkChopMeal,
    popular: true,
  },
  {
    id: "combo-overload",
    name: "Combo Overload",
    description: "Chao Fan, Nuggets, Hungarian, Spam, Longganisa, Egg",
    price: "₱190",
    category: "combos",
    image: comboImage,
    popular: true,
  },
];

export const menuCategories: { id: MenuCategory; label: string }[] = [
  { id: "chaoFan", label: "Chao Fan" },
  { id: "specialties", label: "Specialties" },
  { id: "combos", label: "Combo Meals" },
];

export const menuItems = menuCatalog;

const addonItems: PriceListItem[] = [
  { name: "Egg", price: "₱15" },
  { name: "Seaweed", price: "₱35" },
  { name: "Hungarian", price: "₱55" },
  { name: "Longganisa", price: "₱25" },
  { name: "Korean Spam", price: "₱25" },
  { name: "Nuggets", price: "₱35" },
  { name: "Cheese", price: "₱30" },
  { name: "Chao Fan Rice", price: "₱35" },
];

function toPriceListItems(items: MenuItem[]): PriceListItem[] {
  return items.map((item) => ({
    name: item.name,
    price: item.price,
    note: item.description,
    popular: item.popular,
  }));
}

/** Full price list — built from menuCatalog so prices always match */
export const priceListSettings = {
  sectionLabel: "Price list",
  sectionTitle: "Menu prices",
  sectionDescription:
    "All prices in Philippine Peso (₱). Delivery fee is separate. Message us to confirm today's prices.",

  /** true = show your full menu/pricing JPEG. false = show editable text list. */
  useMenuImage: true,

  menuImage: "/images/menu-price-list.jpg",
  menuImageAlt: "DD's full menu and price list",
  orderPhones: "09335167640 / 09948504295",

  categories: [
    {
      category: "Chao fan menu",
      items: toPriceListItems(menuCatalog.filter((item) => item.category === "chaoFan")),
    },
    {
      category: "Specialties",
      items: toPriceListItems(
        menuCatalog.filter((item) => item.category === "specialties"),
      ),
    },
    {
      category: "Add-ons for carb & chao fan",
      items: addonItems,
    },
    {
      category: "DD's chao fan combo meals",
      items: toPriceListItems(
        menuCatalog.filter((item) =>
          ["combo-1", "combo-2", "combo-3", "combo-4"].includes(item.id),
        ),
      ),
    },
    {
      category: "DD's best combo special",
      items: toPriceListItems(
        menuCatalog.filter((item) =>
          item.id.startsWith("combo-") && !["combo-1", "combo-2", "combo-3", "combo-4"].includes(item.id),
        ),
      ),
    },
  ] satisfies PriceListCategory[],

  footerNote:
    "Prices may change without notice. We always confirm the final price on Messenger before cooking.",
} as const;

export function getMenuOrderUrl() {
  return siteConfig.facebook.messengerUrl;
}

export function getMenuItemById(id: string) {
  return menuCatalog.find((item) => item.id === id);
}
