package com.example.backend.controller;

import com.example.backend.model.Posts;
import com.example.backend.service.PostsService;
import com.example.backend.service.S3FileUploadService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/posts")
@CrossOrigin(origins = "http://localhost:5173")
public class FileUploadController {
    @Autowired
    private S3FileUploadService fileUploadService;
    @Autowired
    private PostsService postsService;

    @GetMapping
    public List<Posts> getAllPosts() {
        return postsService.getAllPosts();
    }

    @PostMapping("/upload")
    public String uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam("file_type") String fileType,
            @RequestParam("caption") String caption,
            @RequestParam("tags") String tagsJson,
            @RequestParam("user_id") UUID userId) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            List<String> tags = objectMapper.readValue(tagsJson, new TypeReference<List<String>>() {
            });
            Posts post = new Posts();
            post.setCaption(caption);
            post.setTags(tags);
            post.setUser_id(userId);
            post.setFile_type(fileType);
            // Posting to Supabase and then need to get post_id from here
            Posts createPost = postsService.addPostWithoutLink(post);

            fileUploadService.uploadFile(file, createPost.getPost_id(), fileType);
            return "File uploaded successfully";
        } catch (IOException e) {
            return "Error uploading file: " + e.getMessage();
        }
    }
}
