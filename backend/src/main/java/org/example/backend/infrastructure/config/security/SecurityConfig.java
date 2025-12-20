package org.example.backend.infrastructure.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // 1. Tắt CSRF (để các method POST/PUT hoạt động dễ dàng)
            .csrf(AbstractHttpConfigurer::disable)

            // 2. Cấu hình CORS (Cho phép Frontend gọi vào)
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))

            // 3. QUAN TRỌNG: Chuyển sang Stateless (Không lưu session)
            // Dòng này sẽ sửa lỗi ;jsessionid=... xuất hiện trên URL của bạn
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

            // 4. Phân quyền truy cập
            .authorizeHttpRequests(auth -> auth
                // Cho phép tất cả các API bắt đầu bằng /api/ truy cập thoải mái
                .requestMatchers("/api/**").permitAll()
                
                // Cho phép các file tĩnh, health check
                .requestMatchers("/", "/health", "/error").permitAll()
                
                // Tạm thời cho phép TẤT CẢ các request khác (để dev không bị chặn)
                .anyRequest().permitAll()
            );

        return http.build();
    }

    // Bean cấu hình CORS chi tiết
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // Cho phép mọi nguồn (hoặc sửa thành "http://localhost:5173" để bảo mật hơn)
        configuration.setAllowedOrigins(Arrays.asList("*")); 
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD"));
        configuration.setAllowedHeaders(Arrays.asList("*")); // Cho phép mọi header
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}