package Tranquilify.demo;

import Tranquilify.demo.Security.SecurityConfigure;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@Import(SecurityConfigure.class)
public class TranquilifyApplication {

	public static void main(String[] args) {

		Dotenv dotenv = Dotenv.load();

		SpringApplication.run(TranquilifyApplication.class, args);
	}
}
