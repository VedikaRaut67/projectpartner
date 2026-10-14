package projectpartner.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import projectpartner.dto.LoginRequest;
import projectpartner.dto.RegisterRequest;
import projectpartner.entity.User;
import projectpartner.repository.UserRepository;

@Service
public class AuthService {

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder =
            new BCryptPasswordEncoder();

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public boolean register(RegisterRequest request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return false;
        }

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());

        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );

        user.setCollege(request.getCollege());
        user.setBranch(request.getBranch());
        user.setYear(request.getYear());

        userRepository.save(user);

        return true;
    }

    public boolean login(LoginRequest request) {

        return userRepository.findByEmail(request.getEmail())
                .map(user -> {

                    String storedPassword =
                            user.getPassword();

                    /*
                     * Supports old plain-text passwords
                     * and new BCrypt passwords.
                     */

                    if (storedPassword.startsWith("$2a$")
                            || storedPassword.startsWith("$2b$")
                            || storedPassword.startsWith("$2y$")) {

                        return passwordEncoder.matches(
                                request.getPassword(),
                                storedPassword
                        );
                    }

                    return storedPassword.equals(
                            request.getPassword()
                    );
                })
                .orElse(false);
    }
}