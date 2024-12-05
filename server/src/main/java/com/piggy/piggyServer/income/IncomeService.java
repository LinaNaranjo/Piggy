package com.piggy.piggyServer.income;

import com.piggy.piggyServer.user.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Service
public class IncomeService {
  @Autowired
  private IncomeRepository incomeRepository;
  private IncomeEntity income;

  public IncomeEntity createIncome(IncomeEntity income, UserEntity user) {
    if (income.getName() == null || income.getName().isEmpty()){
      throw new IllegalArgumentException("Income name cannot be null or empty");
    }
    if(income.getAmount() == null || income.getAmount() <= 0){
      throw new IllegalArgumentException("Goal amount must be greater than 0");
    }
    income.setUser(user);
    return incomeRepository.save(income);
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
