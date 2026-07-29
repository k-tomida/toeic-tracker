package com.toeictracker.backend.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
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
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{

        http
                // CORS設定
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                // REST APIなのでCSRFは不要
                .csrf(AbstractHttpConfigurer::disable)

                // JWTなのでセッションを使わない
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // 認可設定
                .authorizeHttpRequests(auth -> auth
                        // ログイン・新規登録は認証不要
                        .requestMatchers("/login", "/register").permitAll()

                        // それ以外は認証必須
                        .anyRequest().authenticated()
                )

                // JWTフィルターを追加
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    //パスワードをハッシュ値に変換するメソッド
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    // 認証処理(パスワード照合など)を担うメソッド
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config){
        return config.getAuthenticationManager();
    }

    //CORS設定
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        // フロントエンド(Vite開発サーバー)からのアクセスのみ許可する
        configuration.setAllowedOrigins(List.of(
                "http://localhost:5173"
        ));

        // REST APIで使用するHTTPメソッドを許可する
        configuration.setAllowedMethods(List.of(
                "GET",
                "POST",
                "PUT",
                "DELETE"
        ));

        // フロントから送られてくるヘッダーのうち、許可するものを指定
        configuration.setAllowedHeaders(List.of(
                "Authorization",
                "Content-Type"
        ));

        // Cookieや認証情報を含むリクエストは許可しない
        // (localStorageにトークンを保存し、Authorizationヘッダーで送る方式のため不要)
        configuration.setAllowCredentials(false);

        // URLパターンごとにCORS設定を適用するためのソースを作成
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

        // 全エンドポイント("/**")に対して、上で定義した設定を適用
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}
