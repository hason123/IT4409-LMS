package com.example.backend;

import com.example.backend.constant.RoleType;
import com.example.backend.entity.Role;
import com.example.backend.entity.User;
import com.example.backend.repository.RoleRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@SpringBootApplication(excludeName = {
        "org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration",
        "org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration",
        "org.springframework.boot.autoconfigure.security.oauth2.client.servlet.OAuth2ClientAutoConfiguration",
        "org.springframework.boot.autoconfigure.security.oauth2.resource.servlet.OAuth2ResourceServerAutoConfiguration"
})
@EnableJpaAuditing
public class BackendApplication implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Override
    public void run(String... args) {
        userRepository.deleteAll(); // vì nếu count!=0 -> bỏ qua add mới
        roleRepository.deleteAll();

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