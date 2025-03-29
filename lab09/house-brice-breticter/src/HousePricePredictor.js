import React, { useState } from "react";

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
          .container {
            max-width: 600px;
            margin: 40px auto;
            padding: 24px;
            border: 1px solid #ccc;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          h1 {
            text-align: center;
          }

          form {
            display: flex;
            flex-direction: column;
          }

          label {
            margin-bottom: 8px;
            text-align: left; 
          }

          input, select {
            padding: 8px;
            margin-bottom: 12px;
            border: 1px solid lightgray;
            border-radius: 4px;
            width: 100%;
          }

          input[type="checkbox"] {
            width: auto;
          }

          button {
            background-color: #007BFF;
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s;
          }

          button:hover {
            background-color: #0056b3;
          }

          .result {
            margin-top: 16px;
            background-color: #DFF0D8;
            border: 1px solid #3C763D;
            padding: 12px;
            border-radius: 4px;
            font-weight: bold;
            text-align: center;
          }
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