package com.example.backend.controller;

import com.example.backend.model.FileUploadRequest;
import com.example.backend.model.Posts;
import com.example.backend.service.PostsService;
import com.example.backend.service.S3FileUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/post")
@CrossOrigin(origins = "http://localhost:5173")
public class FileUploadController {
    @Autowired
    private S3FileUploadService fileUploadService;
    @Autowired
    private PostsService postsService;


    @PostMapping("/upload")
    public String uploadFile(@RequestBody FileUploadRequest fileUploadRequest) {
        try {
            Posts post = new Posts();
            post.setCaption(fileUploadRequest.getCaption());
            post.setTags(fileUploadRequest.getTags());
            post.setUser_id(fileUploadRequest.getUser_id());
            // Posting to Supabase and then need to get post_id from here
            Posts createPost = postsService.addPostWithoutLink(post);

            fileUploadService.uploadFile(fileUploadRequest.getFile(), createPost.getPost_id(), fileUploadRequest.getFileType());
            return "File uploaded successfully";
        } catch (IOException e) {
            return "Error uploading file: " + e.getMessage();
        }
    }
}
