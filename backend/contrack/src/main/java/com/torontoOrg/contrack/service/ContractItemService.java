package com.torontoOrg.contrack.service;

import com.torontoOrg.contrack.dto.ContractItemDTO;

import java.util.List;

public interface ContractItemService {


    void saveItem(ContractItemDTO contractItemDTO);

    List<ContractItemDTO> getAll();

    ContractItemDTO getItemById(int id);

    String deleteItem(int id);

    void updateItem(ContractItemDTO contractItemDTO);

    List<ContractItemDTO> getByDate(String date);

    void saveAll(List<ContractItemDTO> contractItemDTOList);
}
