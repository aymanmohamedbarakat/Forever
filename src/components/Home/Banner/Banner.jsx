import React from "react";
import { assets } from "../../../assets/frontend_assets/assets";

export default function Banner() {
  return (
    <div className="flex flex-col sm:flex-row border border-gray-300 rounded-lg overflow-hidden">
      {/* LeftSide */}
      <div className="w-full sm:w-1/2 py-12 sm:py-0 flex items-center justify-center bg-gray-50">
        <div className="text-gray-800 sm:px-10 px-6 max-w-md">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 md:w-11 h-0.5 bg-gray-800"></span>
            <p className="font-medium text-sm md:text-base uppercase tracking-wider">
              Our Bestsellers
            </p>
          </div>
          <h1 className="prata-regular text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            Latest Arrivals
          </h1>
          <div className="flex items-center gap-2 group cursor-pointer">
            <p className="font-semibold text-sm md:text-base hover:text-gray-600 transition-colors">
              Shop Now
            </p>
            <span className="w-8 md:w-11 h-px bg-gray-800 group-hover:w-12 transition-all"></span>
          </div>
        </div>
      </div>

      {/* RightSide */}
      <div className="w-full sm:w-1/2">
        <img
          className="w-full h-full object-cover"
          src={assets.hero_img}
          alt="Latest arrivals collection"
        />
      </div>
    </div>
  );
}
