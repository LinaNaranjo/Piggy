import React, { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./metasCard.scss";
import edit from "../../assets/Images/ImagesInicio/edit.svg";
import check from "../../assets/Images/ImagesInicio/check.svg";
import eliminar from "../../assets/Images/ImagesInicio/delete.svg";

const MetasCard = ({ goal, onEdit, onDelete, onComplete }) => {
  const [isCompleted, setIsCompleted] = useState(false);

  const toggleCompletion = () => {
    setIsCompleted(!isCompleted);
    onComplete(goal.id, !isCompleted);
  };

  const progress = (goal.amountSaved / goal.totalAmount) * 100;
  const activitiesProgress = (goal.activitiesDone / goal.activitiesTotal) * 100;

  return (
    <div className="goal-card">
      <h3>{goal.name}</h3>
      <div className="goal-score">
        <span>
          {goal.amountSaved} / {goal.totalAmount}
        </span>
      </div>

      <div className="goal-activities">
        <span>
          Actividades realizadas: {goal.activitiesDone} / {goal.activitiesTotal}
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

      <div className="goal-buttons">
        <button onClick={() => onEdit(goal.id)}>
          <img src={edit} alt="" />
        </button>
        <button onClick={() => onDelete(goal.id)}>
          <img src={eliminar} alt="" />
        </button>
        <button onClick={toggleCompletion}>
          <img
            src={check}
            alt="Complete"
            className={isCompleted ? "icon-complete" : "icon-incomplete"}
          />
        </button>
      </div>
    </div>
  );
};

export default MetasCard;
