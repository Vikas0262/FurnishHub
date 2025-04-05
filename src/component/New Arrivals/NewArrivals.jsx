import React from 'react';

const images = [
  { src: 'https://thot-media.thehouseofthings.com/media/wysiwyg/NEW_ARRIVALS_MARCH_1.jpg', alt: 'Lantern' },
  { src: 'https://thot-media.thehouseofthings.com/media/wysiwyg/NEW_ARRIVALS_MARCH_2.jpg', alt: 'Chair' },
  { src: 'https://thot-media.thehouseofthings.com/media/wysiwyg/NEW_ARRIVALS_MARCH_4.jpg', alt: 'Tea Set' },
  { src: 'https://thot-media.thehouseofthings.com/media/wysiwyg/NEW_ARRIVALS_MARCH_3.jpg', alt: 'Mirror' },
  { src: 'https://thot-media.thehouseofthings.com/media/wysiwyg/NEW_ARRIVALS_MARCH_5.jpg', alt: 'Candle Holder' },
  { src: 'https://thot-media.thehouseofthings.com/media/wysiwyg/NEW_ARRIVALS_MARCH_6.jpg', alt: 'Vase' },
];

const NewArrivals = () => {
  return (
    <div className="min-h-screen p-10 bg-gradient-to-b from-gray-100 to-gray-300">
      <h2 className="text-center text-xl tracking-widest text-gray-500 uppercase">the</h2>
      <h1 className="text-center text-5xl font-bold mb-10 text-gray-800">New Arrivals</h1>
      
      <div className="grid grid-cols-3 gap-6">
        <img className="col-span-1 rounded-lg shadow-lg hover:scale-105 transition-transform" src={images[0].src} alt={images[0].alt} />
        <img className="col-span-1 rounded-lg shadow-lg hover:scale-105 transition-transform" src={images[1].src} alt={images[1].alt} />
        <img className="col-span-2 row-span-2 rounded-lg shadow-xl hover:scale-105 transition-transform" src={images[2].src} alt={images[2].alt} />
        <img className="col-span-2 rounded-lg shadow-lg hover:scale-105 transition-transform" src={images[3].src} alt={images[3].alt} />
        <img className="col-span-1 rounded-lg shadow-lg hover:scale-105 transition-transform" src={images[4].src} alt={images[4].alt} />
        <img className="col-span-1 rounded-lg shadow-lg hover:scale-105 transition-transform" src={images[5].src} alt={images[5].alt} />
      </div>
    </div>
  );
};

export default NewArrivals;
