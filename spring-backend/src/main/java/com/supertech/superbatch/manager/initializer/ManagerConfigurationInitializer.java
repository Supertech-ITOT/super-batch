package com.supertech.superbatch.manager.initializer;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.manager.entity.Module;
import com.supertech.superbatch.manager.entity.Permission;
import com.supertech.superbatch.manager.entity.Role;
import com.supertech.superbatch.manager.entity.Users;
import com.supertech.superbatch.manager.enums.ModuleType;
import com.supertech.superbatch.manager.repository.ModuleRepository;
import com.supertech.superbatch.manager.repository.PermissionRepository;
import com.supertech.superbatch.manager.repository.RoleRepository;
import com.supertech.superbatch.manager.repository.UsersRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ManagerConfigurationInitializer implements CommandLineRunner {
    private final RoleRepository roleRepository;
    private final PermissionRepository permissionRepository;
    private final ModuleRepository moduleRepository;
    private final UsersRepository usersRepository;

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
        for (ModuleType type : ModuleType.values()) {
            Module module = moduleRepository.findById(type.getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Module not found."));
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
                    .role(role)
                    .build();
            users = usersRepository.save(users);
            users.setCreatedBy(users);
            usersRepository.save(users);
        }
    }

}
