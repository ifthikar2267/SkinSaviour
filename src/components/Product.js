import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";
import Title from "./Title";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Product = () => {
  const { products, search, showSearch, currency } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = [...products];

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = products.slice();

    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;

      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;

      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, products, search, showSearch]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div style={{background:"#F5F0EA"}}>
      <Sidebar />
      <div className="d-flex flex-column flex-sm-row gap-1 gap-sm-4 pt-4 border-top m-1">
        {/* Filter Options */}
        <div className="min-w-60 m-4">
          <p
            onClick={() => setShowFilter(!showFilter)}
            className="my-2 fs-4 d-flex align-items-center cursor-pointer gap-2 "
          >
            FILTERS
            <FontAwesomeIcon
              icon={faSortDown}
              className={`h-3 d-sm-none transition-transform ${
                showFilter ? "rotate-360" : "rotate-270"
              }`}
              onClick={() => setShowFilter(!showFilter)}
            />
          </p>

          {/* Category Filter */}
          <div
            className={`border border-secondary ps-3 py-3 mt-3 ${
              showFilter ? "" : "d-none"
            } d-sm-block`}
          >
            <p className="mb-3 fs-6 fw-medium m-2">CATEGORIES</p>

            <div className="d-flex flex-column gap-2 text-secondary m-2">
              <p className="d-flex gap-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="Gel"
                  onChange={toggleCategory}
                />{" "}
                Gel
              </p>
              <p className="d-flex gap-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="Shampoo"
                  onChange={toggleCategory}
                />
                Shampoo
              </p>
              <p className="d-flex gap-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="Soap"
                  onChange={toggleCategory}
                />{" "}
                Soap
              </p>
              <p className="d-flex gap-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="Lipscrub"
                  onChange={toggleCategory}
                />
                Lipscrub
              </p>
              <p className="d-flex gap-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="Oil"
                  onChange={toggleCategory}
                />{" "}
                Oil
              </p>
              <p className="d-flex gap-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="Serum"
                  onChange={toggleCategory}
                />{" "}
                Serum
              </p>
              <p className="d-flex gap-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="Powder"
                  onChange={toggleCategory}
                />{" "}
                Powder
              </p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-grow m-2">
          <div className="d-flex justify-content-between align-items-center mb-4 m-1">
            <Title text1={"ALL"} text2={"COLLECTIONS"} />

            {/* Product Sort */}
            <select
              onChange={(e) => setSortType(e.target.value)}
              className="form-select w-auto m-2 mb-4"
            >
              <option value="relavent">Sort by: Relevant</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
          </div>

          {/* Map Products */}
          <div className="product-container row g-4" style={{marginLeft:"-11px"}}>
            {filterProducts.map((product, index) => (
              <div key={index} className="col-6 col-md-4 col-lg-3">
                <Link
                  to={`/product/${product._id}`}
                  className="my-2 text-decoration-none text-black"
                >
                  <Card className="card h-100 text-center rounded-5">
                    <Card.Img
                      variant="top"
                      src={product.image}
                      alt={product.title}
                      className="product-img-fluid" 
                    />
                    <Card.Body>
                      <Card.Title className="text-center" style={{fontSize:"1rem"}}>
                        {product.title}
                      </Card.Title>
                      <Card.Text className="text-black fw-bold text-center" style={{fontSize:"1rem"}}>
                        {currency}
                        {product.price}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Product;
