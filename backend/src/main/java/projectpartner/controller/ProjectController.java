package projectpartner.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import projectpartner.entity.Project;
import projectpartner.repository.ProjectRepository;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "*")
public class ProjectController {

    private final ProjectRepository projectRepository;

    public ProjectController(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @GetMapping
    public List<Project> getProjects(
            @RequestParam String email) {

        return projectRepository.findByOwnerEmail(email);
    }

    @PostMapping
    public ResponseEntity<?> createProject(
            @RequestBody Project project) {

        if (project.getTitle() == null ||
            project.getTitle().trim().isEmpty()) {

            return ResponseEntity.badRequest()
                    .body("Project title is required.");
        }

        if (project.getOwnerEmail() == null ||
            project.getOwnerEmail().trim().isEmpty()) {

            return ResponseEntity.badRequest()
                    .body("Owner email is required.");
        }

        Project savedProject =
                projectRepository.save(project);

        return ResponseEntity.ok(savedProject);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteProject(
            @RequestParam Long id,
            @RequestParam String email) {

        Project project =
                projectRepository.findById(id).orElse(null);

        if (project == null) {
            return ResponseEntity.badRequest()
                    .body("Project not found.");
        }

        if (!project.getOwnerEmail().equals(email)) {
            return ResponseEntity.status(403)
                    .body("You cannot delete this project.");
        }

        projectRepository.delete(project);

        return ResponseEntity.ok(
                "Project deleted successfully."
        );
    }
}