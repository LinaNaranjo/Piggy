package com.piggy.piggyServer.goals;


import com.piggy.piggyServer.user.UserEntity;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@RestController
@RequestMapping("/goal")
public class GoalController {
  @Autowired
  private GoalService goalService;



  //Crear Goal
  @PostMapping("/new")
  public ResponseEntity<GoalsEntity> createGoal(@AuthenticationPrincipal UserEntity user, @RequestBody GoalsEntity goals) {
    UserEntity refUser = new UserEntity();
    goals.setUser(user); // Asocia la meta con el usuario autenticado.
    goalService.createGoal(goals); // Guarda la meta.
    return ResponseEntity.ok(goals);
  }

  private boolean userPermission(UserEntity user, Integer id){
    return user.getId().equals(id);
  }

  //Obeneter goals por usario
  @GetMapping("/user/{userId}")
  public List<GoalsEntity> getGoalsByUserId(Long userId) {
    return goalService.getGoalsByUserId(userId);
  }

  //Obtener goal por id
  @GetMapping("/{id}")
  public GoalsEntity getGoalById(Long id) {
    return goalService.getGoalById(id);
  }

  //actualizar meta
  @PutMapping("/{goalId}")
  public GoalsEntity updateGoal(@PathVariable Long goalId, @RequestBody GoalsEntity updateGoal) {
    return goalService.updateGoal(goalId, updateGoal);
  }

  //eliminar meta por id
  @DeleteMapping("/{goalId}")
  public void deleteGoalById(@PathVariable Long goalId) {
    goalService.deleteGoalById(goalId);
  }

  //eliminar meta por nombre
  @DeleteMapping("/name/{goalName}")
  public void deleteGoalByName(@PathVariable String goalName) {
    goalService.deleteGoalByName(goalName);
  }

}
