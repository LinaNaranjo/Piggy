package com.piggy.piggyServer.income;

import com.piggy.piggyServer.goals.GoalsEntity;
import com.piggy.piggyServer.user.UserEntity;
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
    if(user == null){
      return ResponseEntity.status(403).body(Map.of("error", "User not authenticated"));
    }
    income.setUser(user);
    IncomeEntity savedIncome = incomeService.createIncome(income, user);
    return ResponseEntity.ok(savedIncome);
  }

  public ResponseEntity<?> getIncomeById(@PathVariable Long id){
    return incomeService.getIncomeById(id);
  }

  @DeleteMapping("{incomeId}")
  public ResponseEntity<?> deleteByIncomeId(@PathVariable Long incomeId){
    return incomeService.deleteIncomeById(incomeId);
  }

}
