package com.piggy.piggyServer.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.function.Function;

@Service
public class JwtTokenProviderService {
  private final String secretKey = "QnFybGZMVzJmbkpFclpGQ3NyZzVZSkpINzkwbkVzWTM=";
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
        .signWith(getKey(),SignatureAlgorithm.HS256)//getkey: proporciona la clave secreta - HS256: algoritmo de encriptacion
        .compact();
  }

  private Key getKey() {
    byte[]keyBytes = Decoders.BASE64.decode(secretKey);
    return Keys.hmacShaKeyFor(keyBytes);
  }

  public String getUsernameFromToken(String token){
    return getClaim(token, Claims::getSubject);
  }

  public boolean isTokenValid(String token, UserDetails userDetails) {
    //verificar que el username que extraemos corresponde al usuario que se encuentra en la base de datos
    final String username = getUsernameFromToken(token);
    return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
  }

  private Claims getAllClaims(String token) {
    return Jwts.parserBuilder()
        .setSigningKey(getKey()) // Clave secreta para validar el token
        .build()
        .parseClaimsJws(token) // Aquí se procesa un token firmado (JWS)
        .getBody();
  }


  public <T> T getClaim (String token, Function<Claims, T> claimsResover){
    final Claims claims = getAllClaims(token); //obtener todos los claims
    return claimsResover.apply(claims);//aplicar la funcion
  }

  //Obtener la fecha de expiración
  private Date getExpiration(String token) {
    return getClaim(token, Claims::getExpiration);
  }

  //Verificar si el token ha expirado
  private boolean isTokenExpired(String token) {
    return getExpiration(token).before(new Date());
  }
}
