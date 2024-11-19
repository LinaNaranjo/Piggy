package com.piggy.piggyServer.goals;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GoalRepository extends JpaRepository <GoalsEntity, Long> {
  List<GoalsEntity> findByUserId(Long userId);
  //obtener un goal por nombre
  GoalsEntity findByGoalsName(String goalName);
}
