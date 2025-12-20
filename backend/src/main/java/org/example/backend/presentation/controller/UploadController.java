package org.example.backend.presentation.controller;

import org.example.backend.usecase.ImgBBService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/upload")
@CrossOrigin("*")
public class UploadController {

    @Autowired
    private ImgBBService imgBBService;

    @PostMapping("/imgbb")
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            String url = imgBBService.upload(file);
            return ResponseEntity.ok(url); 
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Upload lỗi: " + e.getMessage());
        }
    }
}
