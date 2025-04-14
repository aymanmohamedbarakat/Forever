import React from "react";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
export default function Pagination({
  currentPage,
  totalPages,
  handlePageChange,
}) {
  return (
    <div className="flex flex-wrap justify-center mt-6 gap-1">
      <button
        onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
        className="px-3 py-2 bg-gray-300 text-gray-700 rounded-md mr-0.5 text-sm sm:text-base"
      >
        <GrFormPrevious />
      </button>
      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(index + 1)}
          className={`px-3 py-2 uppercase rounded-md text-sm sm:text-base md:px-4 ${
            currentPage === index + 1 ? "bg-black text-white" : "bg-gray-200"
          }`}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
        className="px-3 py-2 bg-gray-300 text-gray-700 rounded-md ml-2 text-sm sm:text-base"
      >
        <GrFormNext />
      </button>
    </div>
  );
}
