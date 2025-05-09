import React from "react";

const categories = [
  {
    title: "SEATING",
    items: ["All Seating", "Chairs", "Sofas", "Stools", "Chaises & Benches", "Ottomans & Poufs"],
  },
  {
    title: "TABLES",
    items: ["All Tables", "Coffee Tables", "Dining Tables", "Side & Nesting Tables", "Desks", "Consoles & Credenzas"],
  },
  {
    title: "STORAGE + ORGANIZATION",
    items: ["All Storage units", "Credenzas & Sideboards", "Cabinets & Wardrobes", "Bookcases & Shelving Units", "Bar Cabinets", "Trunks", "Dressers"],
  },
  {
    title: "BEDROOM",
    items: ["All Bedroom Furniture", "Beds", "Bed Side Tables & Night Stands", "Bed End Benches", "Dressers", "Media Units"],
  },
  {
    title: "OUTDOOR",
    items: ["All Outdoor", "Outdoor Chairs & Stools", "Outdoor Chaises & Daybeds", "Outdoor Sofas", "Outdoor Tables", "Outdoor Sets"],
  },
  {
    title: "OTHER FURNITURE",
    items: ["Room Dividers", "Coat Stands"],
  },
  {
    title: "KIDS",
    items: [],
  },
  {
    title: "READY TO SHIP",
    items: [],
  },
];

const MegaDropdown = () => (
  <div className="absolute left-0 top-full w-full bg-white shadow-2xl z-50 py-8 px-12 grid grid-cols-2 md:grid-cols-4 gap-8">
    {categories.map((cat) => (
      <div key={cat.title}>
        <h3 className="font-bold text-gray-800 mb-3 uppercase tracking-wider text-sm">{cat.title}</h3>
        <ul className="space-y-1">
          {cat.items.map((item) => (
            <li key={item}>
              <a href="#" className="text-gray-600 hover:text-red-600 text-sm transition">{item}</a>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

export default MegaDropdown;