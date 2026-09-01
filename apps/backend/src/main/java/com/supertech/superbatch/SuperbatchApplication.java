package com.supertech.superbatch;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.security.autoconfigure.UserDetailsServiceAutoConfiguration;

@SpringBootApplication(exclude = UserDetailsServiceAutoConfiguration.class)
public class SuperbatchApplication {

	public static void main(String[] args) {
		SpringApplication.run(SuperbatchApplication.class, args);
	}

}
