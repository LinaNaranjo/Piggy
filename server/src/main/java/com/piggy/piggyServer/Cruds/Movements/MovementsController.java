package com.piggy.piggyServer.Cruds.Movements;

import com.piggy.piggyServer.Cruds.user.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@AllArgsConstructor
@NoArgsConstructor
@Data
@RestController
@RequestMapping("/movement")
public class MovementsController {
  @Autowired
  private MovementsService movementsService;

  @PostMapping("/new")
  public ResponseEntity<?> createMovement(@AuthenticationPrincipal UserEntity user, @RequestBody MovementsEntity movements){
    if (user == null) {
      return ResponseEntity.status(403).body(Map.of(
          "error:", "Forbidden",
          "message", "User is not authenticated"
      ));

    }
    try {
      MovementsEntity movement = movementsService.createMovement(movements, user);
      return ResponseEntity.status(201).body(Map.of(
          "message", "Movement created successfully",
          "Income", movement
      ));

    } catch (IllegalArgumentException e) {
      return ResponseEntity.badRequest().body(Map.of(
          "error", "Validation error",
          "message", e.getMessage()
      ));
    } catch (Exception e) {
      return ResponseEntity.status(500).body(Map.of(
          "error", "Internal server error",
          "message", "unexpected error",
          "error: ", e.getMessage()
      ));
    }
  }

  @GetMapping("/{movementId}")
  public ResponseEntity<?> getMovementById(@PathVariable Long id){
    return movementsService.getMovementById(id);
  }

  @GetMapping("/user/{userId}")
  public ResponseEntity<?> getMovementByUserId(@PathVariable Integer userId) {
    return movementsService.getIncomesByUserId(userId);
  }

  @PutMapping("/{movementId}")
  public MovementsEntity updateMovement(@PathVariable Long movementId, @RequestBody MovementsEntity updateMovement){
    return movementsService.updateIncome(movementId, updateMovement);
  }

  @DeleteMapping("{movementId}")
  public ResponseEntity<?> deleteByMovement(@PathVariable Long movementId){
    return movementsService.deleteIncomeById(movementId);
  }

}
