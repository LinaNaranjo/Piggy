package com.piggy.piggyServer.config;

import com.piggy.piggyServer.jwt.JwtAuthFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

  private final JwtAuthFilter jwtAuthFilter;
  private final AuthenticationProvider authenticationProvider;
  @Bean // es un objeto gestionado por el contenedor de Spring, lo que significa que Spring crea y gestiona la instancia de esta clase.
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    return http
        .csrf(csrf -> csrf.disable())
        .authorizeHttpRequests(authorizeRequests ->
            authorizeRequests
                .requestMatchers("/auth/**").permitAll()//pueden ingresar usarios sin autenticar
                .requestMatchers("/goal/**").authenticated()//solo pueden ingresar usuarios autenticados
                .requestMatchers("/income/**").authenticated()
                .anyRequest().authenticated()
        )
        //.formLogin(withDefaults()) autenticación de spring security
        // Autenticación basada en JWT...
        .sessionManagement(sessionManager -> sessionManager.sessionCreationPolicy(SessionCreationPolicy.STATELESS))  // Sin sesiones
        .authenticationProvider(authenticationProvider)
        .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
        .build();
    //autoriza a todos los usuarios a acceder a la ruta /auth/**, las demas rutas estan protegidas y muestra un formulario de login por defecto
  }
}
