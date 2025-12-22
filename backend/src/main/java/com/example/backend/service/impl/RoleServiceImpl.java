package com.example.backend.service.impl;

import com.example.backend.constant.RoleType;
import com.example.backend.dto.request.RoleRequest;
import com.example.backend.dto.response.PageResponseDTO;
import com.example.backend.dto.response.role.RoleResponse;
import com.example.backend.entity.Permission;
import com.example.backend.entity.Role;
import com.example.backend.entity.User;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.repository.PermissionRepository;
import com.example.backend.repository.RoleRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.RoleService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.List;

@Slf4j
@Service
public class RoleServiceImpl implements RoleService {
    private final RoleRepository roleRepository;
    private final PermissionRepository permissionRepository;
    private final UserRepository userRepository;

    public RoleServiceImpl(RoleRepository roleRepository, 
                          PermissionRepository permissionRepository,
                          UserRepository userRepository) {
        this.roleRepository = roleRepository;
        this.permissionRepository = permissionRepository;
        this.userRepository = userRepository;
    }

    public RoleResponse createRole(RoleRequest request) {
        log.info("Creating new role: {}", request.getRoleName());
        
        if (roleRepository.existsByRoleName(RoleType.valueOf(request.getRoleName()))) {
            throw new DataIntegrityViolationException(
                "Role name already exists: " + request.getRoleName()
            );
        }
        
        Role role = new Role();
        role.setRoleName(RoleType.valueOf(request.getRoleName()));
        role.setRoleDesc(request.getDescription());
        
        if (request.getPermissionIds() != null && !request.getPermissionIds().isEmpty()) {
            List<Permission> permissions = request.getPermissionIds().stream()
                    .map(id -> permissionRepository.findById(id)
                            .orElseThrow(() -> {
                                log.error("Permission with id {} not found", id);
                                return new ResourceNotFoundException("Permission not found with id: " + id);
                            }))
                    .toList();
            log.info("Adding {} permissions to role", permissions.size());
            role.setPermissions(permissions);
        }
        
        Role savedRole = roleRepository.save(role);
        log.info("Role created successfully with id: {}", savedRole.getRoleID());
        
        return convertToDTO(savedRole);
    }

    @Override
    public RoleResponse updateRole(RoleRequest request, Long roleId) {
        log.info("Update role with id {}", roleId);
        
        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> {
                    log.error("Role with id {} not found", roleId);
                    return new ResourceNotFoundException("Role not found with id: " + roleId);
                });

        role.setRoleDesc(request.getDescription());
        

        if (request.getPermissionIds() != null) {
            List<Permission> permissions = request.getPermissionIds().stream()
                    .map(id -> permissionRepository.findById(id)
                            .orElseThrow(() -> {
                                log.error("Permission with id {} not found", id);
                                return new ResourceNotFoundException("Permission not found with id: " + id);
                            }))
                    .toList();
            log.info("Adding or removing permissions of a role");
            role.setPermissions(permissions);
        }
        
        roleRepository.save(role);
        log.info("Role with id {} has been updated", roleId);
        
        return convertToDTO(role);
    }

    @Override
    public void deleteRole(Long roleId) {
        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> {
                    log.error("Role with id {} not found", roleId);
                    return new ResourceNotFoundException("Role not found with id: " + roleId);
                });
        
        role.getPermissions().forEach(permission -> permission.getRoles().remove(role));
        
        role.getUsers().forEach(user -> {
            Role defaultRole = roleRepository.findByRoleName(RoleType.STUDENT)
                    .orElseThrow(() -> new ResourceNotFoundException("Default STUDENT role not found"));
            user.setRole(defaultRole);
            userRepository.save(user);
        });
        
        roleRepository.deleteById(roleId);
        log.info("Role with id {} has been deleted", roleId);
    }

    @Override
    public PageResponseDTO<RoleResponse> getPageRole(Pageable pageable) {
        log.info("Get roles with page {}", pageable);
        
        Page<Role> roles = roleRepository.findAll(pageable);
        Page<RoleResponse> rolePage = roles.map(this::convertToDTO);
        
        return new PageResponseDTO<>(
                rolePage.getNumber() + 1,
                rolePage.getNumberOfElements(),
                rolePage.getTotalPages(),
                rolePage.getContent()
        );
    }

    @Override
    public RoleResponse getRole(Long roleId) {
        log.info("Get role with id {}", roleId);
        
        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> {
                    log.error("Role with id {} not found", roleId);
                    return new ResourceNotFoundException("Role not found with id: " + roleId);
                });
        
        return convertToDTO(role);
    }

    public RoleResponse convertToDTO(Role role) {
        RoleResponse response = new RoleResponse();
        response.setRoleName(role.getRoleName().toString());
        response.setRoleId(role.getRoleID());
        response.setDescription(role.getRoleDesc());
        response.setCreatedDate(role.getCreatedDate());
        response.setLastModifiedDate(role.getLastModifiedDate());
        
        // Convert permissions to DTOs
        List<RoleResponse.PermissionDTO> permissions = role.getPermissions().stream()
                .map(permission -> new RoleResponse.PermissionDTO(
                        permission.getId(),
                        permission.getName(),
                        permission.getApiPath(),
                        permission.getMethod()
                ))
                .toList();
        response.setPermissions(permissions);
        
        return response;
    }
}
