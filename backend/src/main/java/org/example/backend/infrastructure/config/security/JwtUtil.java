// package org.example.backend.infrastructure.config.security;

// import io.jsonwebtoken.Jwts;
// import io.jsonwebtoken.Claims;
// import io.jsonwebtoken.SignatureAlgorithm;
// import io.jsonwebtoken.security.Keys;
// import org.springframework.stereotype.Component;

// import java.security.Key;
// import java.util.Date;

// @Component
// public class JwtUtil {

//     private final String SECRET_KEY = "dammemanga-secret-dammemanga-secret-dammemanga-secret";
//     private final Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());

//     public String generateToken(String username, String role) {
//         return Jwts.builder()
//                 .setSubject(username)
//                 .claim("role", role)
//                 .setIssuedAt(new Date())
//                 .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
//                 .signWith(key, SignatureAlgorithm.HS256)
//                 .compact();
//     }

//     public String extractUsername(String token) {
//         return getClaims(token).getSubject();
//     }

//     public String extractRole(String token) {
//         return (String) getClaims(token).get("role");
//     }

//     public String extractAccount(String token) {
//         return extractUsername(token);
//     }

//     public boolean isTokenExpired(String token) {
//         return getClaims(token).getExpiration().before(new Date());
//     }

//     public boolean validateToken(String token, String username) {
//         return extractUsername(token).equals(username) && !isTokenExpired(token);

//     }

//     private Claims getClaims(String token) {
//         return Jwts.parserBuilder()
//                 .setSigningKey(key)
//                 .build()
//                 .parseClaimsJws(token)
//                 .getBody();
//     }

// }

package org.example.backend.infrastructure.config.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtil {

    // 🔑 MÃ BÍ MẬT: Dùng để ký tên vào Token. Chỉ Server biết mã này.
    // Nếu lộ mã này, hacker có thể tự tạo token giả mạo admin.
    // (Trong thực tế nên để trong file application.properties)
    private static final String SECRET = "5367566B59703373367639792F423F4528482B4D6251655468576D5A71347437";

    // --- 1. TẠO TOKEN (Khi đăng nhập thành công) ---
    public String generateToken(String account, String role) {
        Map<String, Object> claims = new HashMap<>();
        // Lưu quyền (role) vào trong bụng token để sau này không cần query DB lại
        claims.put("role", role); 
        return createToken(claims, account);
    }

    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject) // Subject thường là account/username
                .setIssuedAt(new Date(System.currentTimeMillis())) // Thời gian tạo
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)) // Hết hạn sau 1 ngày
                .signWith(getSignKey(), SignatureAlgorithm.HS256) // Ký tên bằng thuật toán HS256
                .compact();
    }

    // --- 2. GIẢI MÃ TOKEN (Khi user gửi request) ---
    
    // Lấy Role từ token
    public String extractRole(String token) {
        return extractClaim(token, claims -> claims.get("role", String.class));
    }

    // Lấy Account từ token
    public String extractAccount(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // Hàm chung để lấy dữ liệu (Claims)
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // Tạo Key mã hóa từ chuỗi SECRET
    private Key getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}