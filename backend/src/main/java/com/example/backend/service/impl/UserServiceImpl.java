package com.example.backend.service.impl;

import com.example.backend.constant.RoleType;
import com.example.backend.entity.User;
import com.example.backend.repository.RoleRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.UserService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    public User handleGetUserByGmail(String email) {
        return userRepository.findByGmail(email);
    }

    @Override
    public User handleGetUserByUserName(String name) {
        return userRepository.findByUserName(name);
    }

    @Override
    public boolean isCurrentUser(Long userId) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof Jwt jwt) {
            String currentUserName = jwt.getClaim("sub"); // decode token de lay phan sub
            Long currentUserId = userRepository.findByUserName(currentUserName).getId();
            return currentUserId.equals(userId);
        }
        return false;
    }

    @Override
    public User getCurrentUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof Jwt jwt) {
            String currentUserName = jwt.getClaim("sub"); // decode token de lay phan sub
            return userRepository.findByUserName(currentUserName);
        }
        return null;
    }

    @Override
    public User handleGetUserByUserNameAndRefreshToken(String userName, String refreshToken) {
        return userRepository.findByUserNameAndRefreshToken(userName, refreshToken);
    }

    @Override
    public void updateUserToken(String refreshToken, String userName) {
        User currentUser = handleGetUserByUserName(userName);
        if(currentUser != null) {
            currentUser.setRefreshToken(refreshToken);
            userRepository.save(currentUser);
        }
    }

    @Override
    public void deleteUserById(Long id) {
        User user = userRepository.findById(id).orElse(null);
        if(user == null){

        }
        if(isCurrentUser(id) || getCurrentUser().getRole().getRoleName().equals(RoleType.ADMIN)) {
            userRepository.deleteById(id);
        }
    }

    @Override
    public User createGoogleUser(String email, String username) {
        User googleUser = User.builder().userName(username).password("123").gmail(email).role(roleRepository.findByRoleName(RoleType.USER)).build();
        userRepository.save(googleUser);
        return googleUser;
    }
    /*
    @Override
    public UserInfoResponse updateUser(Long id, UserRequest request) throws UnauthorizedException {
        User updatedUser = userRepository.findById(id).orElse(null);
        if(!isCurrentUser(id) ){
            throw new UnauthorizedException("You have no permission");
        }
        if(updatedUser == null){
            throw new ResourceNotFoundException("User not found");
        }
        if (request.getUserName() != null) {
            updatedUser.setUserName(request.getUserName());
        }
        else{
            updatedUser.setUserName(updatedUser.getUserName());
        }
        if (request.getPassword() != null) {
            updatedUser.setPassword(passwordEncoder.encode(request.getPassword()));
        }
        else updatedUser.setPassword(updatedUser.getPassword());
        if (request.getBirthday() != null) {
            updatedUser.setBirthday(request.getBirthday());
        }
        if (request.getAddress() != null) {
            updatedUser.setAddress(request.getAddress());
        }
        if (request.getPhoneNumber() != null) {
            updatedUser.setPhoneNumber(request.getPhoneNumber());
        }
        else updatedUser.setPhoneNumber(updatedUser.getPhoneNumber());
        if (request.getStudentNumber() != null) {
            updatedUser.setStudentNumber(request.getStudentNumber());
        }
        else updatedUser.setStudentNumber(updatedUser.getStudentNumber());
        userRepository.save(updatedUser);
        return convertUserInfoToDTO(updatedUser);
    }

     */

    /*
    @Override
    public Object getUserById(Long id){
        User user = userRepository.findById(id).orElse(null);
        if(user == null){

        }
        return convertUserInfoToDTO(user);
    }

     */

    /*
    public UserInfoResponse convertUserInfoToDTO(User user){
        UserInfoResponse userDTO = new UserInfoResponse();
        userDTO.setUserId(user.getId());
        userDTO.setUserName(user.getUserName());
        userDTO.setBirthday(user.getBirthday());
        userDTO.setStudentNumber(user.getStudentNumber());
        userDTO.setAddress(user.getAddress());
        userDTO.setPhoneNumber(user.getPhoneNumber());
        userDTO.setFullName(user.getFullName());
        userDTO.setPassword("HIDDEN");
        userDTO.setRoleName(user.getRole().getRoleName().toString());
        return userDTO;
    }

     */

}
