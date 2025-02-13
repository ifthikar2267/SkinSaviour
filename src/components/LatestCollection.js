import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import { Card } from "react-bootstrap";
import Title from "./Title";
import { Link } from "react-router-dom";


const LatestCollection = () => {
  const { products, currency } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10)); // Fetch top 10 products
  }, [products]);

  return (
    <div className="my-5">
      <div className="text-center py-4 display-4">
        <Title text1="LATEST" text2="COLLECTIONS" />
      </div>

      <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-4 gy-5 p-5">
        {latestProducts.map((product, index) => (
          <div key={index} className="col">
            <Link
              to={`/product/${product._id}`} 
              className="my-2 text-decoration-none text-black"
            >
              <Card className="h-100 text-center">
                <Card.Img
                  variant="top"
                  src={product.image}
                  alt={product.title}
                  className="img-fluid"
                />
                <Card.Body>
                  <Card.Title className="fs-5">{product.title}</Card.Title>
                  <Card.Text className="text-black fw-bold">
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
