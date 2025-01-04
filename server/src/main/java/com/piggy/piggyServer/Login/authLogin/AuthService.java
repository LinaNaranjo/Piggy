package com.piggy.piggyServer.Login.authLogin;

import com.piggy.piggyServer.dto.LoginDto;
import com.piggy.piggyServer.dto.RegisterDto;
import com.piggy.piggyServer.Login.jwt.JwtTokenProviderService;
import com.piggy.piggyServer.Cruds.user.UserEntity;
import com.piggy.piggyServer.Cruds.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class AuthService {

  private final UserRepository userRepository;
  private final JwtTokenProviderService jwtTokenProviderService;
  private final PasswordEncoder passwordEncoder;
  private final AuthenticationManager authenticationManager;

  public RegisterDto register(RegisterRequest registerRequest) {
    if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
      throw new RuntimeException("Email already exists: " + registerRequest.getEmail());
    }
    //validacion de correo electronico valido
    validateEmail(registerRequest.getEmail());
    //patrón de diseño builder para la creación de objetos
    UserEntity userEntity = UserEntity.builder()
        .name(registerRequest.getName())
        .lastName(registerRequest.getLastName())
        .age(registerRequest.getAge())
        .email(registerRequest.getEmail())
        .password(passwordEncoder.encode(registerRequest.getPassword()))
        .roleUser(registerRequest.getRoleUser())
        .points(0)
        .build();
    userRepository.save(userEntity);
    //return AuthResponse.builder().token(jwtTokenProviderService.getToken(userEntity)).build();
    return new RegisterDto(userEntity.getId(), userEntity.getName(), userEntity.getLastName(), userEntity.getAge(), userEntity.getEmail(), userEntity.getRoleUser());
  }

  public void validateEmail(String email) {
    Pattern pattern = Pattern.compile("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$");
    Matcher matcher = pattern.matcher(email);
    if (!matcher.matches()) {
      throw new RuntimeException("Invalid email format");
    }
  }

  public LoginDto login(LoginRequest loginRequest){
    authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
    //UserDetails user = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow();//busqueda del usario
    UserEntity userEntity = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow(() -> new RuntimeException("User not found "));

    String token = jwtTokenProviderService.getToken(userEntity);//obtención del token
    return new LoginDto(userEntity.getId(), userEntity.getName(), userEntity.getLastName(), userEntity.getAge(), userEntity.getEmail(), userEntity.getRoleUser(), token);
  }
}