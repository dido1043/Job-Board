package com.example.Job_Board.configs;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {
    private final AuthenticationProvider authenticationPrpvider;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfiguration(AuthenticationProvider authenticationPrpvider,
                                 JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.authenticationPrpvider = authenticationPrpvider;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }


}
