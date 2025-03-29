import React, { useState } from "react";
import "./HousePricePredictor.css"; 

const HousePricePredictor = () => {
  const [formData, setFormData] = useState({
    city: "",
    province: "",
    latitude: "",
    longitude: "",
    lease_term: "",
    type: "",
    beds: "",
    baths: "",
    sq_feet: "",
    furnishing: "",
    smoking: "",
    pets: false,
  });
  const [predictedPrice, setPredictedPrice] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPredictedPrice(null);
  
    const payload = {
      ...formData,
      latitude: parseFloat(formData.latitude) || 0,
      longitude: parseFloat(formData.longitude) || 0,
      beds: parseFloat(formData.beds) || 0,
      baths: parseFloat(formData.baths) || 0,
      sq_feet: parseFloat(formData.sq_feet) || 0,
    };
  
    const response = await fetch("http://127.0.0.1:5000/predict_house_price", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  
    const result = await response.json();
    setPredictedPrice(result.predicted_price);
    console.log(result);
  };

  return (
    <div className="container">
      <style>
        {`
         
        `}
      </style>
      
      <h1>House Price Predictor</h1>
      <form onSubmit={handleSubmit}>
        <label>City:</label>
        <input
          name="city"
          value={formData.city}
          onChange={handleInputChange}
        ></input>

        <label>Province:</label>
        <input
          name="province"
          value={formData.province}
          onChange={handleInputChange}
        ></input>

        <label>Latitude:</label>
        <input
          name="latitude"
          value={formData.latitude}
          onChange={handleInputChange}
        ></input>

        <label>Longitude:</label>
        <input
          name="longitude"
          value={formData.longitude}
          onChange={handleInputChange}
        ></input>

        <label>Lease Term:</label>
        <input
          name="lease_term"
          value={formData.lease_term}
          onChange={handleInputChange}
        ></input>

        <label>Type:</label>
        <input
          name="type"
          value={formData.type}
          onChange={handleInputChange}
        ></input>

        <label>Beds:</label>
        <input
          name="beds"
          value={formData.beds}
          onChange={handleInputChange}
        ></input>

        <label>Baths:</label>
        <input
          name="baths"
          value={formData.baths}
          onChange={handleInputChange}
        ></input>

        <label>Square Feet:</label>
        <input
          name="sq_feet"
          value={formData.sq_feet}
          onChange={handleInputChange}
        ></input>

        <label>Furnishing:</label>
        <select
          name="furnishing"
          value={formData.furnishing}
          onChange={handleInputChange}
        >
          <option value="Unfurnished">Unfurnished</option>
          <option value="Partially Furnished">Partially Furnished</option>
          <option value="Fully Furnished">Fully Furnished</option>
        </select>

        <label>Smoking:</label>
        <input
          name="smoking"
          value={formData.smoking}
          onChange={handleInputChange}
        ></input>

        <label>I have a pet:</label>
        <input
          name="pets"
          type="checkbox"
          checked={formData.pets}
          onChange={handleInputChange}
        ></input>

        <button type="submit">Predict</button>
      </form>

      {predictedPrice !== null && (
        <div className="result">
          <h3>Predicted Rent Price: ${predictedPrice}</h3>
        </div>
      )}
    </div>
  );
};

export default HousePricePredictor;