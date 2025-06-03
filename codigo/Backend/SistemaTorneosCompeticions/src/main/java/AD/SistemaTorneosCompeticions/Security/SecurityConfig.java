package AD.SistemaTorneosCompeticions.Security;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    @Lazy
    private JwtFilter jwtFilter; 

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();  // Inyecta PasswordEncoder aquí
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return new UserDetailsServiceImpl();  // Inyecta UserDetailsService aquí
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource())) // Nueva forma de configurar CORS
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        // Permitir acceso a Swagger sin autenticación
                        .requestMatchers("/swagger-ui/**", "/swagger-ui.html", "/v3/api-docs/**", "/webjars/**", "/swagger-resources/**").permitAll()
                        // Permitir acceso a archivos estáticos
                        .requestMatchers("/css/**", "/js/**", "/images/**").permitAll()
                        // Permitir vistas de Thymeleaf sin autenticación
                        .requestMatchers("/home", "/equipos", "/torneos", "/jugadores", "/usuarios", "/registro", "/login", "/balon_oro")
                        .permitAll()

                        // Rutas públicas para login y registro
                        .requestMatchers("/auth/login", "/auth/register").permitAll()
                        // Rutas para ADMIN
                        .requestMatchers(HttpMethod.POST, "/api/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/usuario/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/usuario/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/usuario/**").hasRole("ADMIN")
                        // Rutas para usuarios normales
                        .requestMatchers(HttpMethod.GET, "/api/**").permitAll()

                        // Cualquier otra petición requiere autenticación
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(List.of("*")); // Permite todos los orígenes usando patrones
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));  // Permitir todos los encabezados
        configuration.setAllowCredentials(true); // Permitir solicitudes con credenciales

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}