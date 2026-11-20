package org.example.backend.infrastructure.config.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .cors(Customizer.withDefaults())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                // Public auth
                .requestMatchers("/api/users/login", "/api/users/register").permitAll()
                // Public WebSocket
                .requestMatchers("/ws/**", "/ws-endpoint/**").permitAll()
                // Public GET endpoints for readers
                .requestMatchers(HttpMethod.GET,
                    "/api/mangas/**",
                    "/api/chapters/**",
                    "/api/authors/**",
                    "/api/categories/**",
                    "/api/user/mangas/**",
                    "/api/comments/**"
                ).permitAll()
                // Public query / view increment
                .requestMatchers(HttpMethod.POST, "/api/mangas/by-categories", "/api/mangas/*/view").permitAll()
                .requestMatchers(HttpMethod.PATCH, "/api/mangas/*").permitAll()
                // Root / health / error
                .requestMatchers("/", "/health", "/error").permitAll()
                // Admin-only management endpoints
                .requestMatchers(HttpMethod.POST, "/api/mangas/**", "/api/chapters/**", "/api/authors/**", "/api/categories/**", "/api/upload/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/mangas/**", "/api/chapters/**", "/api/authors/**", "/api/categories/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/mangas/**", "/api/chapters/**", "/api/authors/**", "/api/categories/**").hasRole("ADMIN")
                // All other endpoints require valid authenticated session
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
