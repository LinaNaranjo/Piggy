// Este filtro se encarga de verificar la validez del token en cada petición y autenticar al usuario.
package com.piggy.piggyServer.Jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

  private JwtTokenProviderService jwtTokenProviderService;
  private UserDetailsService userDetailsService;

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
    final String token = getTokenFromRequiest(request);
    final String username;

    if (token == null){
      filterChain.doFilter(request, response);
      return;
    }
    username = jwtTokenProviderService.getUsernameFromToken(token);
    /*Valida
    1. que el usuario no sea nulo
    2. que no haya una autenticación previa
    */
    if(username != null && SecurityContextHolder.getContext().getAuthentication() == null){
      UserDetails userDetails = userDetailsService.loadUserByUsername(username);//cargar los detalles del usuario por su username para autenticar
      if(jwtTokenProviderService.isTokenValid(token, userDetails)){ //verifica si el token JWT es válido para el usuario proporcionado (userDetails).
        //Creación del objeto de autenticación
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        //Establecimiento de detalles adicionales de autenticación
        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        //Configuración del contexto de seguridad
        SecurityContextHolder.getContext().setAuthentication(authToken);
      }
    }
  }

  //Obtener el encabezado de autorización
  //Bearrer: prefijo que indica que el token es de tipo jwt
  private String getTokenFromRequiest(HttpServletRequest request){
    final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION); //obtener el header de autorizacion
    if(StringUtils.hasText(authHeader) && authHeader.startsWith("Bearer")){
      return authHeader.substring(7);
    }
    return null;
  }
}
