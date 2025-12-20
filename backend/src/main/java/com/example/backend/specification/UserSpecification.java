package com.example.backend.specification;

import com.example.backend.constant.RoleType;
import com.example.backend.entity.Role;
import com.example.backend.entity.User;
import jakarta.persistence.criteria.Join;
import org.springframework.data.jpa.domain.Specification;

public class UserSpecification {
    public static Specification<User> likeUserName(String userName) {
        return (root, query, cb)
                -> cb.like(root.get("userName"), "%" + userName.toLowerCase() + "%");
    }
    public static Specification<User> likeFullName(String userName){
        return (root, query, cb)
                -> cb.like(root.get("fullName"), "%" + userName.toLowerCase() + "%");
    }
    public static Specification<User> hasStudentNumber(String identityNumber){
        return (root, query, cb)
                -> cb.equal(root.get("identityNumber"), identityNumber);
    }
    public static Specification<User> likeGmail(String gmail){
        return (root, query, cb)
                -> cb.equal(root.get("gmail"), "%" + gmail.toLowerCase() + "%");
    }
    public static Specification<User> hasRole(RoleType roleType){
        return (root, query, cb) -> {
            Join<User, Role> roleJoin = root.join("role");
            return cb.equal(roleJoin.get("roleName"), roleType);
        };
    }

}

