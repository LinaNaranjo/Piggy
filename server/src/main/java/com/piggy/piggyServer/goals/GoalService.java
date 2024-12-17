package com.piggy.piggyServer.goals;

import com.piggy.piggyServer.user.UserEntity;
import com.piggy.piggyServer.user.UserRepository;
import com.piggy.piggyServer.user.UserService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

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

  public GoalsEntity createGoal(GoalsEntity goal, UserEntity user){
    if (goal.getGoalName() == null || goal.getGoalName().isEmpty()){
      throw new IllegalArgumentException("Goal name cannot be null or empty");
    }
    if(goal.getGoalAmount() == null || goal.getGoalAmount() <= 0){
      throw new IllegalArgumentException("Goal amount must be greater than 0");
    }

    goal.setUser(user);
    GoalsEntity savedGoal = goalRepository.save(goal);
    userService.addPointsUser(user.getId(), 10);

    UserEntity updatedUser = userRepository.findById(user.getId())
        .orElseThrow(() -> new IllegalArgumentException("User not found after update"));

    // Actualizar la referencia del usuario en la meta
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


  public GoalsEntity updateGoal(Long goalId, GoalsEntity updatedGoal) {
    GoalsEntity existingGoal = goalRepository.findById(goalId)
        .orElseThrow(() -> new RuntimeException("Goal not found"));
    existingGoal.setGoalName(updatedGoal.getGoalName());
    existingGoal.setSavedAmount(updatedGoal.getSavedAmount());
    existingGoal.setGoalAmount(updatedGoal.getGoalAmount());

    return goalRepository.save(existingGoal);
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