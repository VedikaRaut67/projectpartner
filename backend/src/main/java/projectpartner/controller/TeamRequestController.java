package projectpartner.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import projectpartner.entity.TeamRequest;
import projectpartner.entity.User;
import projectpartner.repository.TeamRequestRepository;
import projectpartner.repository.UserRepository;

@RestController
@RequestMapping("/api/team-requests")
@CrossOrigin(origins = "*")
public class TeamRequestController {

    private final TeamRequestRepository teamRequestRepository;
    private final UserRepository userRepository;

    public TeamRequestController(
            TeamRequestRepository teamRequestRepository,
            UserRepository userRepository) {

        this.teamRequestRepository = teamRequestRepository;
        this.userRepository = userRepository;
    }

    @PostMapping
    public ResponseEntity<?> sendRequest(
            @RequestBody TeamRequest request) {

        if (request.getSenderEmail() == null ||
            request.getSenderEmail().trim().isEmpty()) {

            return ResponseEntity.badRequest()
                    .body("Sender email is required.");
        }

        if (request.getReceiverEmail() == null ||
            request.getReceiverEmail().trim().isEmpty()) {

            return ResponseEntity.badRequest()
                    .body("Receiver email is required.");
        }

        if (request.getProjectTitle() == null ||
            request.getProjectTitle().trim().isEmpty()) {

            return ResponseEntity.badRequest()
                    .body("Project title is required.");
        }

        request.setStatus("PENDING");

        TeamRequest savedRequest =
                teamRequestRepository.save(request);

        return ResponseEntity.ok(savedRequest);
    }

    @GetMapping("/received")
    public List<TeamRequest> getReceivedRequests(
            @RequestParam String email) {

        return teamRequestRepository
                .findByReceiverEmail(email);
    }

    @GetMapping("/sent")
    public List<TeamRequest> getSentRequests(
            @RequestParam String email) {

        return teamRequestRepository
                .findBySenderEmail(email);
    }

    @GetMapping("/accepted")
    public List<TeamRequest> getAcceptedRequests(
            @RequestParam String email) {

        List<TeamRequest> received =
                teamRequestRepository
                        .findByReceiverEmail(email);

        List<TeamRequest> sent =
                teamRequestRepository
                        .findBySenderEmail(email);

        List<TeamRequest> accepted =
                new ArrayList<>();

        for (TeamRequest request : received) {

            if ("ACCEPTED".equalsIgnoreCase(
                    request.getStatus())) {

                accepted.add(request);
            }
        }

        for (TeamRequest request : sent) {

            if ("ACCEPTED".equalsIgnoreCase(
                    request.getStatus())) {

                accepted.add(request);
            }
        }

        return accepted;
    }

    @GetMapping("/accepted/details")
    public List<Map<String, Object>> getAcceptedTeamDetails(
            @RequestParam String email) {

        List<TeamRequest> received =
                teamRequestRepository
                        .findByReceiverEmail(email);

        List<TeamRequest> sent =
                teamRequestRepository
                        .findBySenderEmail(email);

        List<Map<String, Object>> result =
                new ArrayList<>();

        for (TeamRequest request : received) {

            if ("ACCEPTED".equalsIgnoreCase(
                    request.getStatus())) {

                addTeamMemberDetails(
                        result,
                        request,
                        request.getSenderEmail()
                );
            }
        }

        for (TeamRequest request : sent) {

            if ("ACCEPTED".equalsIgnoreCase(
                    request.getStatus())) {

                addTeamMemberDetails(
                        result,
                        request,
                        request.getReceiverEmail()
                );
            }
        }

        return result;
    }

    private void addTeamMemberDetails(
            List<Map<String, Object>> result,
            TeamRequest request,
            String memberEmail) {

        User user =
                userRepository
                        .findByEmail(memberEmail)
                        .orElse(null);

        if (user == null) {
            return;
        }

        Map<String, Object> member =
                new HashMap<>();

        member.put("requestId", request.getId());
        member.put("projectTitle",
                request.getProjectTitle());

        member.put("name", user.getName());
        member.put("email", user.getEmail());
        member.put("college", user.getCollege());
        member.put("branch", user.getBranch());
        member.put("year", user.getYear());
        member.put("skills", user.getSkills());
        member.put("projectInterests",
                user.getProjectInterests());

        result.add(member);
    }

    @PutMapping("/status")
    public ResponseEntity<?> updateStatus(
            @RequestParam Long id,
            @RequestParam String status) {

        TeamRequest request =
                teamRequestRepository
                        .findById(id)
                        .orElse(null);

        if (request == null) {

            return ResponseEntity.badRequest()
                    .body("Team request not found.");
        }

        if (!status.equalsIgnoreCase("ACCEPTED") &&
            !status.equalsIgnoreCase("REJECTED")) {

            return ResponseEntity.badRequest()
                    .body("Invalid status.");
        }

        request.setStatus(
                status.toUpperCase()
        );

        TeamRequest updatedRequest =
                teamRequestRepository.save(request);

        return ResponseEntity.ok(updatedRequest);
    }
}

