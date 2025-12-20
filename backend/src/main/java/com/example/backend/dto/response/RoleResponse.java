package com.example.backend.dto.response;

import com.example.backend.constant.RoleType;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoleResponse {
    private Long roleID;
    private RoleType roleName;
    private String roleDesc;
    private List<String> permissionIds;
}
