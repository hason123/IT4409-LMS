package com.example.backend.service;

import com.example.backend.dto.request.PermissionRequest;
import com.example.backend.dto.response.permission.PermissionInfoResponse;
import com.example.backend.entity.Permission;
import java.util.List;

public interface PermissionService {
    PermissionInfoResponse createPermission(PermissionRequest request);
    
    PermissionInfoResponse updatePermission(Long id, PermissionRequest request);
    
    void deletePermissionById(Long id);
    
    PermissionInfoResponse getPermissionById(Long id);
    
    List<PermissionInfoResponse> getAllPermissions();
    
    PermissionInfoResponse convertPermissionToDTO(Permission permission);
    
    Permission getPermissionByName(String name);
}
