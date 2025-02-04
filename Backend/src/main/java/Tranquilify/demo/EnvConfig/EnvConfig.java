package Tranquilify.demo.EnvConfig;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import io.github.cdimascio.dotenv.Dotenv;
@Configuration
public class EnvConfig {
    @Bean
    public Dotenv dotenv() {

        return Dotenv.configure()
                .directory("/assets")
                .filename("env")
                .load();
    }
}
