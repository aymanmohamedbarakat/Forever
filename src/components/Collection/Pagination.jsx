// import React from "react";
// import { GrFormPrevious } from "react-icons/gr";
// import { GrFormNext } from "react-icons/gr";
// export default function Pagination({
//   currentPage,
//   totalPages,
//   handlePageChange,
// }) {
//   return (
//     <div className="flex flex-wrap justify-center mt-6 gap-1">
//       <button
//         onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
//         className="px-3 py-2 bg-gray-300 text-gray-700 rounded-md mr-0.5 text-sm sm:text-base"
//       >
//         <GrFormPrevious />
//       </button>
//       {Array.from({ length: totalPages }).map((_, index) => (
//         <button
//           key={index}
//           onClick={() => handlePageChange(index + 1)}
//           className={`px-3 py-2 uppercase rounded-md text-sm sm:text-base md:px-4 ${
//             currentPage === index + 1 ? "bg-black text-white" : "bg-gray-200"
//           }`}
//         >
//           {index + 1}
//         </button>
//       ))}
//       <button
//         onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
//         className="px-3 py-2 bg-gray-300 text-gray-700 rounded-md ml-2 text-sm sm:text-base"
//       >
//         <GrFormNext />
//       </button>
//     </div>
//   );
// }

import React from "react";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";

export default function Pagination({
  currentPage,
  totalPages,
  handlePageChange,
}) {
  return (
    <div className="flex flex-wrap justify-center items-center mt-8 gap-2">
      <button
        onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className={`flex items-center justify-center h-9 w-9 rounded-md text-sm transition-all duration-200 ${
          currentPage === 1
            ? "bg-gray-50 text-gray-300 cursor-not-allowed border border-gray-100"
            : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300"
        }`}
        aria-label="Previous page"
      >
        <GrFormPrevious className="text-lg" />
      </button>

      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(index + 1)}
          className={`min-w-9 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
            currentPage === index + 1
              ? "bg-black text-white border border-black"
              : index + 1 === "..."
              ? "bg-transparent text-gray-500 cursor-default border-none"
              : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300"
          }`}
          aria-label={
            index + 1 === "..." ? "More pages" : `Go to page ${index + 1}`
          }
          aria-current={currentPage === index + 1 ? "page" : undefined}
        >
          {index + 1}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className={`flex items-center justify-center h-9 w-9 rounded-md text-sm transition-all duration-200 ${
          currentPage === totalPages
            ? "bg-gray-50 text-gray-300 cursor-not-allowed border border-gray-100"
            : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300"
        }`}
        aria-label="Next page"
      >
        <GrFormNext className="text-lg" />
      </button>
    </div>
  );
}
