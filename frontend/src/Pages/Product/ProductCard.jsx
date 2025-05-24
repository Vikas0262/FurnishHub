import React from "react";
import { Heart } from "lucide-react";

const ProductCard = ({ product }) => {
  return (
    <div className="">
      <div className="relative w-full h-60 bg-gray-100 rounded-lg overflow-hidden">
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0].url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
            No Image Available
          </div>
        )}
      </div>
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
