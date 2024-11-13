package com.piggy.piggyServer.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
  @Bean // es un objeto gestionado por el contenedor de Spring, lo que significa que Spring crea y gestiona la instancia de esta clase.
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    return http
        .csrf(csrf -> csrf.disable()) //Deshabilitar la protección CSRF en Spring Security.
        .authorizeHttpRequests(authorizeRequests -> authorizeRequests //regla de autorización, como se deben manejar las solicitudes dependiendo de la ruta
            .requestMatchers("/prueba").permitAll() //prueba debe ser permitida sin necesidad de autenticación. Es decir, cualquiera podrá acceder a esta ruta sin estar autenticado.
            .anyRequest().authenticated())
        .build();
  }
}
