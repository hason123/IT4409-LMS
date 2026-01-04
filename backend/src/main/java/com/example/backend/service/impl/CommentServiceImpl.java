package com.example.backend.service.impl;

import com.example.backend.dto.request.CommentRequest;
import com.example.backend.dto.response.CommentResponse;
import com.example.backend.dto.response.PageResponse;
import com.example.backend.entity.Comment;
import com.example.backend.entity.Lesson;
import com.example.backend.entity.User;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.exception.UnauthorizedException;
import com.example.backend.repository.CommentRepository;
import com.example.backend.repository.LessonRepository;
import com.example.backend.service.CommentService;
import com.example.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final LessonRepository lessonRepository;
    private final UserService userService;

    @Transactional
    @Override
    public CommentResponse addComment(Integer lessonId, CommentRequest request) {
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new ResourceNotFoundException("Lesson not found"));

        User currentUser = userService.getCurrentUser();

        Comment comment = new Comment();
        comment.setContent(request.getContent());
        comment.setLesson(lesson);
        comment.setUser(currentUser);

        if (request.getParentId() != null) {
            Comment parent = commentRepository.findById(request.getParentId())
                    .orElseThrow(() -> new ResourceNotFoundException("Parent comment not found"));
            comment.setParent(parent);
        }

        commentRepository.save(comment);
        return convertEntityToDTO(comment);
    }

    @Transactional
    @Override
    public CommentResponse updateComment(Integer id, CommentRequest request)
            throws UnauthorizedException {

        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found"));

        User currentUser = userService.getCurrentUser();

/*
        if (!comment.getUser().getId().equals(currentUser.getId())) {
            throw new UnauthorizedException("You are not allowed to update this comment");
        }
*/

        if (request.getContent() != null) {
            comment.setContent(request.getContent());
        }

        commentRepository.save(comment);
        return convertEntityToDTO(comment);
    }

    @Transactional(readOnly = true)
    @Override
    public PageResponse<CommentResponse> getCommentsByLesson(
            Integer lessonId,
            Pageable pageable
    ) {
        // 1. Lấy toàn bộ comment của lesson (1 query)
        List<Comment> comments =
                commentRepository.findAllByLesson_Id(lessonId);
        if (comments.isEmpty()) {
            return new PageResponse<>(1, 0, 0, List.of());
        }
        // 2. Convert sang DTO + put vào Map
        Map<Integer, CommentResponse> nodeMap = new HashMap<>();
        for (Comment c : comments) {
            CommentResponse dto = convertEntityToDTO(c);
            nodeMap.put(dto.getCommentId(), dto);
        }
        // 3. Build cây comment
        List<CommentResponse> roots = new ArrayList<>();
        for (CommentResponse node : nodeMap.values()) {
            if (node.getParentId() != null) {
                CommentResponse parent = nodeMap.get(node.getParentId());
                if (parent != null) {
                    parent.getReplies().add(node);
                }
            } else {
                roots.add(node);
            }
        }
        // 4. Sort ROOT comment (DESC theo createdAt)
        roots.sort(Comparator.comparing(CommentResponse::getCreatedAt).reversed());
        // 5. Sort replies (ASC)
        roots.forEach(root -> sortRepliesAscending(root.getReplies()));

        // 6. Manual pagination trên ROOT comment
        int start = (int) pageable.getOffset();
        int end = Math.min(start + pageable.getPageSize(), roots.size());

        List<CommentResponse> pageContent =
                start >= roots.size() ? List.of() : roots.subList(start, end);
        int totalPages =
                (int) Math.ceil((double) roots.size() / pageable.getPageSize());
        return new PageResponse<>(
                pageable.getPageNumber() + 1,
                totalPages,
                pageContent.size(),
                pageContent
        );
    }

    private void sortRepliesAscending(List<CommentResponse> replies) {
        if (replies == null || replies.isEmpty()) return;

        replies.sort(Comparator.comparing(CommentResponse::getCreatedAt));
        replies.forEach(r -> sortRepliesAscending(r.getReplies()));
    }

    @Override
    public CommentResponse getComment(Integer id) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found"));
        return convertEntityToDTO(comment);
    }

    @Transactional
    @Override
    public void deleteComment(Integer id) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found"));
        /*User currentUser = userService.getCurrentUser();
        if (!comment.getUser().getId().equals(currentUser.getId())) {
            throw new UnauthorizedException("You are not allowed to delete this comment");
        }*/
        commentRepository.delete(comment);
    }

    @Override
    public CommentResponse convertEntityToDTO(Comment comment) {
        CommentResponse response = new CommentResponse();
        response.setCommentId(comment.getId());
        response.setCommentDetail(comment.getContent());
        response.setCreatedAt(comment.getCreatedTime());
        response.setUpdatedAt(comment.getUpdatedTime());
        response.setLessonId(comment.getLesson().getId());
        response.setUserId(comment.getUser().getId());
        if (comment.getParent() != null) {
            response.setParentId(comment.getParent().getId());
        }
        List<CommentResponse> replies = comment.getChildren()
                .stream()
                .map(this::convertEntityToDTO)
                .collect(Collectors.toList());
        response.setReplies(replies);
        return response;
    }
}
