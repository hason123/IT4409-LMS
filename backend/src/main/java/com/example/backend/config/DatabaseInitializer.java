package com.example.backend.config;

import com.example.backend.constant.RoleType;
import com.example.backend.entity.Role;
import com.example.backend.entity.User;
import com.example.backend.repository.RoleRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class DatabaseInitializer implements CommandLineRunner {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public DatabaseInitializer(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    public void run(String... args) {
        if (roleRepository.count() == 0) {
            Role admin = new Role(); admin.setRoleName(RoleType.ADMIN);
            Role user = new Role(); user.setRoleName(RoleType.STUDENT);
            Role teacher = new Role(); teacher.setRoleName(RoleType.TEACHER);
            roleRepository.saveAll(List.of(admin, user, teacher));
        }
        if (userRepository.count() == 0) {
            User admin = new User();
            admin.setUserName("admin");
            admin.setFullName("ADMIN");
            admin.setGmail("admin@gmail.com");
            admin.setPhoneNumber("0123456789");
            admin.setStudentNumber("A1234");
            admin.setAddress("Hà Nội");
            admin.setPassword(new BCryptPasswordEncoder().encode("123"));
            admin.setRole(roleRepository.findByRoleName(RoleType.ADMIN));
            admin.setVerified(true);
            User teacher = new User();
            teacher.setUserName("teacher");
            teacher.setFullName("TEACHER");
            teacher.setGmail("teacher@gmail.com");
            teacher.setPhoneNumber("0123457896");
            teacher.setStudentNumber("20052607");
            teacher.setAddress("Hà Nội");
            teacher.setPassword(new BCryptPasswordEncoder().encode("123"));
            teacher.setRole(roleRepository.findByRoleName(RoleType.TEACHER));
            teacher.setVerified(true);
            User student = new User();
            student.setUserName("student");
            student.setFullName("STUDENT");
            student.setGmail("student@gmail.com");
            student.setPhoneNumber("0123498765");
            student.setStudentNumber("20225388");
            student.setAddress("Hà Nội");
            student.setPassword(new BCryptPasswordEncoder().encode("123"));
            student.setRole(roleRepository.findByRoleName(RoleType.STUDENT));
            student.setVerified(true);
            userRepository.saveAll(List.of(admin, teacher, student));
        }


    }
}
