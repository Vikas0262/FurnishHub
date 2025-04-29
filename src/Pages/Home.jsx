import React, { Suspense, lazy } from 'react';
import Hero from "../component/Hero/Hero.jsx";
import FeaturedCategories from "../component/FeaturedCategories/FeaturedCategories.jsx";

// Lazy load components that are not immediately visible
const TrendingProducts = lazy(() => import("../component/TrendingProducts/TrendingProducts.jsx"));
const CustomizeFurniture = lazy(() => import("../component/CustomizeFurniture/CustomizeFurniture.jsx"));
const ShopByRoom = lazy(() => import("../component/ShopByRoom/ShopByRoom.jsx"));
const WhyChooseUs = lazy(() => import("../component/WhyChooseUs/WhyChooseUs.jsx"));
const CustomerReviews = lazy(() => import("../component/CustomerReviews/CustomerReviews.jsx"));
const InstagramGallery = lazy(() => import("../component/InstagramGallery/InstagramGallery.jsx"));
const Newsletter = lazy(() => import("../component/Newsletter/Newsletter.jsx"));

// Loading fallback component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
  </div>
);

function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Critical components loaded immediately */}
      <main>
        <Hero />
        <FeaturedCategories />
        
        {/* Lazy loaded components wrapped in Suspense */}
        <Suspense fallback={<LoadingSpinner />}>
          <TrendingProducts />
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <CustomizeFurniture />
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <ShopByRoom />
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          {/* <WhyChooseUs /> */}
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <CustomerReviews />
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <InstagramGallery />
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <Newsletter />
        </Suspense>
      </main>
    </div>
  );
}

export default Home;