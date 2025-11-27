package com.example.backend.dto.response.role;

import com.example.backend.constant.RoleType;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoleInfoResponse {
    private Long roleID;
    private RoleType roleName;
    private String roleDesc;
}
