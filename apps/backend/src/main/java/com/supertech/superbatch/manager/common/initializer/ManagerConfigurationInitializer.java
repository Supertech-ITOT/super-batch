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
import com.supertech.superbatch.manager.role.entity.DefaultRole;
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

    private void createRoleIfNotExists(String name, String description, boolean systemRole) {
        if (!roleRepository.existsByNameAndDeletedFalse(name)) {
            roleRepository.save(Role.builder().name(name).description(description).systemRole(systemRole).build());
        }
    }

    private void seedRole() {
        createRoleIfNotExists("System", "Internal system account", true);
        createRoleIfNotExists("Administrator", "Full administrative access", false);
    }

    private void seedPermission() {
        seedPermissionsForRole(DefaultRole.SYSTEM);
        seedPermissionsForRole(DefaultRole.ADMINISTRATOR);
    }

    private void seedPermissionsForRole(String roleName) {
        Role role = roleRepository.findByNameAndDeletedFalse(roleName)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found: " + roleName));
        for (ModuleType type : ModuleType.values()) {
            Module module = moduleRepository.findById(type.getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Module not found."));
            if (!permissionRepository.existsByRoleIdAndModuleId(role.getId(), module.getId())) {
                Permission permission = Permission.builder()
                        .role(role)
                        .module(module)
                        .access(true)
                        .build();
                permissionRepository.save(permission);
            }
        }
    }

    private void seedUser() {
        if (!userRepository.existsByNameAndDeletedFalse("Super Admin")) {
            Role role = roleRepository.findByNameAndDeletedFalse("System")
                    .orElseThrow(() -> new ResourceNotFoundException("Role not found."));
            User user = User.builder()
                    .name("Super Admin")
                    .email("itotsoftware@supertech.co.in")
                    .password(passwordEncoder.encode("Super@123"))
                    .role(role)
                    .systemAccount(true)
                    .build();
            user = userRepository.save(user);
            user.setCreatedBy(user);
            userRepository.save(user);
        }
    }

}
