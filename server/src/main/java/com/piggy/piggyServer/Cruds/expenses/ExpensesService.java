package com.piggy.piggyServer.Cruds.expenses;

import com.piggy.piggyServer.Cruds.user.UserEntity;
import com.piggy.piggyServer.Cruds.user.UserRepository;
import com.piggy.piggyServer.Cruds.user.UserService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Service
public class ExpensesService {

  @Autowired
  private ExpensesRepository expensesRepository;
  @Autowired
  private UserService userService;
  @Autowired
  private UserRepository userRepository;

  public ExpensesEntity createExpense(ExpensesEntity expenses, UserEntity user) {
    if (expenses.getName() == null || expenses.getName().isEmpty()){
      throw new IllegalArgumentException("Income name cannot be null or empty");
    }
    if(expenses.getAmount() == null || expenses.getAmount() <= 0){
      throw new IllegalArgumentException("Expense amount must be greater than 0");
    }
    expenses.setUser(user);
    ExpensesEntity savedExpense = expensesRepository.save(expenses);
    userService.addPointsUser(user.getId(), 10);

    UserEntity updatedUser = userRepository.findById(user.getId())
        .orElseThrow(() -> new IllegalArgumentException("User not found after update"));
    expenses.setUser(updatedUser);
    return savedExpense;
  }

  public ResponseEntity<?> getExpenseById(Long expenseId) {
    if (!expensesRepository.existsById(expenseId)) {
      return ResponseEntity.status(404).body(Map.of(
          "error", "Not Found",
          "Message", "Income with ID " + expenseId + "does not exist"
      ));
    }
    ExpensesEntity expenses = expensesRepository.findById(expenseId).orElseThrow(null);
    return ResponseEntity.ok(expenseId);
  }

  public ResponseEntity<?> getIncomesByUserId(Long userId) {
    List<ExpensesEntity> userIncomes = expensesRepository.findByUserId(userId);
    if (userIncomes.isEmpty()) {
      return ResponseEntity.status(404).body(Map.of(
          "error", "Not found",
          "Message", "No goals found for the user with ID" + userId
      ));
    }
    return ResponseEntity.ok(userIncomes);
  }

  public ResponseEntity<?> deleteExpenseById(Long incomeId) {
    if (!expensesRepository.existsById(incomeId)) {
      return ResponseEntity.status(404).body(Map.of(
          "error", "Not Found",
          "Message", "Income with ID" + incomeId + "does not exist"));
    }
    expensesRepository.deleteById(incomeId);
    return ResponseEntity.ok(Map.of(
        "Message", "Income with ID" + incomeId + "has been successfully deleted"));
  }
}
