import React from "react";
import {
  FaTruck,
  FaUndo,
  FaLock,
  FaGift,
  FaHeadset,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700">
      <div className="container mx-auto px-6 py-10">
        {/* Top Section with Icons */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center border-b border-gray-300 pb-14 pt-5">
          {[
            {
              icon: <FaTruck />,
              title: "Free Shipping",
              desc: "For all Orders Over $100",
            },
            {
              icon: <FaUndo />,
              title: "30 Days Returns",
              desc: "For an Exchange Product",
            },
            {
              icon: <FaLock />,
              title: "Secured Payment",
              desc: "Payment Cards Accepted",
            },
            {
              icon: <FaGift />,
              title: "Special Gifts",
              desc: "Our First Product Order",
            },
            {
              icon: <FaHeadset />,
              title: "Support 24/7",
              desc: "Contact us Anytime",
            },
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              {/* Icon with Hover Effect */}
              <div
                className="w-16 h-16 flex justify-center items-center rounded-full bg-gray-200 text-red-500 text-3xl 
                      transition-transform duration-300 hover:scale-110 hover:bg-red-500 hover:text-white mb-2 cursor-pointer"
              >
                {item.icon}
              </div>

              <span className="font-bold text-lg mb-1">{item.title}</span>
              <p className="text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-7">
          {/* Contact Us */}
          <div>
            <h3 className="font-bold text-lg mb-3">Contact us</h3>
            <p className="flex items-center">
              <FaMapMarkerAlt className="mr-2" /> 507-Union Trade Centre, France
            </p>
            <p className="flex items-center mt-2 text-red-500 font-bold">
              <FaPhone className="mr-2" /> (+91) 9876-543-210
            </p>
            <p className="flex items-center text-blue-600">
              <FaEnvelope className="mr-2" /> sales@yourcompany.com
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-bold text-lg mb-3">Products</h3>
            <ul className="space-y-2">
              <li>Prices drop</li>
              <li>New products</li>
              <li>Best sales</li>
              <li>Contact us</li>
              <li>Sitemap</li>
            </ul>
          </div>

          {/* Our Company */}
          <div>
            <h3 className="font-bold text-lg mb-3">Our Company</h3>
            <ul className="space-y-2">
              <li>Delivery</li>
              <li>Legal Notice</li>
              <li>Terms & Conditions</li>
              <li>About us</li>
              <li>Secure Payment</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-3">Subscribe to Newsletter</h3>
            <p className="text-sm mb-2">
              Get updates about special discounts & offers.
            </p>
            <input
              type="email"
              placeholder="Your Email Address"
              className="w-full px-3 py-2 border rounded-md mb-3"
            />
            <button className="w-full bg-red-500 text-white py-2 rounded-md">
              SUBSCRIBE
            </button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 border-t pt-5 text-center text-sm text-gray-500">
          <p>© 2025 ClassyShop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
