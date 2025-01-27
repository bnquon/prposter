package com.example.backend.repository;

import com.example.backend.model.Comments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CommentsRepository extends JpaRepository<Comments, Integer> {

    @Query(value = "SELECT * FROM public.comments WHERE post_id = ?1", nativeQuery = true)
    List<Comments> getCommentsByPostId(int post_id);
}
