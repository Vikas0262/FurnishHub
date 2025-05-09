import React from "react";
import { Heart } from "lucide-react";

const ProductCard = ({ product }) => {
  return (
    <div className="">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-60 object-cover rounded-lg"
      />
      <button className="absolute top-4 right-4">
        {/* <Heart className="text-gray-400 hover:text-red-500" /> */}
      </button>
      <h3 className="text-lg font-semibold mt-3">{product.name}</h3>
      <p className="text-gray-500">By {product.brand}</p>
      <p className="text-xl font-bold m">{product.price}</p>
      <button className="mt-2 bg-black text-white text-sm px-2 py-1">
        CUSTOMIZABLE
      </button>
    </div>
  );
};

export default ProductCard;
