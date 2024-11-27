package com.piggy.piggyServer.dto;

import com.piggy.piggyServer.user.RoleUser;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginDto {
  private String name;
  private String lastName;
  private int age;
  private String email;
  private RoleUser roleUser;
  private String token;

}
