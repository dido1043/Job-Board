package com.example.Job_Board;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class JobBoardApplication {
	public static void main(String[] args) {
		Dotenv dotenv = Dotenv.configure().load();

		System.setProperty("DATASOURCE_URL", dotenv.get("DATASOURCE_URL"));
		System.setProperty("DATASOURCE_USER", dotenv.get("DATASOURCE_USER"));
		System.setProperty("FRONTEND_URL", dotenv.get("FRONTEND_URL"));

		SpringApplication.run(JobBoardApplication.class, args);
	}
}
