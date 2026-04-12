import { PiListChecksFill } from "react-icons/pi";
import { MdSpaceDashboard } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import menImage from "../assets/menImage.jpg";
import { icons, ShirtIcon } from "lucide-react";

export const registerFormControl = [
  {
    name: "username",
    label: "User Name",
    placeholder: "User name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Your Email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Your Password",
    componentType: "input",
    type: "password",
  },
];

export const LoginFormControl = [
  {
    name: "email",
    label: "Email",
    placeholder: "Your Email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Your Password",
    componentType: "input",
    type: "password",
  },
];

export const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: MdSpaceDashboard,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: PiListChecksFill,
  },
  {
    id: "product",
    label: "Product",
    path: "/admin/products",
    icon: FaShoppingCart,
  },
];

export const genderwiseProducts = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: ShirtIcon },
  { id: "kids", label: "Kids", icon: ShirtIcon },
  { id: "accessories", label: "Accessories", icon: ShirtIcon },
  { id: "mobiles", label: "Mobiles", icon: ShirtIcon },
  { id: "laptops", label: "Laptops", icon: ShirtIcon },
];

export const addProductFormElements = [
  {
    options: [
      { value: "men", label: "Men" },
      { value: "women", label: "Women" },
      { value: "kids", label: "Kids" },
      { value: "accessories", label: "Accessories" },
      { value: "mobiles", label: "Mobiles" },
      { value: "laptops", label: "Laptops" },
    ],
  },

  {
    options: [
      { value: "nike", label: "Nike" },
      { value: "adidas", label: "Adidas" },
      { value: "puma", label: "Puma" },
      { value: "levi", label: "Levi's" },
      { value: "zara", label: "Zara" },
      { value: "h&m", label: "H&M" },
      {
        value: "samsung",
        label: "Samsung",
      },
      {
        value: "apple",
        label: "Apple",
      },
      {
        value: "asus",
        label: "ASUS",
      },
    ],
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "products",
    label: "Products",
    path: "/shop/productList",
  },
  {
    id: "categories",
    label: "Categories",
    path: "/shop/categories",
  },
  {
    id: "about us",
    label: "About us",
    path: "/shop/about",
  },
  {
    id: "contactus",
    label: "Contact Us",
    path: "/shop/contact",
  },
];

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const CategoryOptionMap = {
  men: "Men",
  women: "Women",
  kids: "Kids",
  accessories: "Accessories",
  footwear: "Footware",
  mobiles: "Mobile",
  laptops: "Laptops",
};

export const BrandOptionMap = {
  nike: "Nike",
  zara: "Zara",
  "h&m": "H&M",
  samsung: "Samsung",
  apple: "Apple",
  asus: "ASUS",
};

export const filterOptions = {
  Category: [
    { id: "men", label: "Men" },
    { id: "women", label: "Women" },
    { id: "kids", label: "Kids" },
    { id: "accessories", label: "Accessories" },
    { id: "footwear", label: "Footwear" },
    { id: "mobiles", label: "Mobiles" },
    { id: "laptops", label: "Laptops" },
  ],
  Brand: [
    { id: "nike", label: "Nike" },
    { id: "zara", label: "Zara" },
    { id: "h&m", label: "H&M" },
    {
      id: "samsung",
      label: "Samsung",
    },
    {
      id: "apple",
      label: "Apple",
    },
    {
      id: "asus",
      label: "ASUS",
    },
  ],
};

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];
