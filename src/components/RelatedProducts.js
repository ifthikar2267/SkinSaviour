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
    <div className="my-3">
        <div className="text-center py-3 display-4" style={{fontSize:"1rem"}}>
            <Title text1={'RELATED'} text2={'PRODUCTS'}/>
        </div>
        <div className="product-container row g-4" style={{marginLeft:"-17px"}}>
            {
                related.map((product, index) => (
                    <div key={index} className="col">
                      <Link
                        to={`/product/${product._id}`} 
                        className="text-decoration-none text-black"
                        onClick={() => window.scrollTo(0, 0)}
                      >
                        <Card className="card h-100 text-centerb   rounded-5 ">
                        <div className="lattestcollection-card-background"></div>
                          <Card.Img
                            variant="top"
                            src={product.image}
                            alt={product.title}
                            className="related-img-fluid"
                          />
                          <Card.Body>
                            <Card.Title className="text-center" style={{fontSize:"1rem"}}>{product.title}</Card.Title>
                            <Card.Text className="text-black fw-bold text-center" style={{fontSize:"1rem"}}>
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
