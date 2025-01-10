package com.piggy.piggyServer.Cruds.sponsors;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SponsorsRepository extends JpaRepository<SponsorsEntity, Long> {
  List<SponsorsEntity> findByUserId(Long userId);
}
