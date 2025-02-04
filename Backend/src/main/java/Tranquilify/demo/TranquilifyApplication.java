package Tranquilify.demo;

import Tranquilify.demo.Security.SecurityConfigure;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;

@SpringBootApplication
@Import(SecurityConfigure.class)
public class TranquilifyApplication {

	public static void main(String[] args) {
		SpringApplication.run(TranquilifyApplication.class, args);
	}

}
