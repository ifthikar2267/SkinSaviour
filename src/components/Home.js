import React from 'react';
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

function Home() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div>
      
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
        <div className="img">
            <img src="./assets/images/skinSaviour.jpg" alt="" />
          </div>
          <Carousel.Caption>
            <h3>Home Made Cosmetics</h3>
            <p>Handmade skincare products that are not only effective but also safe for you and the environment.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <div className="img">
            <img src="./assets/images/Red wine gel.jpg" alt="Red Wine Gel" />
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div className="img">
            <img src="./assets/images/Aloevera Gel.jpg" alt="Aloe Vera Gel" />
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div className="img">
            <img src="./assets/images/Saffron Gel.jpg" alt="Saffron Gel" />
          </div>
        </Carousel.Item>
      </Carousel>

      <div className="heading1">
        <h1>Skin Saviour</h1>
      </div>
      <div className="para1">
        <p>Skin Saviour offers a unique range of homemade skin cosmetics crafted with care and love. Our products are <strong> toxin-free, vegan, and cruelty-free </strong>, ensuring that every ingredient is natural and beneficial for your skin. We believe in the power of nature to heal and nourish, providing you with skincare solutions that are as kind to the environment as they are to your skin. With Skin Saviour, you can indulge in pure, effective, and ethical skincare that truly makes a difference.</p>
      </div>

      <div className="buy-button">
        <a href="/product"><button>View Products</button></a>
      </div>
    </div>

  
  );
}

export default Home;
