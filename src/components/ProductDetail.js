import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ShopContext } from "../contexts/ShopContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Badge } from "react-bootstrap";
import RelatedProducts from "./RelatedProducts";

import { FaArrowCircleLeft, FaShoppingBag } from "react-icons/fa";
import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";

const ProductDetail = () => {
  const { id } = useParams();
  const { products, currency, addToCart, getTotalCartCount } =
    useContext(ShopContext);
  const cartCount = getTotalCartCount();
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!id || !products.length) return; // Ensure id and products are available before running the search
    const product = products.find(
      (item) => item._id && item._id.toString() === id
    );
    if (product) {
      setProductData(product);
      setImage(Array.isArray(product.image) ? product.image[0] : product.image);
    } else {
      setProductData(null); // Prevents undefined issues
    }
  }, [id, products]);

  const handleAddToCart = () => {
    if (!productData || !productData._id) {
      return; // Prevent errors if productData is not available
    }

    addToCart(productData._id);
    navigate("/cart");
  };

  if (!productData) {
    return (
      <div className="text-center py-5">
        <h4 className="text-danger">Product not found!</h4>
      </div>
    );
  }

  return (
    <div className="productdetail-bg" style={{  background: "#e4b685" }}>
      <div
        style={{ paddingTop: "30px" , overflow:"visible"}}
        className="productDetail-arrow-left"
        onClick={() => navigate(-1)}
      >
        <FaArrowCircleLeft />
      </div>
      <div className="container mt-1 pt-4 m-1" style={{scrollbarWidth:"none", overflow:"visible"}}>
        <div className="row g-4">
          {/* Product Image */}
          <div className="col-md-5">
          <div className="productdetail-card-background"></div>
          <img src={image} className="productdetail-img-fluid" />
          </div>
          {/* Product Info */}
          <div className=" col-md-7">

            {/* Star Ratings */}
            <div className="ratingstar d-flex align-items-center justify-content-center mt-sm-0">
              {[...Array(5)].map((_, index) => (
                <FontAwesomeIcon
                  key={index}
                  icon={faStar}
                  className={`mx-1 ${
                    index < 4 ? "text-danger" : "text-secondary"
                  }`}
                />
              ))}
              <p className="ms-2 mb-0">(122)</p>
            </div>

            <h1 className="productdetail-title ">{productData.title}</h1>

            {/* Highlights */}
            <p className="productdetail-highlights text-muted">{productData.highlights}</p>
             {/* Price */}
             <p className="mt-3 h3 fw-semibold">
              {currency}
              {productData.price}
            </p>

            {/* Benefits as a List */}
            <h5 className="mt-3">
              <strong>Benefits:</strong>
            </h5>
            {productData.benefits ? (
              <ul className="text-muted">
                {Array.isArray(productData.benefits)
                  ? productData.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))
                  : productData.benefits
                      .split(";")
                      .map((item, index) => <li key={index}>{item.trim()}</li>)}
              </ul>
            ) : (
              <p>No benefits available for this product.</p>
            )}

            {/* Add to Cart Button */}
            <button
              onClick={() => {
                handleAddToCart();
              }}
              className="addtocart-btn fw-bold px-4 py-2 mt-3"
            >
              ADD TO CART
            </button>
            <div className="position-relative d-inline-block">
                {/* Shopping Bag Icon */}
                <FaShoppingBag 
                onClick={() => navigate("/cart")}
                className="productdetail-card-bag" />

                {/* Cart Count Badge */}
                {cartCount > 0 && (
                  <Badge
                    pill
                    bg="light"
                    text="dark"
                    className="position-absolute top-0 start-100 translate-middle border border-dark"
                    style={{
                      borderRadius: "50%",
                      width: "30px",
                      height: "30px",
                      display: "flex",
                      alignItems: "center",
                      marginTop: "-60px",
                      border: "none",
                      justifyContent: "center",
                      fontSize: "15px",
                      background:""
                    }}
                  >
                    {cartCount}
                  </Badge>
                )}
            </div>

            <div className="text-sm text-gray-500 mt-4">
              <p><b>Homemade</b></p>
              <p><b>100% Original Product</b></p>
              <p><b>0% Chemicals</b></p>
            </div>

            {/* Description & Review Section */}
            <div className="mt-4">
              <div className="productdetail-box d-flex">
                {/* <b className="border px-5 py-3 text-sm" onClick={() => navigate(`/product/${id}/write-review`)}>write a review</b>
                <p className="border px-5 py-3 text-sm mb-0" onClick={() => navigate(`/product/${id}/reviews`)}>Reviews (122)</p> */}
                <button className="rating-button"  onClick={() => navigate(`/product/${id}/write-review`)}>
                    Ratings & Reviews
                </button>
                <button className="rating-view-button" onClick={() => navigate(`/product/${id}/reviews`)}>
                    All Reviews
                </button>
              </div>
              
            
              <p className="productdetail-p mt-4">
                An e-commerce website is an online platform that facilitates the
                buying and selling of products or services over the internet. It
                serves as a virtual marketplace where businesses and individuals
                can showcase their products, interact with customers, and
                conduct transactions without the need for a physical presence.
              </p>

              <p className="productdetail-p">
                E-commerce websites typically display products or services along
                with detailed descriptions, images, prices, and any available
                variations (e.g., sizes, colors). Each product usually has a
                dedicated page with relevant information.
              </p>
            </div>

            {/* Related Products */}
            <div className="productdetail-RP" style={{ marginRight: "2px" }}>
              <RelatedProducts category={productData.category} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
