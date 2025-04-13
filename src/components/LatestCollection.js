import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import { Card } from "react-bootstrap";
import Title from "./Title";
import { Link } from "react-router-dom";


const LatestCollection = () => {
  const { products, currency } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 6)); // Fetch top 6 products
  }, [products]);

  return (
    <div style={{marginTop:"5px"}}>
      <div className="lattestcollection-container text-center display-4 mb-5" style={{fontSize:"1rem"}}>
        <Title text1="LATEST" text2="COLLECTIONS" />
      </div>

      <div className="product-container row g-4" style={{marginLeft:"-11px"}}>
        {latestProducts.map((product, index) => (
          <div key={index} className="col">
            <Link
              to={`/product/${product._id}`} 
              className="text-decoration-none text-black"
            >
              <Card className="card h-100 text-center rounded-5">
                <Card.Img
                  variant="top"
                  src={product.image}
                  alt={product.title}
                  className="lattestcollection-img-fluid"
                />
                <Card.Body >
                  <Card.Title className=" text-center" style={{fontSize:"1rem"}}>{product.title}</Card.Title>
                  <Card.Text className="text-black fw-bold" style={{fontSize:"1rem"}}>
                    {currency}{product.price}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;








