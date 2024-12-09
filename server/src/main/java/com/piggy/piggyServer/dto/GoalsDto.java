package com.piggy.piggyServer.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GoalsDto {
  private Long id;
  private String goalName;
  private Double savedAmount; //Progreso
  private Double goalAmount; //Meta a cumplir
  private Long userId;
}
