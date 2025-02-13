import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../contexts/ShopContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Card } from "react-bootstrap";
import RelatedProducts from "./RelatedProducts";

const ProductDetail = () => {
  const { id } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");

  useEffect(() => {
    if (!id || !products.length) return; // Ensure id and products are available before running the search
  
    const product = products.find((item) => item._id && item._id.toString() === id);
    if (product) {
      setProductData(product);
      setImage(Array.isArray(product.image) ? product.image[0] : product.image);
    } else {
      setProductData(null); // Prevents undefined issues
    }
  }, [id, products]);
  
  const handleAddToCart = () => {
    if (!productData) return; // Prevent errors if productData is not yet available
    console.log(JSON.stringify(productData)); // Log the product data for debugging
    addToCart(productData._id); // Use _id instead of id
  };

  if (!productData) {
    return (
      <div className="text-center py-5">
        <h4 className="text-danger">Product not found!</h4>
      </div>
    );
  }

  return (
    <div className="container mt-5 border-top pt-4">
      <div className="row g-4">
        {/* Product Image */}
        <div className="col-md-5">
          <Card className="border-0 shadow-none">
            <Card.Img
              variant="top"
              src={image}
              alt={productData.title}
              className="img-fluid rounded"
            />
          </Card>
        </div>

        {/* Product Info */}
        <div className="col-md-7">
          <h1 className="fw-bold">{productData.title}</h1>

          {/* Star Ratings */}
          <div className="d-flex align-items-center justify-content-center ms-2 mt-2 mt-sm-0">
            {[...Array(5)].map((_, index) => (
              <FontAwesomeIcon
                key={index}
                icon={faStar}
                className={`mx-1 ${index < 4 ? "text-warning" : "text-secondary"}`}
              />
            ))}
            <p className="ms-2 mb-0">(122)</p>
          </div>

          {/* Price */}
          <p className="mt-3 h3 fw-semibold">
            {currency}{productData.price}
          </p>

          {/* Highlights */}
          <p className="mt-4 text-muted">{productData.highlights}</p>

          {/* Benefits as a List */}
          <h5 className="mt-3"><strong>Benefits:</strong></h5>
          {productData.benefits ? (
            <ul className="text-muted">
              {Array.isArray(productData.benefits)
                ? productData.benefits.map((benefit, index) => <li key={index}>{benefit}</li>)
                : productData.benefits.split(";").map((item, index) => <li key={index}>{item.trim()}</li>)}
            </ul>
          ) : (
            <p>No benefits available for this product.</p>
          )}

          {/* Add to Cart Button */}
          <button onClick={handleAddToCart} className="btn btn-dark px-4 py-2 mt-3">
            ADD TO CART
          </button>
          <hr className="mt-4 sm:w-75" />

          <div className="text-sm text-gray-500 mt-5">
            <p>Homemade</p>
            <p>100% Original Product</p>
            <p>0% Chemicals</p>
          </div>

          {/* Description & Review Section */}
          <div className="mt-5">
            <div className="d-flex">
              <b className="border px-5 py-3 text-sm">Description</b>
              <p className="border px-5 py-3 text-sm mb-0">Reviews (122)</p>
            </div>

            <p className="mt-3">
              An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence.
            </p>

            <p>
              E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has a dedicated page with relevant information.
            </p>
          </div>

          {/* Related Products */}
          <RelatedProducts category={productData.category} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
