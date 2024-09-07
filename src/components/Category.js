import React from 'react'

function Category() {
  return (
    <div className='category-container'> 
      <div className='gel'>
        <a href="/product"><img src="./assets/images/Homemade Gel.jpg" alt="Homemade Gel" />
        <h4>Homemade Gel</h4>
        <p>Our homemade gel is crafted with the purest ingredients, designed to nourish your skin naturally. Free from harsh chemicals, it's perfect for sensitive skin.</p></a>
      </div>

      <div className="shampoo">
        <a href="/product"><img src="./assets/images/Homemade Shampoo.jpg" alt="Homemade Shampoo" />
        <h4>Homemade Shampoo</h4>
        <p>Our homemade shampoo is a blend of nature's finest ingredients, carefully formulated to cleanse and revitalize your hair without any harsh chemicals. </p></a>
      </div>

      <div className="soap">
        <a href="/product"><img src="./assets/images/Homemade Soap.jpg" alt="Homemade Soap" />
        <h4>Homemade Soap</h4>
        <p>Our homemade soap is lovingly crafted with natural, toxin-free ingredients, making it a gentle yet effective cleanser for all skin types.</p></a>
      </div>

      <div className="lip-scrub">
        <a href="/product"><img src="./assets/images/Homemade Lip Scrub.jpg" alt="Homemade Lip Scrub" />
        <h4>Homemade Lip Scrub</h4>
        <p>Our homemade scrub is crafted to exfoliate and rejuvenate your skin using natural, toxin-free ingredients.</p></a>
      </div>

      

    </div>
  )
}

export default Category