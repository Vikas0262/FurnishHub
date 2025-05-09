import React from "react";
import img1 from "../../assets/categories/img1.png";
import img2 from "../../assets/categories/img2.png"; 
import img3 from "../../assets/categories/img3.png";
import img4 from "../../assets/categories/img4.png";
import img5 from "../../assets/categories/img5.avif";
import img6 from "../../assets/categories/img6.png";
// import img7 from "../../assets/categories/img7.jpg";
// import img8 from "../../assets/categories/img8.jpg";
// import img9 from "../../assets/categories/img9.jpg";
import img10 from "../../assets/categories/img10.png";

const categories = [
  { name: "Living Room", img: img1 },
  { name: "Illustration", img: img2 },
  { name: "Vector Illustrations", img: img3 },
  { name: "Mockups", img: img4 },
  { name: "Coded Templates", img: img5 },
  { name: "Web UI Kits", img: img6 },
  // { name: "Icons", img: img7 },
  // { name: "Fonts", img: img8 },
  // { name: "Outdoor Furniture", img: img9 },
  { name: "Office Furniture", img: img10 },
];

const Categories = () => {
  return (
    <div className="container px-4 py-10 mx-auto">
      <h2 className="mb-6 text-2xl font-bold">Top Categories</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-5 transition-transform duration-300 bg-gray-100 rounded-lg hover:scale-105 hover:shadow-lg"
          >
            <img
              src={category.img}
              alt={category.name}
              className="object-contain mb-3 w-14 h-14"
            />
            <p className="text-lg font-semibold text-gray-700">{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
