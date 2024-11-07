package com.piggy.piggyServer.controller; // Asegúrate de que el paquete sea correcto

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class HelloController { // Nombre corregido de la clase

  @GetMapping("/hello")
  public String hello() {
    return "Hello World!";
  }
}
