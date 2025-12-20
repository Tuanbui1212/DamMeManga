import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable) // Tắt CSRF để test API dễ hơn
            .authorizeHttpRequests(auth -> auth
                // QUAN TRỌNG: Cho phép truy cập tự do vào trang chủ và các file tĩnh
                .requestMatchers("/", "/health", "/public/**").permitAll()
                // Các request khác cũng cho phép hết (để bạn dev frontend cho dễ)
                // Sau này xong xuôi thì đổi lại thành .authenticated()
                .anyRequest().permitAll() 
            );
        return http.build();
    }
}