package com.piggy.piggyServer.income;

import com.piggy.piggyServer.goals.GoalsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IncomeRepository extends JpaRepository<IncomeEntity, Long> {
  List<IncomeEntity> findByUserId(Long userId);
}
