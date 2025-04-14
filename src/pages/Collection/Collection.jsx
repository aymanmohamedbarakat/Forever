import React, { useEffect, useState } from "react";
import { assets } from "../../assets/frontend_assets/assets";
import Title from "../../components/Global/Title/Title";
import ProductItem from "../../components/Global/ProductItem/ProductItem";
import { useProducts, useSearchStore } from "../../store";
import Pagination from "../../components/Collection/Pagination";

export default function Collection() {
  const [showFilters, setShowFilters] = useState(true);
  const [category, setCategory] = useState([]);
  const { products } = useProducts();
  const { search, openSearch, setSearch, closeSearch } = useSearchStore();
  const [filterProducts, setFilterProducts] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("Relevant");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  //Logic for filtering products
  const applyFilters = () => {
    let productCopy = products.slice();

    // Search Filter
    if (openSearch && search) {
      productCopy = productCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productCopy = productCopy.filter((item) =>
        category.includes(item.category)
      );
    }
    if (subCategory.length > 0) {
      productCopy = productCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }
    setFilterProducts(productCopy);
  };
  //Logic for toggleCategory
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };
  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  //Logic for Sorting
  const sortProducts = (e) => {
    let filterProductCopy = filterProducts.slice();
    switch (sortType) {
      case "low-high":
        setFilterProducts(filterProductCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(filterProductCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilters();
        break;
    }
  };

  //Logic for Pagination
  const pagination = (products, currentPage, productsPerPage) => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return products.slice(startIndex, endIndex);
  };

  const filteredProducts = pagination(
    filterProducts,
    currentPage,
    productsPerPage
  );

  const totalPages = Math.ceil(filterProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    applyFilters();
  }, [category, subCategory, search, openSearch]);

  useEffect(() => {
    sortProducts();
  }, [sortType]);
  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t border-gray-300">
      {/* Filter Option */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilters(!showFilters)}
          className="uppercase my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          filters
          <img
            className={`h-3 sm:hidden ${showFilters ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>
        {/* Category Filter*/}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilters ? " " : " hidden"
          } sm:block`}
        >
          <p className="uppercase mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                onChange={toggleCategory}
                value={"Men"}
                checked={category.includes("Men")}
              />
              Men
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                onChange={toggleCategory}
                value={"Women"}
                checked={category.includes("Women")}
              />
              Woman
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                onChange={toggleCategory}
                value={"Kids"}
                checked={category.includes("Kids")}
              />
              Kids
            </p>
          </div>
        </div>

        {/* SubCategory Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilters ? " " : " hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                onChange={toggleSubCategory}
                value={"Topwear"}
                checked={subCategory.includes("Topwear")}
              />
              Top wear
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                onChange={toggleSubCategory}
                value={"Bottomwear"}
                checked={subCategory.includes("Bottomwear")}
              />
              Bottom wear
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                onChange={toggleSubCategory}
                value={"Winterwear"}
                checked={subCategory.includes("Winterwear")}
              />
              Winter wear
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1">
        {/* Title & Selector */}
        <div className="flex flex-col md:flex-row justify-between text-base sm:text-2xl mb-4">
          <Title text1={"All"} text2={"COLLECTIONS"} />
          {/* Product Sort */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border border-gray-300 rounded-md text-sm px-3 py-2 shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition duration-150"
          >
            <option value="Relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low To High</option>
            <option value="high-low">Sort by: High To Low</option>
          </select>
        </div>

        <div className="grid sm:grid-cols-6 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 ">
          {filteredProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
