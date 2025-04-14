import React from "react";

export default function NewsLetterBox() {
  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe now & get 20% off
      </p>
      <p className="text-gray-400 mt-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo qui ex
        veritatis.
      </p>
      <form
        action=""
        className="w-full sm:w-1/2 m-auto flex items-center gap-2 mx-auto my-6 pl-3 border border-gray-200"
      >
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full sm:flex-1 outline-none "
          required
        />
        <button className="bg-black text-white rounded-md text-xs px-10 py-4">
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
}
