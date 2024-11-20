import React from "react";
import "./filtrosMetas.scss";

const FiltrosMetas = ({ goals, setFilteredGoals }) => {
  const handleFilterChange = (filterType) => {
    if (filterType === "all") {
      setFilteredGoals(goals);
    } else if (filterType === "completed") {
      setFilteredGoals(
        goals.filter(
          (goal) => (goal.amountSaved / goal.totalAmount) * 100 >= 100
        )
      );
    } else if (filterType === "notCompleted") {
      setFilteredGoals(
        goals.filter(
          (goal) => (goal.amountSaved / goal.totalAmount) * 100 < 100
        )
      );
    }
  };

  return (
    <div className="filters">
      <button onClick={() => handleFilterChange("all")}>Todas</button>
      <button onClick={() => handleFilterChange("completed")}>
        Completadas
      </button>
      <button onClick={() => handleFilterChange("notCompleted")}>
        No Completadas
      </button>
    </div>
  );
};
export default FiltrosMetas;
