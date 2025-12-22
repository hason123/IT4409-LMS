package com.example.backend.service;

import com.example.backend.dto.request.RoleRequest;
import com.example.backend.dto.response.PageResponseDTO;
import com.example.backend.dto.response.role.RoleResponse;
import org.springframework.data.domain.Pageable;

public interface RoleService {

    RoleResponse createRole(RoleRequest request);
  
    RoleResponse updateRole(RoleRequest request, Long roleId);
    
    void deleteRole(Long roleId);
    
    PageResponseDTO<RoleResponse> getPageRole(Pageable pageable);
    
    RoleResponse getRole(Long roleId);
}
