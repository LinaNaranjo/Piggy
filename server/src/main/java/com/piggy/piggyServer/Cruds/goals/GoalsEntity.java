package com.piggy.piggyServer.Cruds.goals;

import com.piggy.piggyServer.Cruds.user.UserEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Goals")
public class GoalsEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  private UserEntity user;

  private String goalName;
  private Double savedAmount; //Progreso
  private Double goalAmount; //Meta a cumplir
}
