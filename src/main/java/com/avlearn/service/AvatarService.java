package com.avlearn.service;

import com.avlearn.model.Avatar;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class AvatarService {

    private static final List<Avatar> AVATARS = Arrays.asList(
            new Avatar(1, "Astro", "/placeholder.svg?height=100&width=100&text=Astro"),
            new Avatar(2, "Robotín", "/placeholder.svg?height=100&width=100&text=Robotín"),
            new Avatar(3, "Hada Mágica", "/placeholder.svg?height=100&width=100&text=Hada"),
            new Avatar(4, "Dragón Amigable", "/placeholder.svg?height=100&width=100&text=Dragón"),
            new Avatar(5, "Explorador", "/placeholder.svg?height=100&width=100&text=Explorador"),
            new Avatar(6, "Estrella", "/placeholder.svg?height=100&width=100&text=Estrella")
    );

    public List<Avatar> getAllAvatars() {
        return AVATARS;
    }

    public Avatar getAvatarById(int id) {
        return AVATARS.stream()
                .filter(avatar -> avatar.getId() == id)
                .findFirst()
                .orElse(null);
    }
}
