package com.piggy.piggyServer.auth;

import com.piggy.piggyServer.Jwt.JwtTokenProviderService;
import com.piggy.piggyServer.user.UserEntity;
import com.piggy.piggyServer.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
  private final UserRepository userRepository;
  private final JwtTokenProviderService jwtTokenProviderService;
  private final PasswordEncoder passwordEncoder;
  private final AuthenticationManager authenticationManager;

  public String register(RegisterRequest registerRequest) {
    //patrón de diseño builder para la creación de objetos
    UserEntity userEntity = UserEntity.builder()
        .name(registerRequest.getName())
        .lastName(registerRequest.getLastName())
        .age(registerRequest.getAge())
        .email(registerRequest.getEmail())
        .password(passwordEncoder.encode(registerRequest.getPassword()))
        .roleUser(registerRequest.getRoleUser())
        .build();
    userRepository.save(userEntity);
    //return AuthResponse.builder().token(jwtTokenProviderService.getToken(userEntity)).build();
    return "Usuario registrado";
  }

/*  public AuthResponse login(LoginRequest loginRequest){
    authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
    UserDetails user = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow();//busqueda del usario
    String token = jwtTokenProviderService.getToken(user);//obtención del token
    return AuthResponse.builder()//patrón de diseño builder para la creación de objetos
        .token(token)//token
        .build();
  }*/

  public String login(LoginRequest loginRequest){
    authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
    UserDetails user = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow();//busqueda del usario
    String token = jwtTokenProviderService.getToken(user);//obtención del token
    return "Bienvenido " + loginRequest.email; //Todo: Traer nombre del usuario
  }


}