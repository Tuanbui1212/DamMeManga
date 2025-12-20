// package org.example.backend.infrastructure.config.security;

// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.http.SessionCreationPolicy;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.context.annotation.Bean;

// @Configuration
// public class SecurityConfig {

//     @Bean
//     public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//         http.csrf().disable()
//                 .authorizeRequests()
//                 .anyRequest().permitAll()
//                 .and()
//                 .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
//         return http.build();
//     }
// }
package org.example.backend.infrastructure.config.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
public class SecurityConfig {

    // Inject CorsConfigurationSource từ file CorsConfig bạn vừa tạo
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, CorsConfigurationSource corsConfigurationSource) throws Exception {
        http
            // 1. Kích hoạt CORS và dùng cấu hình từ bean CorsConfig
            .cors(cors -> cors.configurationSource(corsConfigurationSource))
            
            // 2. Tắt CSRF (vì dùng API Stateless không cần cái này)
            .csrf(AbstractHttpConfigurer::disable)
            
            // 3. Cấu hình quyền truy cập (Đang mở toang cửa cho tất cả để test)
            .authorizeHttpRequests(auth -> auth
                .anyRequest().permitAll() 
            )
            
            // 4. Quản lý Session = Stateless (Không lưu session phía server)
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();
    }
}