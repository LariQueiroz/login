package com.larissa.cadastro;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
	http
	.csrf(csrf -> csrf.disable())
	.cors(cors -> {}) 
	.authorizeHttpRequests(auth -> auth

	   .requestMatchers(HttpMethod.DELETE, "/usuarios/**").permitAll()
	   .requestMatchers(HttpMethod.PUT, "/usuarios/**").permitAll()
	.requestMatchers("/usuarios/**", "/login/**").permitAll()
	.requestMatchers("/usuarios/solicitar-recuperacao", "/usuarios/redefinir-senha").permitAll()
	.anyRequest().authenticated()
	);

	return http.build();
	}


    @Bean
    BCryptPasswordEncoder passwordEncoder() {
	return new BCryptPasswordEncoder();
	}
	}
