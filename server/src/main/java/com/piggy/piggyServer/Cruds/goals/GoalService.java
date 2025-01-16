package com.piggy.piggyServer.Cruds.goals;

import com.piggy.piggyServer.Cruds.user.UserEntity;
import com.piggy.piggyServer.Cruds.user.UserRepository;
import com.piggy.piggyServer.Cruds.user.UserService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * @author santiago
 * Service class for Goals
 * This class provide methods to create and manage goals for the users
 */
@AllArgsConstructor
@NoArgsConstructor
@Service
public class GoalService {

  @Autowired
  private GoalRepository goalRepository;
  @Autowired
  private UserService userService;
  @Autowired
  private UserRepository userRepository;

  /**
   *
   * @param goal The {@link GoalsEntity} object containing the details of the goal to be created.
   * @param user the {@link UserEntity} object containing the details of the user that is creating the goal.
   * @return the saved {@link GoalsEntity} bject after persisting it in the database.
   * @throws IllegalArgumentException if the goal name is null or empty, or if the goal amount is null or less than or equal to zero.
   */

  public GoalsEntity createGoal(GoalsEntity goal, UserEntity user){
    if (goal.getGoalName() == null || goal.getGoalName().isEmpty()){
      throw new IllegalArgumentException("Goal name cannot be null or empty");
    }
    if(goal.getGoalAmount() == null || goal.getGoalAmount() <= 0){
      throw new IllegalArgumentException("Goal amount must be greater than 0");
    }
    //Associate the user with the goal
    goal.setUser(user);
    //save the goal in the database
    GoalsEntity savedGoal = goalRepository.save(goal);
    //Add points to the user
    if (goal.getSavedAmount() >= goal.getGoalAmount()){
      userService.addPointsUser(user.getId(), 20);
    }else {
      userService.addPointsUser(user.getId(), 5);
    }
    //Update the user in the database
    UserEntity updatedUser = userRepository.findById(user.getId())
        .orElseThrow(() -> new IllegalArgumentException("User not found after update"));
    //Associate the user with the goal
    goal.setUser(updatedUser);
    return savedGoal;
  }

  public ResponseEntity<?> getGoalById(Long goalId) {
    if (!goalRepository.existsById(goalId)){
      return ResponseEntity.status(404).body(Map.of(
          "error", "Not found",
          "Message", "Goal with ID" + goalId + "does not exist"
      ));
    }
    GoalsEntity goal = goalRepository.findById(goalId).orElseThrow(null);
    return ResponseEntity.ok(goal);
  }

  public ResponseEntity<?> getGoalsByUserId(Long userId) {
    List<GoalsEntity> userGoals = goalRepository.findByUserId(userId);
    if (userGoals.isEmpty()){
      return ResponseEntity.status(404).body(Map.of(
         "error", "Not found",
          "Message", "No goals found for the user with ID" + userId
      ));
    }
    return ResponseEntity.ok(userGoals);
  }


  public GoalsEntity updateGoal(Long goalId, GoalsEntity updateGoal) {
    // Buscar la meta existente
    GoalsEntity goal = goalRepository.findById(goalId)
        .orElseThrow(() -> new IllegalArgumentException("Goal not found"));

    // Verificar si se alcanzó la meta antes de actualizar
    boolean goalAchievedBeforeUpdate =
        goal.getSavedAmount() >= goal.getGoalAmount();

    // Actualizar los valores de la meta
    if (updateGoal.getGoalName() != null && !updateGoal.getGoalName().isEmpty()) {
      goal.setGoalName(updateGoal.getGoalName());
    }
    if (updateGoal.getGoalAmount() != null) {
      goal.setGoalAmount(updateGoal.getGoalAmount());
    }
    if (updateGoal.getSavedAmount() != null && updateGoal.getSavedAmount() > 0) {
      goal.setSavedAmount(updateGoal.getSavedAmount());
    }

    // Verificar si se alcanzó la meta después de actualizar
    boolean goalAchievedAfterUpdate =
        goal.getSavedAmount() >= goal.getGoalAmount();

    // Asignar puntos en función de si se alcanzó la meta
    if (!goalAchievedBeforeUpdate && goalAchievedAfterUpdate) {
      // Meta alcanzada por primera vez
      userService.addPointsUser(goal.getUser().getId(), 20);
    }
    // Guardar los cambios en la meta
    return goalRepository.save(goal);
  }


  public ResponseEntity<?> deleteGoalById(Long goalId){
    if(!goalRepository.existsById(goalId)){
      return ResponseEntity.status(404).body(Map.of(
          "error", "Not found",
          "Message", "Goal with ID" + goalId + "does not exist"));
    }
    goalRepository.deleteById(goalId);
    return ResponseEntity.ok(Map.of(
        "Message", "Goal with ID" + goalId + "has been successfully deleted"));
  }


  public void deleteGoalByName(String goalName) {
    GoalsEntity goal = goalRepository.findByGoalName(goalName);
    goalRepository.delete(goal);
  }

}