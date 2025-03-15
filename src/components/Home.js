import React, { useContext, useEffect, useState } from "react";
import LatestCollection from "./LatestCollection";
import Sidebar from "./Sidebar";
import Title from "./Title";
import Footer from "./Footer";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import { ShopContext } from "../contexts/ShopContext";
import { FaShoppingBag } from "react-icons/fa";

function Home() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");

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

  const handleAddToCart = (productId) => {
    addToCart(productId);
  };

  return (
    <div style={{background:"#F5F0EA"}}>
      <Sidebar />
      <div className="container-home-button">
        <button
          className="button"
          value="Gel"
          onClick={() => navigate("/product")}
        >
          Gel
        </button>
        <button
          className="button"
          value="Serum"
          onClick={() => navigate("/product")}
        >
          Serum
        </button>
        <button
          className="button"
          value="Oil"
          onClick={() => navigate("/product")}
        >
          Oil
        </button>
        <button
          className="button"
          value="Lipscrub"
          onClick={() => navigate("/product")}
        >
          Lipscrub
        </button>
      </div>
      <div className="container-home-header text-center py-4 display-4 fs-2">
        <Title text1="HERBAL" text2="PRODUCTS" />
        <div className="carousel-container ">
          <Card className=" product-card rounded-5 overflow-visible">
            <div className="product-card-background"></div>
            <Card.Img
              variant="top"
              src="./assets/images/Aloevera-bg.png"
              alt="Aloevera gel"
              className="home-img-fluid"
            />
            <Card.Body className="product-card-body">
              <Card.Title className="fs-3 text-start fw-bold mb-1">
                Aloevera Gel
              </Card.Title>
              <Card.Text className="fs-3 text-start fw-bold">
                {currency}
                180
              </Card.Text>
              <FaShoppingBag
                onClick={() => {
                  handleAddToCart("67d5b1bc0384c6f373dbe7e5");
                }}
                className="product-card-bag"
              />
            </Card.Body>
          </Card>

          <Card className=" product-card rounded-5 overflow-visible">
            <div className="product-card-background"></div>
            <Card.Img
              variant="top"
              src="./assets/images/Saffron-home-bg.png"
              alt="Saffron gel"
              className="home-img-fluid"
            />
            <Card.Body className="product-card-body">
              <Card.Title className="fs-3 text-start fw-bold">
                Saffron Gel
              </Card.Title>
              <Card.Text className="fs-3 text-start fw-bold">
                {currency}
                180
              </Card.Text>
              <FaShoppingBag
                onClick={() => handleAddToCart("67d5bd440384c6f373dbe893")}
                className="product-card-bag"
              />
            </Card.Body>
          </Card>

          <Card className=" product-card rounded-5 overflow-visible">
            <div className="product-card-background"></div>
            <Card.Img
              variant="top"
              src="./assets/images/redwine-home-bg.png"
              alt="Redwine gel"
              className="home-img-fluid"
            />
            <Card.Body className="product-card-body">
              <Card.Title className="fs-3 text-start fw-bold">
                Redwine Gel
              </Card.Title>
              <Card.Text className="fs-3 text-start fw-bold">
                {currency}
                250
              </Card.Text>
              <FaShoppingBag
              onClick={() => handleAddToCart("67d5bbc90384c6f373dbe87a")}
              className="product-card-bag"
            />
            </Card.Body>
            
          </Card>
        </div>

        <div
          style={{
            padding: "10px",
          }}
        >
          <LatestCollection />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
