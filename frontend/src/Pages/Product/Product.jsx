import React from "react";
import ProductCard from "./ProductCard.jsx";
import "./product.css"

const products = [
  // {
  //   id: 1,
  //   name: "Bastille Burl Sideboard",
  //   price: "₹174,000.00",
  //   image: "https://thot-media.thehouseofthings.com/media/catalog/product/cache/1148ab7f72254d0ec9e2adc78dc49797/7/2/72.jpg", 
  //   brand: "The Edit",
  // },
  // {
  //   id: 2,
  //   name: "Clement Inlay Console",
  //   price: "₹116,000.00",
  //   image: "https://thot-media.thehouseofthings.com/media/catalog/product/cache/1148ab7f72254d0ec9e2adc78dc49797/e/t/eterna_dining_table_1800x1200_1.jpg",
  //   brand: "The Edit",
  // },
  // {
  //   id: 3,
  //   name: "Bastille Burl Bedside Table",
  //   price: "₹65,000.00",
  //   image: "https://thot-media.thehouseofthings.com/media/catalog/product/cache/1148ab7f72254d0ec9e2adc78dc49797/b/a/bastille_burl_bedside_table_1800x1200_1.jpg",
  //   brand: "The Edit",
  // },
  // {
  //   id: 4,
  //   name: "Bastille Burl Sideboard",
  //   price: "₹174,000.00",
  //   image: "https://thot-media.thehouseofthings.com/media/catalog/product/cache/1148ab7f72254d0ec9e2adc78dc49797/7/2/72.jpg", 
  //   brand: "The Edit",
  // },
  // {
  //   id: 5,
  //   name: "Clement Inlay Console",
  //   price: "₹116,000.00",
  //   image: "https://thot-media.thehouseofthings.com/media/catalog/product/cache/1148ab7f72254d0ec9e2adc78dc49797/e/t/eterna_dining_table_1800x1200_1.jpg",
  //   brand: "The Edit",
  // },
  {
    id: 6,
    name: "Bastille Burl Bedside Table",
    price: "₹65,000.00",
    image: "https://thot-media.thehouseofthings.com/media/catalog/product/cache/1148ab7f72254d0ec9e2adc78dc49797/b/a/bastille_burl_bedside_table_1800x1200_1.jpg",
    brand: "The Edit",
  },
];

function Product() {
  return (
    <>
    <h1 className="text-center font-bold text-[3rem] mt-5">Products</h1>
    <div className="min-h-screen bg-gray-100 mx-[10%] mt-2">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div></>
  );
}

export default Product;
