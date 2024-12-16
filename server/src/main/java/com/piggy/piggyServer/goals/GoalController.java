package com.piggy.piggyServer.goals;
import com.piggy.piggyServer.user.UserEntity;
import com.piggy.piggyServer.user.UserRepository;
import com.piggy.piggyServer.user.UserService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@AllArgsConstructor
@NoArgsConstructor
@RestController
@RequestMapping("/goal")
public class GoalController {
  @Autowired
  private GoalService goalService;

  @PostMapping("/new")
  public ResponseEntity<?> createGoal(@AuthenticationPrincipal UserEntity user, @RequestBody GoalsEntity goal) {
    if (user == null){
      return ResponseEntity.status(403).body(Map.of(
          "error:", "Forbidden",
          "message", "User is not authenticated"
      ));

    }
    try{
      GoalsEntity createGoal = goalService.createGoal(goal, user);
      return ResponseEntity.status(201).body(Map.of(
          "message", "Goal created successfully",
          "goal", createGoal,
          "points",user.getPoints()
      ));

    }catch (IllegalArgumentException e){
      return ResponseEntity.badRequest().body(Map.of(
          "error", "Validation error",
          "message", e.getMessage()
      ));
    }catch (Exception e){
      return ResponseEntity.status(500).body(Map.of(
          "error", "Internal server error",
          "message", "unexpected error"
      ));
    }
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> getGoalById(@PathVariable Long id) {
    return goalService.getGoalById(id);
  }

  @GetMapping("/user/{userId}")
  public ResponseEntity<?> getGoalsByUserId(@PathVariable Long userId) {
    return goalService.getGoalsByUserId(userId);
  }


  @PutMapping("/{goalId}")
  public GoalsEntity updateGoal(@PathVariable Long goalId, @RequestBody GoalsEntity updateGoal) {
    return goalService.updateGoal(goalId, updateGoal);
  }

  @DeleteMapping("/{goalId}")
  public ResponseEntity<?> deleteGoalById(@PathVariable Long goalId) {
    return goalService.deleteGoalById(goalId);
  }

  @DeleteMapping("/name/{goalName}")
  public void deleteGoalByName(@PathVariable String goalName) {
    goalService.deleteGoalByName(goalName);
  }

}
