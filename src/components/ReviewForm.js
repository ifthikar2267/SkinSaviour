import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ShopContext } from "../contexts/ShopContext";
import { FaArrowCircleLeft } from "react-icons/fa";
import { toast } from "react-toastify";

const ReviewForm = ({ fetchReviews }) => {
  const { id: productId } = useParams(); // Get productId from URL
  const [userName, setUserName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const { backendUrl } = useContext(ShopContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(backendUrl + "/api/review/add", {
        productId,
        userName,
        rating: Number(rating),
        comment,
      });

      setUserName("");
      setRating(5);
      setComment("");
      toast.success("Review added successfully!");
      setTimeout(() => navigate(`/product/${productId}/reviews`), 500);
    } catch (error) {
      console.error(
        "Error adding review",
        error.response?.data || error.message
      );
      toast.error("Error adding review");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 reviewform-container">
      <div
        className="productDetail-arrow-left"
        style={{ paddingTop: "3px", marginLeft: "20px" }}
        onClick={() => navigate(-1)}
      >
        <FaArrowCircleLeft />
      </div>
      <h5 className="reviewform-h5">Leave a Review</h5>
      <input
        type="text"
        placeholder="Your Name"
        className="form-control mb-3"
        style={{ borderRadius: "30px" }}
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        required
      />
      <select
        className="form-control mb-3"
        style={{ borderRadius: "30px" }}
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))} // Convert to number
        required
      >
        {[1, 2, 3, 4, 5].map((num) => (
          <option key={num} value={num}>
            {num} ★
          </option>
        ))}
      </select>
      <textarea
        className="form-control mb-4"
        style={{ borderRadius: "30px" }}
        placeholder="Write your review..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
      ></textarea>
      <button
        type="submit"
        className="btn btn-dark"
        style={{ borderRadius: "30px", width: "100%", height: "6vh" }}
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
