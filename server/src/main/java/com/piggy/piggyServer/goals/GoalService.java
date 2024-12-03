package com.piggy.piggyServer.goals;

import com.piggy.piggyServer.user.UserEntity;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Service
public class GoalService {

  @Autowired
  private GoalRepository goalRepository;
  private GoalsEntity goals;

  //Crear Goal
  public GoalsEntity createGoal(GoalsEntity goals) {
    if (goals.getUser()== null || goals.getUser().getId() == null){
      throw new IllegalArgumentException("User not found");
    }
    return goalRepository.save(goals);
  }

  //obtener todos los goals de un usuario por id
  public List<GoalsEntity> getGoalsByUserId(Long userId) {
    return goalRepository.findByUserId(userId);
  }

  //obtener un goal por id
  public GoalsEntity getGoalById(Long id) {
    return goalRepository.findById(id).orElseThrow();
  }

  //actualizar un goal
  public GoalsEntity updateGoal(Long goalId, GoalsEntity updatedGoal) {
    GoalsEntity existingGoal = goalRepository.findById(goalId)
        .orElseThrow(() -> new RuntimeException("Goal not found"));
    //excepción si no se encuentra el goal

    //actualización de los datos
    existingGoal.setGoalName(updatedGoal.getGoalName());
    existingGoal.setSavedAmount(updatedGoal.getSavedAmount());
    existingGoal.setGoalAmount(updatedGoal.getGoalAmount());

    return goalRepository.save(existingGoal);
  }

  //eliminar un goal
  public void deleteGoalById(Long goalId) {
    goalRepository.deleteById(goalId);
  }

  //eliminar goal por nombre
  public void deleteGoalByName(String goalName) {
    GoalsEntity goal = goalRepository.findByGoalName(goalName);
    goalRepository.delete(goal);
  }

}