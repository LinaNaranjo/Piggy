package com.piggy.piggyServer.Cruds.sponsors;

import com.piggy.piggyServer.Cruds.user.UserEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "sponsors")
public class SponsorsEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String name;
  private Integer contributions;
  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  private UserEntity user;




}
