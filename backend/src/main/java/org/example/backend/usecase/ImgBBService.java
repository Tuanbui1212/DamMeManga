package org.example.backend.usecase;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.Map;

@Service
public class ImgBBService {

    private static final String API_KEY = "1fe8328c19b307b8297528ca80f9e887";
    private static final String UPLOAD_URL = "https://api.imgbb.com/1/upload";

    public String upload(MultipartFile file) throws IOException {

        RestTemplate restTemplate = new RestTemplate();

        String base64 = Base64.getEncoder().encodeToString(file.getBytes());

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("key", API_KEY);
        body.add("image", base64);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        HttpEntity<MultiValueMap<String, Object>> requestEntity =
                new HttpEntity<>(body, headers);

        ResponseEntity<Map> response =
                restTemplate.postForEntity(UPLOAD_URL, requestEntity, Map.class);

        Map data = (Map) response.getBody().get("data");
        return data.get("url").toString();
    }
}
