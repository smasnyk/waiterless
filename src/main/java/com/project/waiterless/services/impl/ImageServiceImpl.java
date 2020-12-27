package com.project.waiterless.services.impl;

import com.project.waiterless.services.ImageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

@Slf4j
@Service
public class ImageServiceImpl implements ImageService {
    @Value("${upload.path:#{null}}")
    String uploadPath;

    @Override
    public String storeFile(MultipartFile file) throws IOException {
        BufferedImage image = null;
        File path = new File(System.getProperty("user.home") + File.separator + uploadPath);
        try {
            image = ImageIO.read(file.getInputStream());
        } catch (IOException e) {
            e.printStackTrace();
        }
        if (image != null) {
            if (!path.isDirectory())
                path.mkdir();
            String folder = path + File.separator + file.getOriginalFilename();
            file.transferTo(new File(folder));
            return file.getOriginalFilename();
        } else return null;
    }
}
