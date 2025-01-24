package com.example.backend.repository;

import com.example.backend.model.Posts;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostsRepository extends JpaRepository <Posts, Integer> {
}
