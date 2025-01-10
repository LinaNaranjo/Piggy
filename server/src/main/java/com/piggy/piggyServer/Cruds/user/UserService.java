package com.piggy.piggyServer.Cruds.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Service
public class UserService {

  @Autowired
  private UserRepository userRepository;

  public void addPointsUser(Integer userId, Integer pointsToAdd){
    //Busca user por id
    UserEntity user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("user not found for points"));
    Integer newPoints = user.getPoints() + pointsToAdd;
    user.setPoints(newPoints);
    userRepository.save(user);
  }
}
