package com.piggy.piggyServer.authLogin;

import com.piggy.piggyServer.dto.LoginDto;
import com.piggy.piggyServer.dto.RegisterDto;
import com.piggy.piggyServer.jwt.JwtTokenProviderService;
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

  public RegisterDto register(RegisterRequest registerRequest) {
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
    return new RegisterDto(userEntity.getName(), userEntity.getLastName(), userEntity.getAge(), userEntity.getEmail(), userEntity.getRoleUser(), jwtTokenProviderService.getToken(userEntity));
  }

/*  public AuthResponse login(LoginRequest loginRequest){
    authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
    UserDetails user = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow();//busqueda del usario
    String token = jwtTokenProviderService.getToken(user);//obtención del token
    return AuthResponse.builder()//patrón de diseño builder para la creación de objetos
        .token(token)//token
        .build();
  }*/

  public LoginDto login(LoginRequest loginRequest){
    authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
    //UserDetails user = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow();//busqueda del usario
    UserEntity userEntity = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow(() -> new RuntimeException("User not found "));
    String token = jwtTokenProviderService.getToken(userEntity);//obtención del token
    return new LoginDto(userEntity.getName(), userEntity.getLastName(), userEntity.getAge(), userEntity.getEmail(), userEntity.getRoleUser(), token);
  }


}