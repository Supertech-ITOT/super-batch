package com.supertech.superbatch.manager.common.initializer;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.manager.module.entity.Module;
import com.supertech.superbatch.manager.module.enums.ModuleType;
import com.supertech.superbatch.manager.module.repository.ModuleRepository;
import com.supertech.superbatch.manager.permission.entity.Permission;
import com.supertech.superbatch.manager.permission.repository.PermissionRepository;
import com.supertech.superbatch.manager.role.entity.Role;
import com.supertech.superbatch.manager.role.repository.RoleRepository;
import com.supertech.superbatch.manager.user.entity.User;
import com.supertech.superbatch.manager.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ManagerConfigurationInitializer implements CommandLineRunner {
    private final RoleRepository roleRepository;
    private final PermissionRepository permissionRepository;
    private final ModuleRepository moduleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        seedModule();
        seedRole();
        seedPermission();
        seedUser();
    }

    private void seedModule() {
        for (ModuleType type : ModuleType.values()) {
            if (!moduleRepository.existsById(type.getId())) {
                Module module = Module.builder()
                        .id(type.getId())
                        .name(type.name())
                        .build();

                moduleRepository.save(module);
            }
        }
    }

    private void seedRole() {
        if (!roleRepository.existsByName("System")) {
            Role role = Role.builder()
                    .name("System")
                    .description("Full system access")
                    .build();
            roleRepository.save(role);
        }
    }

    private void seedPermission() {
        Role role = roleRepository.findByName("System")
                .orElseThrow(() -> new ResourceNotFoundException("Role not found."));
        for (ModuleType type : ModuleType.values()) {
            Module module = moduleRepository.findById(type.getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Module not found."));
            if (!permissionRepository.existsByRoleIdAndModuleId(role.getId(), module.getId())) {
                Permission permission = Permission.builder()
                        .module(module)
                        .role(role)
                        .access(true)
                        .build();
                permissionRepository.save(permission);
            }
        }
    }

    private void seedUser() {
        if (!userRepository.existsByName("Super Admin")) {
            Role role = roleRepository.findByName("System")
                    .orElseThrow(() -> new ResourceNotFoundException("Role not found."));
            User user = User.builder()
                    .name("Super Admin")
                    .email("itotsoftware@supertech.co.in")
                    .password(passwordEncoder.encode("Super@123"))
                    .role(role)
                    .build();
            user = userRepository.save(user);
            user.setCreatedBy(user);
            userRepository.save(user);
        }
    }

}
