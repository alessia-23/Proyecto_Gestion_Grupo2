package com.avlearn.model;

import java.util.List;
import java.util.Map;

public class ContenedorPruebas {
    private Map<String, List<Prueba>> tests;

    public ContenedorPruebas() {
    }

    public ContenedorPruebas(Map<String, List<Prueba>> tests) {
        this.tests = tests;
    }

    // Getter y Setter
    public Map<String, List<Prueba>> getTests() {
        return tests;
    }

    public void setTests(Map<String, List<Prueba>> tests) {
        this.tests = tests;
    }
}
