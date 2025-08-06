package com.avlearn.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private String password;
    
    private String avatar;
    private String englishLevel; // principiante, básico, intermedio, avanzado
    private Integer coins;
    private Integer currentStreak;
    private Integer completedLessons;
    private Integer totalLessons;
    private LocalDateTime lastActivity;
    private LocalDateTime createdAt;
    
    private String username;
    private Integer avatarId;
    private String[] purchasedItems; // Array de IDs de ítems
    private double testScore; // Nuevo campo para almacenar la puntuación del test
    private boolean isLoggedIn; // Para rastrear el estado de inicio de sesión

    // Constructores
    public User() {
        this.coins = 50; // Monedas iniciales mágicas
        this.currentStreak = 0;
        this.englishLevel = "principiante";
        this.completedLessons = 0;
        this.totalLessons = 45;
        this.createdAt = LocalDateTime.now();
        this.lastActivity = LocalDateTime.now();
        this.testScore = 0; // Puntuación de test por defecto
        this.isLoggedIn = false; // Estado de inicio de sesión por defecto
    }
    
    public User(String email, String name, String password) {
        this();
        this.email = email;
        this.name = name;
        this.password = password;
    }
    
    public User(Long id, String username, String email, String password, String englishLevel, int coins, int currentStreak, String lastLogin, Integer avatarId, String[] purchasedItems, double testScore, boolean isLoggedIn) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.englishLevel = englishLevel;
        this.coins = coins;
        this.currentStreak = currentStreak;
        this.lastActivity = LocalDateTime.parse(lastLogin);
        this.avatarId = avatarId;
        this.purchasedItems = purchasedItems;
        this.testScore = testScore;
        this.isLoggedIn = isLoggedIn;
    }

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    
    public String getAvatar() { return avatar; }
    public void setAvatar(String avatar) { this.avatar = avatar; }
    
    public String getEnglishLevel() { return englishLevel; }
    public void setEnglishLevel(String englishLevel) { this.englishLevel = englishLevel; }
    
    public Integer getCoins() { return coins; }
    public void setCoins(Integer coins) { this.coins = coins; }
    
    public Integer getCurrentStreak() { return currentStreak; }
    public void setCurrentStreak(Integer currentStreak) { this.currentStreak = currentStreak; }
    
    public Integer getCompletedLessons() { return completedLessons; }
    public void setCompletedLessons(Integer completedLessons) { this.completedLessons = completedLessons; }
    
    public Integer getTotalLessons() { return totalLessons; }
    public void setTotalLessons(Integer totalLessons) { this.totalLessons = totalLessons; }
    
    public LocalDateTime getLastActivity() { return lastActivity; }
    public void setLastActivity(LocalDateTime lastActivity) { this.lastActivity = lastActivity; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public Integer getAvatarId() {
        return avatarId;
    }

    public void setAvatarId(Integer avatarId) {
        this.avatarId = avatarId;
    }

    public String[] getPurchasedItems() {
        return purchasedItems;
    }

    public void setPurchasedItems(String[] purchasedItems) {
        this.purchasedItems = purchasedItems;
    }

    public double getTestScore() {
        return testScore;
    }

    public void setTestScore(double testScore) {
        this.testScore = testScore;
    }

    public boolean isLoggedIn() {
        return isLoggedIn;
    }

    public void setLoggedIn(boolean loggedIn) {
        isLoggedIn = loggedIn;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", englishLevel='" + englishLevel + '\'' +
                ", coins=" + coins +
                ", currentStreak=" + currentStreak +
                ", completedLessons=" + completedLessons +
                ", totalLessons=" + totalLessons +
                ", lastActivity=" + lastActivity +
                ", createdAt=" + createdAt +
                ", avatarId=" + avatarId +
                ", purchasedItems=" + java.util.Arrays.toString(purchasedItems) +
                ", testScore=" + testScore +
                ", isLoggedIn=" + isLoggedIn +
                '}';
    }
}
