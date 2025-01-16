import React from "react";
import "./successMessage.scss";

const SuccessMessage = ({ message, onClose }) => {
  return (
    <div className="success-overlay">
      <div className="success-message">
        <h1>{message}</h1>
        <button className="close-button" onClick={onClose}>
          ¡Genial! 🎉
        </button>
      </div>
    </div>
  );
};

export default SuccessMessage;
