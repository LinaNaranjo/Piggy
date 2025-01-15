package com.piggy.piggyServer.Cruds.Movements;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovementsRepository extends JpaRepository<MovementsEntity, Long> {
  List<MovementsEntity> findByUserId(Integer userId);
}
