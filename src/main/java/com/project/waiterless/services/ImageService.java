package com.project.waiterless.services;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ImageService {
    String storeFile(MultipartFile file) throws IOException;
}
