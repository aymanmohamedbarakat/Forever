import React from "react";
import Title from "../../components/Global/Title/Title";
import { assets } from "../../assets/frontend_assets/assets";
import NewsLetterBox from "../../components/Global/NewsLetterBox/NewsLetterBox";
import { toast } from "react-toastify";

export default function Contact() {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t border-gray-400">
        <Title text1="CONTACT" text2="US" />
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          className="w-full md:max-w-[480px]"
          src={assets.contact_img}
          alt=""
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className="text-gray-500">
            54709 Willms Station <br /> Suite 350, Washington, USA
          </p>
          <p className="text-gray-500">
            Tel: (20) 555-155351 <br /> Email: Admin@forever.com
          </p>
          <p className="font-semibold text-xl text-gray-600">
            Careers at Forever
          </p>
          <p className="text-gray-500">
            Learn more about our teams and job openings.
          </p>
          <button
            onClick={() =>
              toast.info("Coming soon!", {
                position: "top-right",
                autoClose: 1300,
              })
            }
            className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500"
          >
            Explore Job
          </button>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  );
}
