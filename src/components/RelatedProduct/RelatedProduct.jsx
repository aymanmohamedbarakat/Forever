import React, { useEffect, useState } from "react";
import { useProducts } from "../../store";
import Title from "../Global/Title/Title";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductItem from "../Global/ProductItem/ProductItem";
import { Autoplay } from "swiper/modules";

export default function RelatedProduct({ category, subCategory }) {
  const { products } = useProducts();
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productCopy = products.slice();
      productCopy = productCopy.filter((item) => category === item.category)
      productCopy = productCopy.filter((item) => subCategory === item.subCategory)
      // console.log(productCopy.slice(0 ,5))
      setRelated(productCopy.slice(0 ,5));
    }
  }, [products , category ,subCategory]);
  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1={"RELATED"} text2={"PRODUCTS"} />
      </div>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={4}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 10 },
          576: { slidesPerView: 2, spaceBetween: 15 },
          992: { slidesPerView: 3, spaceBetween: 20 },
          1200: { slidesPerView: 4, spaceBetween: 20 },
        }}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {related.map((product, index) => (
            <SwiperSlide key={index}>
              <ProductItem
                key={index}
                id={product._id}
                image={product.image}
                name={product.name}
                price={product.price}
                bestseller={product.best_seller}
                category={product.category}
                subCategory={product.subCategory}
              />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
}
