// import React from "react";
// import { Link } from "react-router-dom";
// import { currency } from "../../../store";

// export default function ProductItem({
//   id,
//   image,
//   name,
//   price,
//   bestseller,
//   category,
//   subCategory,
// }) {
//   return (
//     <Link
//       className="group block relative text-gray-700 hover:text-gray-900 transition-colors duration-300"
//       to={`/product/${id}`}
//     >
//       <div className="relative overflow-hidden rounded-lg aspect-[3/4] bg-gray-50 mb-4 shadow-sm group-hover:shadow-md transition-all">
//         {bestseller && (
//           <span className="absolute top-3 left-3 bg-black text-white text-xs px-2 py-1 rounded-full z-10">
//             Bestseller
//           </span>
//         )}
//         <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//         <img
//           className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
//           src={image[0]}
//           alt=""
//         />
//       </div>
//       <div className="space-y-1">
//         <span className="text-xs text-gray-500 uppercase tracking-wider">
//           {category}
//         </span>
//        <span> - </span>
//         <span className="text-xs text-gray-500 uppercase tracking-wider">
//           {subCategory}
//         </span>
//         <h3 className="text-sm font-medium truncate" title={name}>
//           {name}
//         </h3>
//         <p className="text-sm font-semibold text-gray-900">
//           {currency}
//           {price.toLocaleString()}
//         </p>
//       </div>
//     </Link>
//   );
// }

// import React from "react";
// import { Link } from "react-router-dom";
// import { currency } from "../../../store";

// export default function ProductItem({
//   id,
//   image,
//   name,
//   price,
//   bestseller,
//   category,
//   subCategory,
// }) {
//   return (
//     <Link
//       className="group block relative text-gray-700 hover:text-gray-900 transition-all duration-300"
//       to={`/product/${id}`}
//     >
//       <div className="relative overflow-hidden rounded-lg aspect-[3/4] bg-gray-50 mb-4 shadow-sm group-hover:shadow-md transition-all">
//         {bestseller && (
//           <span className="absolute top-3 left-3 bg-black text-white text-xs font-medium px-2 py-1 rounded-full z-10">
//             Bestseller
//           </span>
//         )}
//         <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//         <img
//           className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//           src={image[0]}
//           alt={name}
//         />
//       </div>
//       <div className="space-y-2">
//         <div className="flex items-center text-xs text-gray-500 uppercase tracking-wider">
//           <span>{category}</span>
//           <span className="mx-2 text-gray-400">•</span>
//           <span>{subCategory}</span>
//         </div>
//         <h3 className="text-sm font-medium line-clamp-2 group-hover:underline" title={name}>
//           {name}
//         </h3>
//         <p className="text-sm font-semibold text-gray-900">
//           {currency}{price.toLocaleString()}
//         </p>
//       </div>
//     </Link>
//   );
// }

import React from "react";
import { Link } from "react-router-dom";
import { currency } from "../../../store";

export default function ProductItem({
  id,
  image,
  name,
  price,
  bestseller,
  category,
  subCategory,
}) {
  return (
    <div className="group block relative text-gray-700 hover:text-gray-900 transition-colors duration-300">
      {/* Product Image Container */}
      <div className="relative overflow-hidden rounded-lg aspect-[3/4] bg-gray-50 mb-4 shadow-sm group-hover:shadow-md transition-all">
        {/* Bestseller Badge */}
        {bestseller ? (
          <span className="absolute top-3 left-3 bg-red-400 hover:scale-105 transition-transform  text-white text-xs font-medium px-2 py-1 rounded-full z-10 shadow-md">
            TopSeller
          </span>
        ) : (
          <span className="absolute top-3 left-3 bg-black hover:scale-105 transition-transform  text-white text-xs font-medium px-2 py-1 rounded-full z-10 shadow-md">
            New
          </span>
        )}

        <img
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={image[0]}
          alt={name}
          loading="lazy"
        />

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black/50 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <Link to={`/product/${id}`} aria-label={`View ${name} details`}>
            <span className="bg-white text-black text-xs font-medium px-4 py-2 rounded-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              Quick View
            </span>
          </Link>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <div className="flex items-center text-xs text-gray-500 uppercase tracking-wider">
          <span>{category}</span>
          {subCategory && (
            <>
              <span className="mx-2 text-gray-400">•</span>
              <span>{subCategory}</span>
            </>
          )}
        </div>
        <Link to={`/product/${id}`} aria-label={`View ${name} details`}>
          <h3
            className="text-sm font-medium truncate group-hover:underline decoration-gray-300 underline-offset-2"
            title={name}
          >
            {name}
          </h3>
        </Link>
        <p className="text-sm font-semibold text-gray-900">
          {currency}
          {typeof price === 'number' ? price.toLocaleString() : price}
        </p>
      </div>
    </div>
  );
}