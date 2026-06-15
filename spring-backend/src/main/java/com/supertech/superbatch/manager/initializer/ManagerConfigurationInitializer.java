package com.supertech.superbatch.manager.initializer;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.manager.entity.Permission;
import com.supertech.superbatch.manager.entity.Role;
import com.supertech.superbatch.manager.entity.Users;
import com.supertech.superbatch.manager.enums.ModuleType;
import com.supertech.superbatch.manager.repository.PermissionRepository;
import com.supertech.superbatch.manager.repository.RoleRepository;
import com.supertech.superbatch.manager.repository.UsersRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ManagerConfigurationInitializer implements CommandLineRunner {
    private final RoleRepository roleRepository;
    private final PermissionRepository permissionRepository;
    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        seedRole();
        seedPermission();
        seedUser();
    }

    private void seedRole() {
        if (!roleRepository.existsByName("Administrator")) {
            Role role = Role.builder()
                    .name("Administrator")
                    .description("Full system access")
                    .active(true)
                    .build();
            roleRepository.save(role);
        }
    }

    private void seedPermission() {
        Role role = roleRepository.findByName("Administrator")
                .orElseThrow(() -> new ResourceNotFoundException("Role not found."));
        for (ModuleType module : ModuleType.values()) {
            if (!permissionRepository.existsByRoleIdAndModuleId(role.getId(), module.getId())) {
                Permission permission = Permission.builder()
                        .module(module)
                        .role(role)
                        .canRead(true)
                        .canWrite(true)
                        .build();
                permissionRepository.save(permission);
            }
        }
    }

    private void seedUser() {
        if (!usersRepository.existsByName("Super Admin")) {
            Role role = roleRepository.findByName("Administrator")
                    .orElseThrow(() -> new ResourceNotFoundException("Role not found."));
            Users users = Users.builder()
                    .name("Super Admin")
                    .email("itotsoftware@supertech.co.in")
                    .password(passwordEncoder.encode("Super@123"))
                    .role(role)
                    .build();
            users = usersRepository.save(users);
            users.setCreatedBy(users);
            usersRepository.save(users);
        }
    }

}
