import React from "react";
import Title from "../../components/Global/Title/Title";
import { assets } from "../../assets/frontend_assets/assets";
import NewsLetterBox from "../../components/Global/NewsLetterBox/NewsLetterBox";

export default function About() {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t  border-gray-200">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque a
            modi quibusdam minima odit exercitationem corrupti nam. Amet
            accusantium earum repellat commodi assumenda iste in, eaque,
            laudantium ipsa rerum harum!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
            recusandae illo consectetur quasi. Aut, velit corrupti? Soluta qui
            aliquam consequuntur reprehenderit adipisci? Doloremque, rerum
            deleniti quo repudiandae sapiente necessitatibus laudantium.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Exercitationem deleniti, perspiciatis nesciunt voluptatum recusandae
            impedit libero quidem blanditiis, modi pariatur laboriosam a ex
            praesentium nulla. Quos iusto laboriosam dolores enim.
          </p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border border-gray-200 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 ">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit
            reprehenderit, tempore, alias veniam officia eligendi illum quos
            fuga vitae ab totam animi et. Quidem maxime natus voluptas, quisquam
            provident modi.
          </p>
        </div>
        <div className="border border-gray-200 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 ">
          <b>Convenience:</b>
          <p className="text-gray-600">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit
            reprehenderit, tempore, alias veniam officia eligendi illum quos
            fuga vitae ab totam animi et. Quidem maxime natus voluptas, quisquam
            provident modi.
          </p>
        </div>
        <div className="border border-gray-200 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 ">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit
            reprehenderit, tempore, alias veniam officia eligendi illum quos
            fuga vitae ab totam animi et. Quidem maxime natus voluptas, quisquam
            provident modi.
          </p>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  );
}
