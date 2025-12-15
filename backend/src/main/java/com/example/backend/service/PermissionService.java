package com.example.backend.service;

import com.example.backend.entity.Permission;
import com.example.backend.repository.PermissionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class PermissionService {
    private final PermissionRepository permissionRepository;
    
    public Permission create(Permission permission) {
        return permissionRepository.save(permission);
    }
    
    @Transactional(readOnly = true)
    public List<Permission> getAll() {
        return permissionRepository.findAll();
    }
    
    @Transactional(readOnly = true)
    public Permission getById(Long id) {
        return permissionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Permission not found with id: " + id));
    }

    public Permission update(Long id, Permission permissionDetails) {
        Permission permission = getById(id);
        
        permission.setName(permissionDetails.getName());
        permission.setApiPath(permissionDetails.getApiPath());
        permission.setMethod(permissionDetails.getMethod());
        permission.setDescription(permissionDetails.getDescription());
        
        return permissionRepository.save(permission);
    }

    public void delete(Long id) {
        Permission permission = getById(id);
        permissionRepository.delete(permission);
    }
}
