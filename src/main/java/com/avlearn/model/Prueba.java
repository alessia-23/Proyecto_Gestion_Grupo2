package com.avlearn.model;

import java.util.List;

public class Prueba {
    private int id;
    private List<Pregunta> questions;

    public Prueba() {
    }

    public Prueba(int id, List<Pregunta> questions) {
        this.id = id;
        this.questions = questions;
    }

    // Getters y Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public List<Pregunta> getQuestions() {
        return questions;
    }

    public void setQuestions(List<Pregunta> questions) {
        this.questions = questions;
    }

    private List<Pregunta> preguntas;

    public List<Pregunta> getPreguntas() {
        return preguntas;
    }
}
