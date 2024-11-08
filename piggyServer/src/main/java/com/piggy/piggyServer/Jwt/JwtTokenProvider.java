package com.piggy.piggyServer.Jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;

@Service
public class JwtTokenProvider {
  private final String jwtSecret = "QnFybGZMVzJmbkpFclpGQ3NyZzVZSkpINzkwbkVzWTM=";
  public String getToken(UserDetails userDetails){
    return getToken(new HashMap<>(), userDetails);
  }

  //Generar jwt token
  private String getToken(HashMap<String, Object> extraClaims, UserDetails userDetails){
    return Jwts.builder()
        .setClaims(extraClaims)
        .setSubject(userDetails.getUsername())//TODO validar si es getusername o getemail
        .setIssuedAt(new Date(System.currentTimeMillis())) //fecha de creacion del token
        .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) //10 horas de expiracion
        .signWith(getKey(),SignatureAlgorithm.HS256)
        .compact();
  }

  private SignatureAlgorithm getKey() {
  }

}
