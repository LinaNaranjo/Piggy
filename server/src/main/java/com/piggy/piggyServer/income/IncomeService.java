package com.piggy.piggyServer.income;

import com.piggy.piggyServer.user.UserEntity;
import com.piggy.piggyServer.user.UserRepository;
import com.piggy.piggyServer.user.UserService;
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
public class IncomeService {
  @Autowired
  private IncomeRepository incomeRepository;
  private IncomeEntity income;

  @Autowired
  private UserService userService;
  @Autowired
  private UserRepository userRepository;

  public IncomeEntity createIncome(IncomeEntity income, UserEntity user) {
    if (income.getName() == null || income.getName().isEmpty()){
      throw new IllegalArgumentException("Income name cannot be null or empty");
    }
    if(income.getAmount() == null || income.getAmount() <= 0){
      throw new IllegalArgumentException("Expense amount must be greater than 0");
    }
    income.setUser(user);
    IncomeEntity savedIncome = incomeRepository.save(income);

    userService.addPointsUser(user.getId(), 10);

    UserEntity updatedUser = userRepository.findById(user.getId())
        .orElseThrow(() -> new IllegalArgumentException("User not found after update"));
    income.setUser(updatedUser);
    return savedIncome;

  }

  public ResponseEntity<?> getIncomeById(Long incomeId) {
    if (!incomeRepository.existsById(incomeId)) {
      return ResponseEntity.status(404).body(Map.of(
          "error", "Not Found",
          "Message", "Income with ID " + incomeId + "does not exist"
      ));
    }
    IncomeEntity income = incomeRepository.findById(incomeId).orElseThrow(null);
    return ResponseEntity.ok(incomeId);
  }

  public ResponseEntity<?> getIncomesByUserId(Long userId) {
    List<IncomeEntity> userIncomes = incomeRepository.findByUserId(userId);
    if (userIncomes.isEmpty()) {
      return ResponseEntity.status(404).body(Map.of(
          "error", "Not found",
          "Message", "No goals found for the user with ID" + userId
      ));
    }
    return ResponseEntity.ok(userIncomes);
  }

  //"?": tipo de respuesta flexible, puede ser cualquiera
  public ResponseEntity<?> deleteIncomeById(Long incomeId) {
    if (!incomeRepository.existsById(incomeId)) {
      return ResponseEntity.status(404).body(Map.of(
          "error", "Not Found",
          "Message", "Income with ID" + incomeId + "does not exist"));
    }
    incomeRepository.deleteById(incomeId);
    return ResponseEntity.ok(Map.of(
        "Message", "Income with ID" + incomeId + "has been successfully deleted"));
  }
}
