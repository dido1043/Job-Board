package com.example.Job_Board.configs;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MapPropertySource;

import java.util.HashMap;
import java.util.Map;

public class DotenvInitializer implements ApplicationContextInitializer<ConfigurableApplicationContext> {
    @Override
    public void initialize(ConfigurableApplicationContext applicationContext) {
        Dotenv dotenv = Dotenv.load();

        Map<String, Object> properties = new HashMap<>();
        properties.put("spring.datasource.url", dotenv.get("DATASOURCE_URL"));
        properties.put("spring.datasource.username", dotenv.get("DATASOURCE_USER"));
        properties.put("frontend.url", dotenv.get("FRONTEND_URL"));

        ConfigurableEnvironment env = applicationContext.getEnvironment();
        env.getPropertySources().addFirst(new MapPropertySource("dotenv", properties));
    }

    private void setEnv(Map<String, Object> props, String springKey, Dotenv dotenv, String envKey) {
        String value = dotenv.get(envKey);
        if (value != null) {
            props.put(springKey, value);
        }
    }
}
