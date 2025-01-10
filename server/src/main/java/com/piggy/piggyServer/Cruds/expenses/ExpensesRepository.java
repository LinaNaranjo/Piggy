package com.piggy.piggyServer.Cruds.expenses;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ExpensesRepository extends JpaRepository<SponsorEntity, Long> {
  List<SponsorEntity> findByUserId(Long userId);
}
