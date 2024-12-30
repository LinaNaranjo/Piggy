package com.piggy.piggyServer.Login.authLogin;

import com.piggy.piggyServer.dto.LoginDto;
import com.piggy.piggyServer.dto.RegisterDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
  private final AuthService authService;

  @Autowired
  public AuthController(AuthService authService) {
    this.authService = authService;
  }

  @PostMapping(value = "register")
  public ResponseEntity<RegisterDto> register(@RequestBody RegisterRequest request)
  {
    return ResponseEntity.ok(authService.register(request));
  }

  @PostMapping(value = "login")
  public ResponseEntity<LoginDto> login(@RequestBody LoginRequest request)
  {
    return ResponseEntity.ok(authService.login(request));
  }
}
