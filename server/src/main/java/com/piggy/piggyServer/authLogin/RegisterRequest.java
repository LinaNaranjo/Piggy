package com.piggy.piggyServer.authLogin;

import com.piggy.piggyServer.user.RoleUser;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
  String name;
  String lastName;
  Integer age;
  String email;
  String password;
  RoleUser roleUser;
}