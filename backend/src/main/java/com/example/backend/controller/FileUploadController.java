package com.example.backend.controller;

import com.example.backend.service.S3FileUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/post")
@CrossOrigin(origins = "http://localhost:5173")
public class FileUploadController {
    @Autowired
    private S3FileUploadService fileUploadService;

    @PostMapping("/upload")
    public String uploadFile(@RequestParam("file")MultipartFile file) {
        try {
            fileUploadService.uploadFile(file.getOriginalFilename(), file);
            return "File uploaded successfully";
        } catch (IOException e) {
            return "Error uploading file: " + e.getMessage();
        }
    }
}
