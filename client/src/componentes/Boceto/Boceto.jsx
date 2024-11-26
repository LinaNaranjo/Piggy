import React from "react";
import "./boceto.scss";

const Boceto = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-top-icons" />
      <div className="skeleton-title" />
      <div className="skeleton-score" />
      <div className="skeleton-progress" />
    </div>
  );
};

export default Boceto;
