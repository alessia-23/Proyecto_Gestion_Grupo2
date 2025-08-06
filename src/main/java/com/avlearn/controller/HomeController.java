package com.avlearn.controller;

import com.avlearn.model.Pregunta; // Using the new Pregunta model
import com.avlearn.service.LevelTestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType; // Import MediaType
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import java.util.Collections; // Import Collections
import java.util.List;
import java.util.Set;

@Controller
public class HomeController {
    @Autowired
    private LevelTestService levelTestService;
    
    @GetMapping("/")
    public String home() {
        return "index"; // Esto mapea a src/main/resources/templates/index.html
    }
    
    @GetMapping("/login")
    public String login(Model model) {
        model.addAttribute("pageTitle", "Iniciar Sesión - AvaLearn");
        return "login";
    }
    
    @GetMapping("/register")
    public String register(Model model) {
        model.addAttribute("pageTitle", "Registro - AvaLearn");
        return "register";
    }
    
    @GetMapping("/dashboard")
    public String dashboard() {
        return "dashboard"; // Esto mapea a src/main/resources/templates/dashboard.html
    }
    
    @GetMapping("/avatar-selection")
    public String avatarSelection(Model model) {
        model.addAttribute("pageTitle", "Selección de Avatar - AvaLearn");
        return "avatar-selection";
    }
    
    @GetMapping("/level-test")
    public String levelTest(Model model) {
        model.addAttribute("pageTitle", "Test de Nivel de Inglés - AvaLearn");
        // Las preguntas ahora se cargan directamente en el frontend (level-test/page.tsx)
        // Este endpoint de API ya no es llamado por el frontend para el test de nivel.
        return "level-test";
    }

    // Endpoint de API para servir preguntas (mantenido por si se usa en otro contexto o para depuración)
    @GetMapping(value = "/api/level-test/{level}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody // Esta anotación hace que Spring devuelva los datos directamente como JSON/XML
    public List<Pregunta> getLevelTestQuestions(@PathVariable String level) {
        try {
            List<Pregunta> questions = levelTestService.getQuestionsForLevel(level);
            System.out.println("Sirviendo " + questions.size() + " preguntas para el nivel: " + level); // Añadir registro
            return questions;
        } catch (Exception e) {
            System.err.println("Error al obtener preguntas para el nivel " + level + ": " + e.getMessage());
            e.printStackTrace();
            return Collections.emptyList(); // Asegurar que se devuelve JSON incluso en caso de error
        }
    }
    
    @GetMapping("/shop")
    public String shop(Model model) {
        model.addAttribute("pageTitle", "Tienda Mágica - AvaLearn");
        return "shop";
    }
    
    @GetMapping("/tutor-dashboard")
    public String tutorDashboard(Model model) {
        model.addAttribute("pageTitle", "Panel de Tutor - AvaLearn");
        return "tutor-dashboard";
    }
    
    @GetMapping("/forgot-password")
    public String forgotPassword(Model model) {
        model.addAttribute("pageTitle", "Recuperar Contraseña - AvaLearn");
        return "forgot-password";
    }
}

    