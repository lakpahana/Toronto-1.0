package com.torontoOrg.contrack.repo;

import com.torontoOrg.contrack.entity.ContractItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
@EnableJpaRepositories
public interface ContractItemsRepo extends JpaRepository<ContractItem,Integer> {


    ContractItem findFirstByItemIdOrderByUpdatedDateDesc(int id);


    @Query(value =
            "SELECT DISTINCT ON (item_id) * FROM contract_items ORDER BY item_id, updated_date DESC"
            ,nativeQuery = true)

    List<ContractItem> findAllByDistinctTopByItemId();

    @Query(value = "SELECT COALESCE(MAX(item_id), 0) FROM contract_items", nativeQuery = true)
    int findTopByItemId();


    List<ContractItem> findAllByUpdatedDateBetween(LocalDateTime date, LocalDateTime date2);
}
