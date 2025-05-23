package AD.SistemaTorneosCompeticions.Security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenUtil {   // Generar un token cada hora
    private final Key secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256); // Clave secreta
    private final long expirationTime = 3600000L; // Duración del token (1 hora)
    // Generar un token
    public String generateToken(String usuario) {
        return Jwts.builder()
                .setSubject(usuario)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(secretKey)
                .compact();
    }
    // Validar el token
    public boolean validateToken(String token) {
        try {
            Claims claims = Jwts.parser().setSigningKey(secretKey).build()
                    .parseClaimsJws(token)
                    .getBody();
            return claims.getSubject() != null;

        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
    // Obtener el nombre de usuario del token
    public String getUsernameFromToken(String token) {
        Claims claims =
                Jwts.parser().setSigningKey(secretKey).build().parseClaimsJws(token).getBody();
        return claims.getSubject();
    }
}
