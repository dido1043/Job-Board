package com.example.Job_Board;

import com.example.Job_Board.configs.DotenvInitializer;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;

@SpringBootTest
@ContextConfiguration(initializers = DotenvInitializer.class)
class JobBoardApplicationTests {

	@Test
	void contextLoads() {
	}

}
