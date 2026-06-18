package com.supertech.superbatch.manager.module.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.supertech.superbatch.manager.module.entity.Module;

public interface ModuleRepository extends JpaRepository<Module, Long> {

}