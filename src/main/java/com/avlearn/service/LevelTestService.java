package com.avlearn.service;

import com.avlearn.model.ContenedorPruebas;
import com.avlearn.model.Prueba;
import com.avlearn.model.Pregunta; // Asegúrate de importar esto
import com.avlearn.util.LectorJson;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class LevelTestService {
    private final ContenedorPruebas contenedorPruebas;

    public LevelTestService(LectorJson lectorJson) throws IOException {
        this.contenedorPruebas = lectorJson.leerPruebasNivel();
    }

    public Map<String, List<Prueba>> getAllTests() {
        return contenedorPruebas.getTests();
    }

    public List<Prueba> getTestsByLevel(String level) {
        return contenedorPruebas.getTests().getOrDefault(level.toLowerCase(), List.of());
    }

    public Optional<Prueba> getPruebaPorNivelYId(String nivel, int id) {
        return getTestsByLevel(nivel).stream()
                .filter(prueba -> prueba.getId() == id)
                .findFirst();
    }

    // 🔧 MÉTODO QUE FALTABA
    public List<Pregunta> getQuestionsForLevel(String level) {
        List<Prueba> pruebas = getTestsByLevel(level);

        if (pruebas == null || pruebas.isEmpty()) {
            return List.of(); // lista vacía si no hay pruebas
        }

        // Combinar todas las preguntas de todas las pruebas del nivel
        return pruebas.stream()
                .flatMap(prueba -> prueba.getPreguntas().stream())
                .toList();
    }
}
