package com.piggy.piggyServer.authLogin;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

  private final AuthService authService;

  /*
  * @PostMapping("/register")
  public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest registerRequest) {
    return ResponseEntity.ok(authService.register(registerRequest));

  }*/

  @PostMapping("/register")
  public ResponseEntity<String> register(@RequestBody RegisterRequest registerRequest) {
    String response = authService.register(registerRequest);  // El servicio ahora devuelve un String
    return ResponseEntity.ok(response);  // Devuelve la respuesta como un String con el mensaje
  }


  @PostMapping("/login")
  public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
    // Llamamos al servicio de login que ahora devuelve el mensaje de bienvenida
    String welcomeMessage = authService.login(loginRequest);

    // Devolvemos el mensaje en la respuesta con un código HTTP 200 OK
    return ResponseEntity.ok(welcomeMessage);
  }

}
