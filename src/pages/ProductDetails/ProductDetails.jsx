import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { currency, useAuthStore, useCartStore, useProducts } from "../../store";
import { assets } from "../../assets/frontend_assets/assets";
import RelatedProduct from "../../components/RelatedProduct/RelatedProduct";
import { FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";

export default function ProductDetails() {
  const { productId } = useParams();
  const [productData, setProductData] = useState(false);
  const { products } = useProducts();
  const [imageProduct, setImageProduct] = useState("");
  const [size, setSize] = useState("");
  const { addToCart } = useCartStore();
  const { isAuthenticated, addToWishlist, removeFromWishlist, isInWishlist } =
    useAuthStore();
  const productInWishlist = productId ? isInWishlist(productId) : false;
  // console.log(productId)

  const getProductData = async () => {
    products.map((items) => {
      if (items._id == productId) {
        setProductData(items);
        // console.log(items);
        setImageProduct(items.image[0]);
      }
    });
  };

  //Add To Cart
  const handleAddToCart = () => {
    addToCart(productData._id, size);
  };

  // Handle wishlist toggle
  const handleWishlistToggle = () => {
    if (productInWishlist) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
  };

  useEffect(() => {
    getProductData();
  }, [products, productId]);
  return (
    <>
      {productData ? (
        <div className="border-t border-gray-300 pt-10 transition-opacity ease-in duration-500 opacity-100">
          {/* ----------------- Product Data ----------------- */}
          <div className="flex flex-col sm:flex-row gap-12 sm:gap-12">
            {/* ----------------- Product Image ----------------- */}
            <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
              <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
                {productData.image.map((item, index) => (
                  <img
                    key={index}
                    src={item}
                    className={`w-[24%] sm:w-full sm:mb-3 shrink-0 cursor-pointer ${
                      item === item ? "border border-gray-500" : ""
                    }`}
                    alt=""
                    onClick={() => setImageProduct(item)}
                  />
                ))}
              </div>
              <div className="w-full sm:w-4/5">
                <img src={imageProduct} className="w-full h-auto" alt="" />
              </div>
            </div>
            {/* ----------------- Product Details ----------------- */}
            <div className="flex-1">
              <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
              <div className="flex items-center gap-1 mt-2">
                <img src={assets.star_icon} alt="" className="w-3 5" />
                <img src={assets.star_icon} alt="" className="w-3 5" />
                <img src={assets.star_icon} alt="" className="w-3 5" />
                <img src={assets.star_icon} alt="" className="w-3 5" />
                <img src={assets.star_dull_icon} alt="" className="w-3 5" />
                <p className="pl-2">{122}</p>
              </div>
              <p className="mt-5 text-3xl font-medium">
                {currency}
                {productData.price}
              </p>
              <p className="mt-5 text-gray-500 md:w-4/5">
                {productData.description}
              </p>
              <div className="flex flex-col gap-4 my-8">
                <p>Select Size</p>
                <div className="flex gap-2">
                  {productData.sizes.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setSize(item)}
                      className={`border px-4 py-2 bg-gray-100 ${
                        item === size ? "border-orange-500" : ""
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-4 mt-5 mb-5">
                <p className="text-sm text-gray-500">Delivery in 3-5 days</p>
                <p className="text-sm text-gray-500">Free Delivery</p>
              </div>
              <div className="flex flex-wrap gap-4">
                {isAuthenticated && (
                  <button
                    onClick={handleWishlistToggle}
                    className={`flex items-center justify-center px-4 py-2 border ${
                      productInWishlist
                        ? "border-red-500 text-red-500"
                        : "border-gray-300 text-gray-700"
                    } rounded hover:bg-gray-50`}
                  >
                    {productInWishlist ? (
                      <FaHeart className="mr-2" />
                    ) : (
                      <FaRegHeart className="mr-2" />
                    )}
                    {productInWishlist
                      ? "Remove from Wishlist"
                      : "Add to Wishlist"}
                  </button>
                )}
                <button
                  onClick={handleAddToCart}
                  className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 flex items-center"
                >
                  <FaShoppingCart className="mr-2" />
                  ADD TO CART
                </button>
              </div>
              <hr className="mt-8 sm:w-4/5 border border-gray-300" />
              <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
                <p>100% Original Product.</p>
                <p>Cash on delivery is available on this product.</p>
                <p>Easy return and exchange policy within 7 days.</p>
              </div>
            </div>
          </div>
          {/* ----------------- Description & Review Section ----------------- */}
          <div className="mt-20">
            <div className="flex">
              <b className="border border-gray-300 px-5 py-3 text-sm">
                Description
              </b>
              <p className="border border-gray-300 px-5 py-3 text-sm">
                Review (122)
              </p>
            </div>
            <div className="flex flex-col gap-4 border border-gray-300 px-6 py-6 text-sm text-gray-500 ">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut
                ducimus fugit ex perspiciatis vitae inventore unde earum impedit
                architecto. Maiores nulla tempora, a perferendis dolor nesciunt
                animi labore odit ad.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
                ratione quas placeat harum fugiat quis, inventore aperiam
                blanditiis quae debitis quasi natus, laboriosam dolorem dolores
                optio veritatis, obcaecati libero suscipit.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
                ratione quas placeat harum fugiat quis, inventore aperiam
                blanditiis quae debitis quasi natus, laboriosam dolorem dolores
                optio veritatis, obcaecati libero suscipit.
              </p>
            </div>
          </div>
          {/* ----------------- display related products ----------------- */}

          <RelatedProduct
            category={productData.category}
            subCategory={productData.subCategory}
          />
        </div>
      ) : (
        <div className="opacity-0"></div>
      )}
    </>
  );
}
