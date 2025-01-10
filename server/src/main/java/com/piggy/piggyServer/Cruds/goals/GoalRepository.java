package com.piggy.piggyServer.Cruds.goals;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GoalRepository extends JpaRepository<GoalsEntity, Long> {
  List<GoalsEntity> findByUserId(Long userId);

  //obtener un goal por nombre
  GoalsEntity findByGoalName(String goalName); //el nombre de la funcion debe ser igual al nombre del campo en la base de datos
}
