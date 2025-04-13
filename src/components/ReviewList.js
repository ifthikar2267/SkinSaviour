import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ShopContext } from "../contexts/ShopContext";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowCircleLeft } from "react-icons/fa";

const ReviewList = () => {
  const { id: productId } = useParams(); // Get productId from URL
  const [reviews, setReviews] = useState([]);
  const { backendUrl } = useContext(ShopContext);
  const navigate = useNavigate();

  const fetchReviews = async () => {
    if (!productId) {
      console.error("Invalid productId:", productId);
      return;
    }
    try {
      const response = await axios.get(`${backendUrl}/api/review/${productId}`);
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  return (
    <div className="formList-container mt-4">
      <div
        style={{ paddingTop: "3px", marginLeft: "20px" }}
        className="productDetail-arrow-left"
        onClick={() => navigate(-1)}
      >
        <FaArrowCircleLeft />
      </div>
      <h5 className="formList-h5">Customer Reviews</h5>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review._id} className="border p-2 mb-2 rounded">
            <h6>
              {review.userName} - {review.rating} ★
            </h6>
            <p>{review.comment}</p>
            <small className="text-muted">
              {new Date(review.createdAt).toLocaleDateString()}
            </small>
          </div>
        ))
      ) : (
        <p style={{ marginLeft: "30px" }}>
          No reviews yet. Be the first to review!
        </p>
      )}
    </div>
  );
};

export default ReviewList;
