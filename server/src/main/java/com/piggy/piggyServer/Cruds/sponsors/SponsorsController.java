package com.piggy.piggyServer.Cruds.sponsors;

import com.piggy.piggyServer.Cruds.expenses.ExpensesEntity;
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
@RequestMapping("sponsors")
public class SponsorsController {
  @Autowired
  public SponsorsService sponsorsService;

  @PostMapping("/new")
  public ResponseEntity<?> createSponsor(@AuthenticationPrincipal UserEntity user, @RequestBody SponsorsEntity sponsor) {
    if (user == null) {
      return ResponseEntity.status(403).body(Map.of(
          "error:", "Forbidden",
          "message", "User is not authenticated"
      ));

    }
    try {
      SponsorsEntity createSponsor = sponsorsService.createSponsor(sponsor, user);
      return ResponseEntity.status(201).body(Map.of(
          "message", "Expense created successfully",
          "goal", createSponsor
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

  @GetMapping("/{sponsorId}")
  public ResponseEntity<?> getSponsorById(@PathVariable Long id){
    return sponsorsService.getSponsorById(id);
  }

  @GetMapping("/user/{userId}")
  public ResponseEntity<?> getSponsorByUserId(@PathVariable Long userId) {
    return sponsorsService.getSponsorByUserId(userId);
  }
  @DeleteMapping("{SponsorId}")
  public ResponseEntity<?> deleteByExpenseId(@PathVariable Long incomeId){
    return sponsorsService.deleteSponsorById(incomeId);
  }
}
