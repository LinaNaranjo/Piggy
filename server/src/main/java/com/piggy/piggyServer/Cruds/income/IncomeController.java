package com.piggy.piggyServer.Cruds.income;

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
@RequestMapping("/income")
public class IncomeController {
  @Autowired
  private IncomeService incomeService;

  @PostMapping("/new")
  public ResponseEntity<?> createIncome(@AuthenticationPrincipal UserEntity user, @RequestBody IncomeEntity income){
    if (user == null) {
      return ResponseEntity.status(403).body(Map.of(
          "error:", "Forbidden",
          "message", "User is not authenticated"
      ));

    }
    try {
      IncomeEntity createIncome = incomeService.createIncome(income, user);
      return ResponseEntity.status(201).body(Map.of(
          "message", "Income created successfully",
          "goal", createIncome
      ));

    } catch (IllegalArgumentException e) {
      return ResponseEntity.badRequest().body(Map.of(
          "error", "Validation error",
          "message", e.getMessage()
      ));
    } catch (Exception e) {
      return ResponseEntity.status(500).body(Map.of(
          "error", "Internal server error",
          "message", "unexpected error"
      ));
    }
  }

  @GetMapping("/{incomeId}")
  public ResponseEntity<?> getIncomeById(@PathVariable Long id){
    return incomeService.getIncomeById(id);
  }

  @GetMapping("/user/{userId}")
  public ResponseEntity<?> getIncomesByUserId(@PathVariable Long userId) {
    return incomeService.getIncomesByUserId(userId);
  }

  @DeleteMapping("{incomeId}")
  public ResponseEntity<?> deleteByIncomeId(@PathVariable Long incomeId){
    return incomeService.deleteIncomeById(incomeId);
  }

}
