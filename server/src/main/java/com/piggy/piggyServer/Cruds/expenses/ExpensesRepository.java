package com.piggy.piggyServer.Cruds.expenses;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExpensesRepository extends JpaRepository<ExpensesEntity, Long> {
  List<ExpensesEntity> findByUserId(Long userId);
}
