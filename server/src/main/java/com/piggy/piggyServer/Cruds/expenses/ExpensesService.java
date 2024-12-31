package com.piggy.piggyServer.Cruds.expenses;

import com.piggy.piggyServer.Cruds.income.IncomeEntity;
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
      throw new IllegalArgumentException("Expense name cannot be null or empty");
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
          "Message", "Expense with ID " + expenseId + "does not exist"
      ));
    }
    ExpensesEntity expenses = expensesRepository.findById(expenseId).orElseThrow(null);
    return ResponseEntity.ok(expenseId);
  }

  public ResponseEntity<?> getExpensesByUserId(Long userId) {
    List<ExpensesEntity> userExpense = expensesRepository.findByUserId(userId);
    if (userExpense.isEmpty()) {
      return ResponseEntity.status(404).body(Map.of(
          "error", "Not found",
          "Message", "No expense found for the user with ID" + userId
      ));
    }
    return ResponseEntity.ok(userExpense);
  }

  public ExpensesEntity updateExpense(Long expenseId, ExpensesEntity updateExpense){
    ExpensesEntity expense = expensesRepository.findById(expenseId).orElseThrow(() -> new IllegalArgumentException("Income not found"));
    expense.setName(updateExpense.getName());
    expense.setDate(updateExpense.getDate());
    expense.setAmount(updateExpense.getAmount());

    return expensesRepository.save(expense);
  }

  public ResponseEntity<?> deleteExpenseById(Long expenseId) {
    if (!expensesRepository.existsById(expenseId)) {
      return ResponseEntity.status(404).body(Map.of(
          "error", "Not Found",
          "Message", "Expense with ID" + expenseId + "does not exist"));
    }
    expensesRepository.deleteById(expenseId);
    return ResponseEntity.ok(Map.of(
        "Message", "Expense with ID" + expenseId + "has been successfully deleted"));
  }
}
