package com.piggy.piggyServer.goals;


import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@RestController
@RequestMapping("/api/goal")
public class GoalController {

  private GoalService goalService;

  //Crear Goal
  @PostMapping
  public GoalsEntity createGoal(GoalsEntity goals){
    return goalService.createGoal(goals);
  }

  //Obeneter goals por usario
  @GetMapping("/user/{userId}")
  public List<GoalsEntity> getGoalsByUserId(Long userId){
    return goalService.getGoalsByUserId(userId);
  }

  //Obtener goal por id
  @GetMapping("/{id}")
  public GoalsEntity getGoalById(Long id){
    return goalService.getGoalById(id);
  }

  //actualizar meta
  @PutMapping("/{goalId}")
  public GoalsEntity updateGoal(@PathVariable Long goalId, @RequestBody GoalsEntity updateGoal){
    return goalService.updateGoal(goalId, updateGoal);
  }

  //eliminar meta por id
  @DeleteMapping("/{goalId}")
  public void deleteGoalById(@PathVariable Long goalId){
    goalService.deleteGoalById(goalId);
  }

  //eliminar meta por nombre
  @DeleteMapping("/name/{goalName}")
  public void deleteGoalByName(@PathVariable String goalName){
    goalService.deleteGoalByName(goalName);
  }


}
