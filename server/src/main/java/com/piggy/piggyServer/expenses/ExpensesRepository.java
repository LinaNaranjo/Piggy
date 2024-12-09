package com.piggy.piggyServer.expenses;

import com.piggy.piggyServer.income.IncomeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExpensesRepository extends JpaRepository<ExpensesEntity, Long> {
  List<ExpensesEntity> findByUserId(Long userId);
}
