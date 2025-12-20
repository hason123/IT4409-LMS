package com.example.backend.service.impl;


import com.example.backend.constant.RoleType;
import com.example.backend.dto.request.CourseRequest;
import com.example.backend.dto.response.CourseResponse;
import com.example.backend.dto.response.PageResponse;
import com.example.backend.entity.Category;
import com.example.backend.entity.Course;
import com.example.backend.entity.User;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.exception.UnauthorizedException;
import com.example.backend.repository.CategoryRepository;
import com.example.backend.repository.CourseRepository;
import com.example.backend.service.CourseService;
import com.example.backend.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class CourseServiceImpl implements CourseService {
    private final CourseRepository courseRepository;
    private final CategoryRepository categoryRepository;
    private final UserService userService;

    public CourseServiceImpl(CourseRepository courseRepository, CategoryRepository categoryRepository, UserService userService) {
        this.courseRepository = courseRepository;
        this.categoryRepository = categoryRepository;
        this.userService = userService;
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

    //@Override
    //public void addStudentsToCourse()

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

    private CourseResponse convertEntityToDto(Course course){
        CourseResponse response = new CourseResponse();
        response.setId(course.getId());
        response.setTitle(course.getTitle());
        response.setDescription(course.getDescription());
        response.setCategoryName(course.getCategory().getTitle());
        response.setTeacherName(course.getTeacher().getUserName());
        return response;
    }
}
