import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../contexts/ShopContext'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Title from './Title';

const RelatedProducts = ({category}) => {

    const {products,currency} = useContext(ShopContext);
    const[related , setRelated] = useState([]);

    useEffect(()=> {
        if (products.length > 0) {
            let productsCopy = products.slice();
            productsCopy = productsCopy.filter((item) => category === item.category);
            setRelated(productsCopy.slice(0, 6));  // Limit to 6 products
        }
    }, [products, category]);

  return (
    <div className="my-5">
        <div className="text-center py-3 display-4">
            <Title text1={'RELATED'} text2={'PRODUCTS'}/>
        </div>
        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-3 g-4 gy-5 p-3">
            {
                related.map((product, index) => (
                    <div key={index} className="col">
                      <Link
                        to={`/product/${product._id}`} 
                        className="text-decoration-none text-black"
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
                              {currency} {product.price}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Link>
                    </div>
                ))
            }
        </div>
    </div>
  );
};

export default RelatedProducts;
