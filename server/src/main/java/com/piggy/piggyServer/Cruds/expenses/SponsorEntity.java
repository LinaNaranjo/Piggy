package com.piggy.piggyServer.Cruds.expenses;

import com.piggy.piggyServer.Cruds.user.UserEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;


@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "Expenses")
public class SponsorEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String name;
  @Column(name = "date_created")
  private Date date;
  private Double amount;

  @ManyToOne //Muchos gastos pueden estar relacionado a un usario
  @JoinColumn(name = "user_id", nullable = false)
  private UserEntity user;
}
