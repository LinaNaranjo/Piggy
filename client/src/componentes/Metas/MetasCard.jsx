import React, { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./metasCard.scss";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

const MetasCard = ({ goal, onEdit, onDelete, onComplete }) => {
  const progress = (goal.amountSaved / goal.totalAmount) * 100;

  return (
    <div className="goal-card">
      <div className="top-icons">
        {progress < 100 && (
          <>
            <ModeEditOutlinedIcon
              sx={{
                fontSize: 20,
                color: "gray",
                "&:hover": {
                  color: "green",
                  transform: "scale(1.2)",
                },
              }}
              onClick={() => onEdit(goal.id)}
            />
            <DeleteOutlinedIcon
              sx={{
                fontSize: 20,
                color: "grey",
                "&:hover": {
                  color: "red",
                  transform: "scale(1.2)",
                },
              }}
              onClick={() => onDelete(goal.id)}
            />
          </>
        )}
      </div>

      <h3 className="nombre-card">{goal.name}</h3>
      <div className="goal-score">
        <span>
          {goal.amountSaved} / {goal.totalAmount}
        </span>
      </div>
      <div className="progress-container">
        <div className="circle-progress">
          <CircularProgressbar
            value={progress}
            text={`${Math.round(progress)}%`}
            styles={{
              path: {
                stroke: "#76d7c4",
                strokeWidth: 10,
              },
              trail: {
                stroke: "#F39C12",
              },
            }}
          />
        </div>
      </div>
      {progress >= 100 && (
        <div className="congratulations">
          <p>🎉 ¡Felicitaciones! Has completado esta meta. 🎉</p>
        </div>
      )}
    </div>
  );
};

export default MetasCard;
