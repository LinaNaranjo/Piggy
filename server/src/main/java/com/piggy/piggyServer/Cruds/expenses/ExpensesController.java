package com.piggy.piggyServer.Cruds.expenses;


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
@RequestMapping("expense")
public class ExpensesController {
  @Autowired
  public ExpensesService expensesService;

  @PostMapping("/new")
  public ResponseEntity<?> createExpense(@AuthenticationPrincipal UserEntity user, @RequestBody ExpensesEntity expense) {
    if (user == null) {
      return ResponseEntity.status(403).body(Map.of(
          "error:", "Forbidden",
          "message", "User is not authenticated"
      ));

    }
    try {
      ExpensesEntity createExpense = expensesService.createExpense(expense, user);
      return ResponseEntity.status(201).body(Map.of(
          "message", "Expense created successfully",
          "expense", createExpense
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

  @GetMapping("/{expenseId}")
  public ResponseEntity<?> getExpenseById(@PathVariable Long id){
    return expensesService.getExpenseById(id);
  }

  @GetMapping("/user/{userId}")
  public ResponseEntity<?> getExpenseByUserId(@PathVariable Long userId) {
    return expensesService.getExpensesByUserId(userId);
  }
  @DeleteMapping("{expenseId}")
  public ResponseEntity<?> deleteByExpenseId(@PathVariable Long expenseId){
    return expensesService.deleteExpenseById(expenseId);
  }
}
