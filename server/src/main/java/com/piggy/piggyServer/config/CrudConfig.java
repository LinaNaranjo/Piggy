package com.piggy.piggyServer.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CrudConfig implements WebMvcConfigurer {

  @Override
  public void addCorsMappings(CorsRegistry registry){
    registry.addMapping("/**") //permite que cualquier origen acceda a la API
        .allowedOrigins("http://localhost:5173") //Dominio que tiene acceso a la API
        .allowedMethods("GET", "POST", "PUT", "DELETE") //Métodos que se permiten
        .allowedHeaders("*") //Cabeceras permitidas
        .allowCredentials(true); //Permite el envío de cookies
  }
}
