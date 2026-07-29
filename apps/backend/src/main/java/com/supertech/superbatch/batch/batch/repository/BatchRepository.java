package com.supertech.superbatch.batch.batch.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.supertech.superbatch.batch.batch.entity.Batch;

public interface BatchRepository extends JpaRepository<Batch, Long> {

}
