package org.example.backend.infrastructure.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.fasterxml.jackson.datatype.hibernate6.Hibernate6Module;


@Configuration
public class JacksonConfig {
    @Bean
    public Hibernate6Module hibernateModule() {
        Hibernate6Module module = new Hibernate6Module();
        module.disable(Hibernate6Module.Feature.SERIALIZE_IDENTIFIER_FOR_LAZY_NOT_LOADED_OBJECTS);
        return module;
    }
}
