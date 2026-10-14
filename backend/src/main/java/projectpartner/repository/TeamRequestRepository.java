
package projectpartner.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import projectpartner.entity.TeamRequest;

public interface TeamRequestRepository
        extends JpaRepository<TeamRequest, Long> {

    List<TeamRequest> findByReceiverEmail(String receiverEmail);

    List<TeamRequest> findBySenderEmail(String senderEmail);

}
