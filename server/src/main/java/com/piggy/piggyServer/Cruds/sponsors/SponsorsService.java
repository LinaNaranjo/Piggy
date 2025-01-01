package com.piggy.piggyServer.Cruds.sponsors;

import com.piggy.piggyServer.Cruds.expenses.SponsorEntity;
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
public class SponsorsService {
  @Autowired
  private SponsorsRepository sponsorsRepository;
  @Autowired
  private UserService userService;
  @Autowired
  private UserRepository userRepository;

  public SponsorsEntity createSponsor(SponsorsEntity sponsors, UserEntity user) {
    if (sponsors.getName() == null || sponsors.getName().isEmpty()){
      throw new IllegalArgumentException("Sponsor name cannot be null or empty");
    }
    sponsors.setUser(user);
    SponsorsEntity savedSponsor = sponsorsRepository.save(sponsors);
    userService.addPointsUser(user.getId(), 10);

    UserEntity updatedUser = userRepository.findById(user.getId())
        .orElseThrow(() -> new IllegalArgumentException("User not found after update"));
    sponsors.setUser(updatedUser);
    return savedSponsor;
  }

  public ResponseEntity<?> getSponsorById(Long sponsorId) {
    if (!sponsorsRepository.existsById(sponsorId)) {
      return ResponseEntity.status(404).body(Map.of(
          "error", "Not Found",
          "Message", "Sponsor with ID " + sponsorId + "does not exist"
      ));
    }
    SponsorsEntity sponsor = sponsorsRepository.findById(sponsorId).orElseThrow(null);
    return ResponseEntity.ok(sponsorId);
  }

  public ResponseEntity<?> getSponsorByUserId(Long userId) {
    List<SponsorsEntity> userSponsor = sponsorsRepository.findByUserId(userId);
    if (userSponsor.isEmpty()) {
      return ResponseEntity.status(404).body(Map.of(
          "error", "Not found",
          "Message", "No sponsor found for the user with ID" + userId
      ));
    }
    return ResponseEntity.ok(userSponsor);
  }

  public SponsorsEntity updateSponsor(Long expenseId, SponsorsEntity updateSponsor) {
    SponsorsEntity expense = sponsorsRepository.findById(expenseId)
        .orElseThrow(() -> new IllegalArgumentException("Sponsor not found"));

    if (updateSponsor.getName() != null && !updateSponsor.getName().isEmpty()) {
      expense.setName(updateSponsor.getName());
    }
    if (updateSponsor.getUser() != null) {
      expense.setUser(updateSponsor.getUser());
    }
    if (updateSponsor.getContributions() != null && updateSponsor.getContributions() > 0) {
      expense.setContributions(updateSponsor.getContributions());
    }

    return sponsorsRepository.save(expense);
  }

  public ResponseEntity<?> deleteSponsorById(Long sponsorId) {
    if (!sponsorsRepository.existsById(sponsorId)) {
      return ResponseEntity.status(404).body(Map.of(
          "error", "Not Found",
          "Message", "Sponsor with ID" + sponsorId + "does not exist"));
    }
    sponsorsRepository.deleteById(sponsorId);
    return ResponseEntity.ok(Map.of(
        "Message", "Sponsor with ID" + sponsorId + "has been successfully deleted"));
  }
}
