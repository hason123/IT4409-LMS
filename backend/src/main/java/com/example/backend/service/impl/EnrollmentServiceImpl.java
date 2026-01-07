package com.example.backend.service.impl;

import com.example.backend.constant.CourseStatus;
import com.example.backend.constant.EnrollmentStatus;
import com.example.backend.constant.RoleType;
import com.example.backend.dto.request.EnrollmentRequest;
import com.example.backend.dto.request.course.StudentCourseRequest;
import com.example.backend.dto.request.search.SearchUserRequest;
import com.example.backend.dto.response.PageResponse;
import com.example.backend.dto.response.EnrollmentResponse;
import com.example.backend.dto.response.user.UserViewResponse;
import com.example.backend.entity.Course;
import com.example.backend.entity.Enrollment;
import com.example.backend.entity.User;
import com.example.backend.exception.BusinessException;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.exception.UnauthorizedException;
import com.example.backend.repository.CourseRepository;
import com.example.backend.repository.EnrollmentRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.EnrollmentService;
import com.example.backend.service.UserService;
import com.example.backend.specification.UserSpecification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.List;

@Service
public class EnrollmentServiceImpl implements EnrollmentService {
    private final CourseRepository courseRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final UserRepository userRepository;
    private final UserService userService;
   // private final EnrollmentService enrollmentService;

    public EnrollmentServiceImpl(CourseRepository courseRepository, EnrollmentRepository enrollmentRepository, UserRepository userRepository, UserService userService) {
        this.courseRepository = courseRepository;
        this.enrollmentRepository = enrollmentRepository;
        this.userRepository = userRepository;
        this.userService = userService;
    }

    @Transactional
    @Override
    public void addStudentsToCourse(Integer courseId, StudentCourseRequest request){
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        List<User> users = userRepository.findAllById(request.getStudentIds());
        List<Enrollment> progresses = users.stream()
                .map(user -> Enrollment.builder()
                        .student(user)
                        .course(course)
                        .progress(0)
                        .approvalStatus(EnrollmentStatus.APPROVED)
                        .build())
                .toList();
        enrollmentRepository.saveAll(progresses);
    }

    @Transactional
    @Override
    public void removeStudentsInCourse(Integer courseId, StudentCourseRequest request){
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        if (request.getStudentIds() == null || request.getStudentIds().isEmpty()) {
            return;
        }
        List<Enrollment> progresses = enrollmentRepository.findByCourse_IdAndStudent_IdIn(courseId, request.getStudentIds());
        enrollmentRepository.deleteAll(progresses);
    }

    @Override
    public EnrollmentResponse enrollPublicCourse(Integer courseId) {
        User currentUser = userService.getCurrentUser();

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy khóa học!"));

        if (course.getStatus() == CourseStatus.PRIVATE) {
            throw new UnauthorizedException("Bạn không được truy cập vào tài nguyên này!");
        }

        Enrollment existingEnrollment = enrollmentRepository.findByStudent_IdAndCourse_Id(currentUser.getId(), courseId);

        if (existingEnrollment != null) {
            EnrollmentStatus status = existingEnrollment.getApprovalStatus();

            if (status == EnrollmentStatus.APPROVED) {
                throw new BusinessException("Bạn đã tham gia khóa học này!");
            }

            if (status == EnrollmentStatus.PENDING) {
                throw new BusinessException("Hãy đợi giáo viên xét duyệt yêu cầu của bạn!");
            }
        }

        Enrollment newEnrollment = Enrollment.builder()
                .student(currentUser)
                .course(course)
                .progress(0)
                .approvalStatus(EnrollmentStatus.PENDING)
                .build();

        enrollmentRepository.save(newEnrollment);
        return convertEnrollmentToDTO(newEnrollment);
    }

    @Override
    public EnrollmentResponse enrollPrivateCourse(String classCode){
        User currentUser = userService.getCurrentUser();
        if(!userRepository.existsById(currentUser.getId())){
            throw new ResourceNotFoundException("Không tìm thấy người dùng");
        }
        Course course = courseRepository.findByClassCode(classCode).orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy khóa học!"));
        if(enrollmentRepository.findByStudent_IdAndCourse_IdAndApprovalStatus(
                currentUser.getId(), course.getId(), EnrollmentStatus.APPROVED) != null){
            throw new BusinessException("Bạn đã tham gia khóa học này!");
        }
        if(enrollmentRepository.findByStudent_IdAndCourse_IdAndApprovalStatus(
                currentUser.getId(), course.getId(), EnrollmentStatus.PENDING) != null){
            throw new BusinessException("Hãy đợi giáo viên xét duyệt yêu cầu của bạn");
        }
        Enrollment newEnrollment = Enrollment.builder()
                .student(currentUser)
                .course(course)
                .progress(0)
                .approvalStatus(EnrollmentStatus.PENDING)
                .build();
        enrollmentRepository.save(newEnrollment);
        return convertEnrollmentToDTO(newEnrollment);
    }

    @Override
    public EnrollmentResponse approveStudentToEnrollment(EnrollmentRequest request) {
        User currentUser = userService.getCurrentUser();
        Enrollment enrollment = enrollmentRepository.findByStudent_IdAndCourse_IdAndApprovalStatus(
                request.getStudentId(), request.getCourseId(), EnrollmentStatus.PENDING);
        if (enrollment == null) {
            throw new ResourceNotFoundException("Yêu cầu tham gia khóa học không tồn tại hoặc đã được xử lý!");
        }
        boolean isCourseOwner = enrollment.getCourse().getTeacher().getId().equals(currentUser.getId());
        boolean isAdmin = currentUser.getRole().getRoleName().equals(RoleType.ADMIN);
        if (!isCourseOwner && !isAdmin) {
            throw new UnauthorizedException("Bạn không có quyền phê duyệt cho khóa học này!");
        }
        enrollment.setApprovalStatus(EnrollmentStatus.APPROVED);
        enrollmentRepository.save(enrollment);
        return convertEnrollmentToDTO(enrollment);
    }

    @Override
    public void rejectStudentEnrollment(EnrollmentRequest request) {
        User currentUser = userService.getCurrentUser();
        Enrollment enrollment = enrollmentRepository.findByStudent_IdAndCourse_Id(
                request.getStudentId(), request.getCourseId());
        if (enrollment == null) {
            throw new ResourceNotFoundException("Không tìm thấy thông tin đăng ký của người dùng này!");
        }
        boolean isCourseOwner = enrollment.getCourse().getTeacher().getId().equals(currentUser.getId());
        boolean isAdmin = currentUser.getRole().getRoleName().equals(RoleType.ADMIN);
        if (!isCourseOwner && !isAdmin) {
            throw new UnauthorizedException("Bạn không có quyền từ chối yêu cầu này!");
        }
        enrollmentRepository.delete(enrollment);
    }

    @Override
    public PageResponse<EnrollmentResponse> getStudentsApprovedInEnrollment(Integer courseId, Pageable pageable) {
        if(!courseRepository.existsById(courseId)){
            throw new ResourceNotFoundException("Không tìm thấy khóa học");
        }
        Page<Enrollment> enrollmentPage = enrollmentRepository.findByCourse_IdAndApprovalStatus(courseId, EnrollmentStatus.APPROVED, pageable);
        Page<EnrollmentResponse> enrollmentResponse = enrollmentPage.map(this::convertEnrollmentToDTO);
        PageResponse<EnrollmentResponse> response = new PageResponse<>(
                enrollmentResponse.getNumber() + 1,
                enrollmentResponse.getTotalPages(),
                enrollmentResponse.getNumberOfElements(),
                enrollmentResponse.getContent()
        );
        return response;
    }

    @Override
    public PageResponse<EnrollmentResponse> getStudentsPendingEnrollment(Integer courseId, Pageable pageable){
        if(!courseRepository.existsById(courseId)){
            throw new ResourceNotFoundException("Không tìm thấy khóa học");
        }
        Page<Enrollment> enrollmentPage = enrollmentRepository.findByCourse_IdAndApprovalStatus(courseId, EnrollmentStatus.PENDING, pageable);
        Page<EnrollmentResponse> enrollmentResponse = enrollmentPage.map(this::convertEnrollmentToDTO);
        PageResponse<EnrollmentResponse> response = new PageResponse<>(
                enrollmentResponse.getNumber() + 1,
                enrollmentResponse.getTotalPages(),
                enrollmentResponse.getNumberOfElements(),
                enrollmentResponse.getContent()
        );
        return response;
    }

    @Override
    public PageResponse<EnrollmentResponse> getEnrollmentPage(Pageable pageable){
        Page<Enrollment> enrollmentPage = enrollmentRepository.findAll(pageable);
        Page<EnrollmentResponse> enrollmentResponse = enrollmentPage.map(this::convertEnrollmentToDTO);
        PageResponse<EnrollmentResponse> response = new PageResponse<>(
                enrollmentResponse.getNumber() + 1,
                enrollmentResponse.getTotalPages(),
                enrollmentResponse.getNumberOfElements(),
                enrollmentResponse.getContent()
        );
        return response;

    }

    @Override
    public PageResponse<UserViewResponse> searchStudentsInCourse(Integer courseId, SearchUserRequest request, Pageable pageable) {
        Specification<User> spec = buildBaseUserSearchSpec(request);
        spec = spec.and(UserSpecification.hasRole(RoleType.STUDENT));
        spec = spec.and(UserSpecification.inCourse(courseId));
        Page<User> userPage = userRepository.findAll(spec, pageable);
        Page<UserViewResponse> response = userPage.map(userService::convertUserViewToDTO);
        return new PageResponse<>(
                response.getNumber() + 1,
                response.getNumberOfElements(),
                response.getTotalPages(),
                response.getContent()
        );
    }

    @Override
    public PageResponse<UserViewResponse> searchStudentsNotInCourse(Integer courseId, SearchUserRequest request, Pageable pageable) {
        Specification<User> spec = buildBaseUserSearchSpec(request);
        spec = spec.and(UserSpecification.hasRole(RoleType.STUDENT));
        spec = spec.and(UserSpecification.notInCourse(courseId));
        Page<User> userPage = userRepository.findAll(spec, pageable);
        Page<UserViewResponse> response = userPage.map(userService::convertUserViewToDTO);
        return new PageResponse<>(
                response.getNumber() + 1,
                response.getNumberOfElements(),
                response.getTotalPages(),
                response.getContent()
        );
    }

    private Specification<User> buildBaseUserSearchSpec(SearchUserRequest request) {
        Specification<User> spec = (root, query, cb) -> cb.conjunction();

        if (StringUtils.hasText(request.getUserName())) {
            spec = spec.and(UserSpecification.likeUserName(request.getUserName()));
        }
        if (StringUtils.hasText(request.getFullName())) {
            spec = spec.and(UserSpecification.likeFullName(request.getFullName()));
        }
        if (StringUtils.hasText(request.getStudentNumber())) {
            spec = spec.and(UserSpecification.hasStudentNumber(request.getStudentNumber()));
        }
        if (StringUtils.hasText(request.getGmail())) {
            spec = spec.and(UserSpecification.likeGmail(request.getGmail()));
        }
        return spec;
    }

    private EnrollmentResponse convertEnrollmentToDTO(Enrollment enrollment) {
        EnrollmentResponse response = new EnrollmentResponse();
        response.setProgress(enrollment.getProgress());
        response.setUserName(enrollment.getStudent().getUserName());
        response.setStudentNumber(enrollment.getStudent().getFullName());
        response.setCourseTitle(enrollment.getCourse().getTitle());
        response.setFullName(enrollment.getStudent().getFullName());
        response.setId(enrollment.getId());
        response.setApprovalStatus(enrollment.getApprovalStatus().toString());
        response.setCourseId(enrollment.getCourse().getId());
        return response;
    }
}
