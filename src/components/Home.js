import React from 'react';
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import LatestCollection from './LatestCollection';

function Home() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (

    <div>
      <header className="bg-black text-warning text-center py-3">
        <div className="moving-words">
          <span>Welcome to Skin Saviour! | Homemade | Toxin-Free | Vegan | Cruelty-Free</span>
        </div>
      </header>

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
          <img src="./assets/images/Homemade Gel.jpg" alt="Homemade Gel" />
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div className="img">
          <img src="./assets/images/Homemade Soap.jpg" alt="Homemade Soap" />
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div className="img">
          <img src="./assets/images/Homemade Lip Scrub.jpg" alt="Homemade Lip Scrub" />
          </div>
        </Carousel.Item>
      </Carousel>

      <LatestCollection/>

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
