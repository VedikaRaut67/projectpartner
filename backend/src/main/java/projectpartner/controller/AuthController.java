package projectpartner.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import projectpartner.dto.LoginRequest;
import projectpartner.dto.RegisterRequest;
import projectpartner.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(
            @RequestBody RegisterRequest request) {

        boolean success = authService.register(request);

        if (success) {
            return ResponseEntity.ok("Registration successful");
        }

        return ResponseEntity
                .badRequest()
                .body("Email already registered");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(
            @RequestBody LoginRequest request) {

        boolean success = authService.login(request);

        if (success) {
            return ResponseEntity.ok("Login successful");
        }

        return ResponseEntity
                .badRequest()
                .body("Invalid email or password");
    }
}