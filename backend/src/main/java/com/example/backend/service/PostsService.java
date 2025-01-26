package com.example.backend.service;

import com.example.backend.model.Posts;
import com.example.backend.repository.PostsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostsService {

    @Autowired
    private PostsRepository postsRepository;

    public Posts addPostWithoutLink(Posts newPost) {
        return postsRepository.save(newPost);
    }

    public List<Posts> getAllPosts() {
        return postsRepository.findAll();
    }
}
