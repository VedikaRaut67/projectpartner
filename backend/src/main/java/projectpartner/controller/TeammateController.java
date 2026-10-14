package projectpartner.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import projectpartner.entity.User;
import projectpartner.repository.UserRepository;

@RestController
@RequestMapping("/api/teammates")
@CrossOrigin(origins = "*")
public class TeammateController {

    private final UserRepository userRepository;

    public TeammateController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<User> getTeammates(
            @RequestParam(required = false) String skill) {

        List<User> users = userRepository.findAll();

        if (skill == null || skill.trim().isEmpty()) {
            return users;
        }

        String searchSkill = skill.trim().toLowerCase();

        return users.stream()
                .filter(user ->
                        user.getSkills() != null &&
                        user.getSkills()
                                .toLowerCase()
                                .contains(searchSkill)
                )
                .toList();
    }
}

