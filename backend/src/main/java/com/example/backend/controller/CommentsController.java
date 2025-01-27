package com.example.backend.controller;

import com.example.backend.model.Comments;
import com.example.backend.repository.CommentsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comments")
@CrossOrigin(origins = "*")
public class CommentsController {

    @Autowired
    private CommentsRepository commentsRepository;

    @GetMapping
    public List<Comments> getComments(@RequestParam("post_id") int postId) {
        return commentsRepository.getCommentsByPostId(postId);
    }

    @PostMapping()
    public void addComment(@RequestBody Comments newComment) {
        System.out.println(newComment);
        Comments savedComment = commentsRepository.save(newComment);
        System.out.println(savedComment);
    }
}
