package com.torontoOrg.contrack.repo;

import com.torontoOrg.contrack.entity.ContractItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
@EnableJpaRepositories
public interface ContractItemsRepo extends JpaRepository<ContractItem,Integer> {
    List<ContractItem> findByAddedDate(LocalDateTime date);
}
