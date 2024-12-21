package com.piggy.piggyServer.Cruds.expenses;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ExpensesRepository extends JpaRepository<ExpensesEntity, Long> {
  List<ExpensesEntity> findByUserId(Long userId);
}
