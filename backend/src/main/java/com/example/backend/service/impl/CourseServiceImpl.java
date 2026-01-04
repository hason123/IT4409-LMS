package com.example.backend.service.impl;


import com.example.backend.constant.ResourceType;
import com.example.backend.constant.RoleType;
import com.example.backend.dto.request.course.CourseRequest;
import com.example.backend.dto.request.course.StudentCourseRequest;
import com.example.backend.dto.request.search.SearchUserRequest;
import com.example.backend.dto.response.CloudinaryResponse;
import com.example.backend.dto.response.course.CourseResponse;
import com.example.backend.dto.response.PageResponse;
import com.example.backend.dto.response.user.UserViewResponse;
import com.example.backend.entity.Category;
import com.example.backend.entity.Course;
import com.example.backend.entity.StudentProgress;
import com.example.backend.entity.User;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.repository.CategoryRepository;
import com.example.backend.repository.CourseRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.CloudinaryService;
import com.example.backend.service.CourseService;
import com.example.backend.service.UserService;
import com.example.backend.specification.UserSpecification;
import com.example.backend.utils.FileUploadUtil;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class CourseServiceImpl implements CourseService {
    private final CourseRepository courseRepository;
    private final CategoryRepository categoryRepository;
    private final UserService userService;
    private final CloudinaryService cloudinaryService;
   // private final UserRepository userRepository;


    public CourseServiceImpl(CourseRepository courseRepository, CategoryRepository categoryRepository, UserService userService, CloudinaryService cloudinaryService) {
        this.courseRepository = courseRepository;
        this.categoryRepository = categoryRepository;
        this.userService = userService;
        this.cloudinaryService = cloudinaryService;
    }

    @Override
    public CourseResponse createCourse(CourseRequest request) {
        Course newCourse = new Course();
        newCourse.setDescription(request.getDescription());
        newCourse.setTitle(request.getTitle());
        newCourse.setTeacher(userService.getCurrentUser());
        Category newCategory = categoryRepository.findById(request.getCategoryId()).orElseThrow(() -> new ResourceNotFoundException("Category not found!"));
        newCourse.setCategory(newCategory);
        courseRepository.save(newCourse);
        return convertEntityToDto(newCourse);
    }

    @Override
    public CourseResponse updateCourse(Long id, CourseRequest request) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found"));
        if (request.getTitle() != null) {
            course.setTitle(request.getTitle());
        }
        if (request.getDescription() != null) {
            course.setDescription(request.getDescription());
        }
        if (request.getCategoryId() != null) {
            Category category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
            course.setCategory(category);
        }
        courseRepository.save(course);
        return convertEntityToDto(course);
    }

    @Override
    public void deleteCourseById(Long id) {
        Course deletedCourse = courseRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Course not found"));
        User currentUser = userService.getCurrentUser();
        if(currentUser.getRole().getRoleName().equals(RoleType.ADMIN) || deletedCourse.getTeacher().getId().equals(currentUser.getId())) {
            courseRepository.deleteById(id);
        }
    }

    @Override
    public CourseResponse getCourseById(Long id) {
        Course course = courseRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Course not found"));
        return convertEntityToDto(course);
    }

    @Override
    public PageResponse<CourseResponse> getAllCourses(Pageable pageable) {
        Page<Course> coursePage = courseRepository.findAll(pageable);
        Page<CourseResponse> courseResponsePage = coursePage.map(this::convertEntityToDto);
        PageResponse<CourseResponse> response = new PageResponse<>(
                courseResponsePage.getNumber() + 1,
                courseResponsePage.getTotalPages(),
                courseResponsePage.getNumberOfElements(),
                courseResponsePage.getContent()
        );
        return response;
    }

    @Override
    public CloudinaryResponse uploadImage(Long id, MultipartFile file) {
        final Course uploadCourse = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        FileUploadUtil.assertAllowed(file, "image");
        final String cloudinaryImageId = uploadCourse.getCloudinaryImageId();
        if(StringUtils.hasText(cloudinaryImageId)) {
            cloudinaryService.deleteFile(cloudinaryImageId, ResourceType.IMAGE);
        }
        final String fileName = FileUploadUtil.getFileName(file.getOriginalFilename());
        final CloudinaryResponse response = this.cloudinaryService.uploadFile(file, fileName, "image");
        uploadCourse.setImageUrl(response.getUrl());
        uploadCourse.setCloudinaryImageId(response.getPublicId());
        courseRepository.save(uploadCourse);
        return response;
    }

    private CourseResponse convertEntityToDto(Course course){
        CourseResponse response = new CourseResponse();
        response.setId(course.getId());
        response.setTitle(course.getTitle());
        response.setDescription(course.getDescription());
        response.setCategoryId(course.getCategory().getId());
        response.setCategoryName(course.getCategory().getTitle());
        response.setTeacherId(course.getTeacher().getId());
        response.setTeacherName(course.getTeacher().getFullName());
        response.setImageUrl(course.getImageUrl());
        response.setCloudinaryImageId(course.getCloudinaryImageId());
        return response;
    }
}
