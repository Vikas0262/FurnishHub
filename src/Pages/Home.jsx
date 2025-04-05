import React from 'react';
import Header from "../component/Header/Header.jsx";
import Hero from "../component/Hero/Hero.jsx";
import FeaturedCategories from "../component/FeaturedCategories/FeaturedCategories.jsx";
import TrendingProducts from "../component/TrendingProducts/TrendingProducts.jsx";
import CustomizeFurniture from "../component/CustomizeFurniture/CustomizeFurniture.jsx";
import ShopByRoom from "../component/ShopByRoom/ShopByRoom.jsx";
import WhyChooseUs from "../component/WhyChooseUs/WhyChooseUs.jsx";
import CustomerReviews from "../component/CustomerReviews/CustomerReviews.jsx";
import InstagramGallery from "../component/InstagramGallery/InstagramGallery.jsx";
import Newsletter from "../component/Newsletter/Newsletter.jsx";
import Footer from "../component/Footer/Footer.jsx";

function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <FeaturedCategories />
        <TrendingProducts />
        <CustomizeFurniture />
        <ShopByRoom />
        <WhyChooseUs />
        <CustomerReviews />
        <InstagramGallery />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}

export default Home;