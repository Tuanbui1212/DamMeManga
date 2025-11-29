package org.example.backend.infrastructure.config.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.context.annotation.Bean;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    public SecurityConfig(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .authorizeRequests()
                
                // Cho phép tất cả request OPTIONS
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                
                // Cho phép public tất cả các endpoint liên quan đến users/register, login
                .requestMatchers("/api/users/register", "/api/users/login").permitAll()
                
                // Permit tất cả các endpoint dev/public: category, authors, manga, manga-category
                .requestMatchers(
                        "/api/category/**",
                        "/api/authors/**",
                        "/api/mangas/**",
                        "/api/manga-category/**",
                        "/api/upload/**"
                ).permitAll()
                
                // Admin-only endpoints
                .requestMatchers("/api/users/admin", "/api/users/all").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/mangas/**").hasRole("ADMIN")
                
                // Bắt buộc auth cho tất cả request còn lại
                .anyRequest().authenticated()
                
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        // Thêm filter JWT
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
