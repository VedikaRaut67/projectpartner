package projectpartner.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import projectpartner.entity.Project;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    List<Project> findByOwnerEmail(String ownerEmail);

}