package projectpartner.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import projectpartner.entity.User;
import projectpartner.repository.UserRepository;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "*")
public class ProfileController {

    private final UserRepository userRepository;

    public ProfileController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    // =========================
    // GET PROFILE
    // =========================

    @GetMapping
    public ResponseEntity<?> getProfile(@RequestParam String email) {

        User user = userRepository.findByEmail(email).orElse(null);

        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }

        return ResponseEntity.ok(user);
    }


    // =========================
    // UPDATE PROFILE
    // =========================

    @PutMapping
    public ResponseEntity<?> updateProfile(
            @RequestParam String email,
            @RequestBody User updatedUser) {

        User user = userRepository.findByEmail(email).orElse(null);

        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }

        user.setName(updatedUser.getName());
        user.setCollege(updatedUser.getCollege());
        user.setBranch(updatedUser.getBranch());
        user.setYear(updatedUser.getYear());

        // Save skills
        user.setSkills(updatedUser.getSkills());

        // Save project interests
        user.setProjectInterests(updatedUser.getProjectInterests());

        User savedUser = userRepository.save(user);

        return ResponseEntity.ok(savedUser);
    }
}