package com.example.backend.service.impl;

import com.example.backend.constant.CourseStatus;
import com.example.backend.constant.EnrollmentStatus;
import com.example.backend.constant.RoleType;
import com.example.backend.dto.request.EnrollmentRequest;
import com.example.backend.dto.request.course.StudentCourseRequest;
import com.example.backend.dto.request.search.SearchUserRequest;
import com.example.backend.dto.response.PageResponse;
import com.example.backend.dto.response.EnrollmentResponse;
import com.example.backend.dto.response.course.CourseResponse;
import com.example.backend.dto.response.user.UserViewResponse;
import com.example.backend.entity.Course;
import com.example.backend.entity.CourseRating;
import com.example.backend.entity.Enrollment;
import com.example.backend.entity.User;
import com.example.backend.exception.BusinessException;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.exception.UnauthorizedException;
import com.example.backend.repository.CourseRatingRepository;
import com.example.backend.repository.CourseRepository;
import com.example.backend.repository.EnrollmentRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.CourseService;
import com.example.backend.service.EnrollmentService;
import com.example.backend.service.NotificationService;
import com.example.backend.service.UserService;
import com.example.backend.specification.UserSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EnrollmentServiceImpl implements EnrollmentService {
    private final CourseRepository courseRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final UserRepository userRepository;
    private final UserService userService;
    private final NotificationService notificationService;
    private final CourseRatingRepository courseRatingRepository;
    private final CourseService courseService;

    @Transactional
    @Override
    public void addStudentsToCourse(Integer courseId, StudentCourseRequest request){
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy khóa học!"));

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
        for(User u : users){
            String message = "Bạn đã được thêm vào khóa học " + course.getTitle();
            notificationService.createNotification(u, message);
        }
    }

    @Transactional
    @Override
    public void removeStudentsInCourse(Integer courseId, StudentCourseRequest request){
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        if (request.getStudentIds() == null || request.getStudentIds().isEmpty()) {
            return;
        }
        List<User> users = userRepository.findAllById(request.getStudentIds());
        List<Enrollment> progresses = enrollmentRepository.findByCourse_IdAndStudent_IdIn(courseId, request.getStudentIds());
        enrollmentRepository.deleteAll(progresses);
        for(User u : users){
            String message = "Bạn đã bị xóa tên khỏi danh sách lớp " + course.getTitle();
            notificationService.createNotification(u, message);
        }
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

        String message = "Sinh viên " + currentUser.getFullName() + " đã yêu cầu tham gia khóa học: " + course.getTitle();
        notificationService.createNotification(course.getTeacher(), message);

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

        String message = "Sinh viên " + currentUser.getFullName() + " đã yêu cầu tham gia khóa học: " + course.getTitle();
        notificationService.createNotification(course.getTeacher(), message);

        return convertEnrollmentToDTO(newEnrollment);
    }

    @Override
    @Transactional
    public CourseResponse ratingCourse(Integer courseId, Double newRating) {
        if (newRating < 1 || newRating > 5) {
            throw new BusinessException("Điểm đánh giá phải từ 1 đến 5!");
        }
        User currentUser = userService.getCurrentUser();
        // 2. Check quyền (Giữ nguyên logic của ông nhưng tối ưu query chút)
        boolean isEnrolled = enrollmentRepository.existsByStudent_IdAndCourse_IdAndApprovalStatus(
                currentUser.getId(), courseId, EnrollmentStatus.APPROVED);

        if (!isEnrolled) {
            throw new BusinessException("Bạn phải tham gia khóa học mới được đánh giá!");
        }
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy khóa học"));
        // 3. Lưu/Cập nhật Review cá nhân
        CourseRating review = courseRatingRepository.findByStudent_IdAndCourse_Id(currentUser.getId(), courseId)
                .orElse(CourseRating.builder()
                        .student(currentUser)
                        .course(course)
                        .build());

        review.setRatingValue(newRating);
        courseRatingRepository.save(review);
        Double avgRating = courseRatingRepository.getAverageRating(courseId);
        // 5. Làm tròn (nếu muốn, ví dụ 1 số thập phân)
        // Ví dụ: 4.5666 -> 4.6
        double roundedRating = (avgRating != null) ? Math.round(avgRating * 10.0) / 10.0 : 0.0;
        course.setRating(roundedRating);
        courseRepository.save(course);
        return courseService.convertEntityToDto(course);
    }

    @Override
    public EnrollmentResponse approveStudentToEnrollment(EnrollmentRequest request) {
        User currentUser = userService.getCurrentUser();
        User student = userRepository.findById(request.getStudentId()).orElseThrow(() ->
                new ResourceNotFoundException("Không tìm tháy người dùng!"));
        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy khóa học!"));
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

        String message = "Bạn đã được thêm vào khóa học" + course.getTitle();
        notificationService.createNotification(student, message);
        return convertEnrollmentToDTO(enrollment);
    }

    @Override
    public void rejectStudentEnrollment(EnrollmentRequest request) {
        User currentUser = userService.getCurrentUser();
        User student = userRepository.findById(request.getStudentId()).orElseThrow(() ->
                new ResourceNotFoundException("Không tìm tháy người dùng!"));
        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy khóa học!"));
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
        String message = "Yêu cầu tham gia khóa học" + course.getTitle() + "của bạn đã bị từ chối";
        notificationService.createNotification(student, message);
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
