package com.avlearn.model;

public class Avatar {
    private int id;
    private String name;
    private String image;

    public Avatar() {
    }

    public Avatar(int id, String name, String image) {
        this.id = id;
        this.name = name;
        this.image = image;
    }

    // Getters y Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
