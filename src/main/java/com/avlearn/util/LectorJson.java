package com.avlearn.util;

import com.avlearn.model.ContenedorPruebas;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;

@Component
public class LectorJson {

    private static final String JSON_FILE_PATH = "pruebas_nivel.json";

    private final ObjectMapper objectMapper;

    public LectorJson(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    public ContenedorPruebas leerPruebasNivel() throws IOException {
        Resource resource = new ClassPathResource(JSON_FILE_PATH);
        try (InputStream is = resource.getInputStream()) {
            return objectMapper.readValue(is, ContenedorPruebas.class);
        }
    }
}
