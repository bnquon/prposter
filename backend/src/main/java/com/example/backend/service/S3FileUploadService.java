package com.example.backend.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Service
public class S3FileUploadService {
    @Autowired
    private AmazonS3 amazonS3;
    @Value("${aws.s3.bucketName}")
    private String bucketName;

    public void uploadFile(MultipartFile file, int post_id, String fileType) throws IOException {
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.addUserMetadata("post_id", String.valueOf(post_id));
        metadata.addUserMetadata("Content-Type", fileType);
        String key = UUID.randomUUID().toString();

        PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, key, file.getInputStream(), metadata);
        amazonS3.putObject(putObjectRequest);
    }
}
