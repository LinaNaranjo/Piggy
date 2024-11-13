package com.piggy.piggyServer.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/auth")
@RequiredArgsConstructor
public class AuthController {


  @PostMapping("/register")
  public ResponseEntity<?> register() {
    return ResponseEntity.ok().build();
  }

  @PostMapping("/login")
  public ResponseEntity<?> login() {
    return ResponseEntity.ok().build();
  }
}
