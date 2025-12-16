package com.example.backend.controller;

import com.example.backend.entity.Permission;
import com.example.backend.service.PermissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/permissions")
@RequiredArgsConstructor
public class PermissionController {
    private final PermissionService permissionService;
    
    @PostMapping
    public ResponseEntity<Permission> create(@RequestBody Permission permission) {
        Permission createdPermission = permissionService.create(permission);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdPermission);
    }
    
    @GetMapping
    public ResponseEntity<List<Permission>> getAll() {
        List<Permission> permissions = permissionService.getAll();
        return ResponseEntity.ok(permissions);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Permission> getById(@PathVariable Long id) {
        Permission permission = permissionService.getById(id);
        return ResponseEntity.ok(permission);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Permission> update(
            @PathVariable Long id,
            @RequestBody Permission permissionDetails) {
        Permission updatedPermission = permissionService.update(id, permissionDetails);
        return ResponseEntity.ok(updatedPermission);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        permissionService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
