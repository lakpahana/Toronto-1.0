package com.torontoOrg.contrack.service.impl;

import com.torontoOrg.contrack.dto.ContractItemDTO;
import com.torontoOrg.contrack.entity.ContractItem;
import com.torontoOrg.contrack.repo.ContractItemsRepo;
import com.torontoOrg.contrack.service.ContractItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ContractItemServiceIMPL implements ContractItemService {

    @Autowired
    private ContractItemsRepo contractItemsRepo;


    @Override
    public void saveItem(ContractItemDTO contractItemDTO) {
        ContractItem contractItem = new ContractItem(
                contractItemDTO.getId(),
                contractItemDTO.getItem(),
                contractItemDTO.getDescription(),
                contractItemDTO.getLocation(),
                contractItemDTO.getDayTotal(),
                contractItemDTO.getTotalToDate()
        );
        contractItemsRepo.save(contractItem);
    }

    @Override
    public List<ContractItemDTO> getAll() {
        System.out.println("get all items");
        List<ContractItem> contractItemList = contractItemsRepo.findAll();
        List<ContractItemDTO> contractItemDTOList = new ArrayList<>();
        for (ContractItem contractItem : contractItemList) {
            ContractItemDTO contractItemDTO = new ContractItemDTO(
                    contractItem.getId(),
                    contractItem.getItem(),
                    contractItem.getDescription(),
                    contractItem.getLocation(),
                    contractItem.getDayTotal(),
                    contractItem.getTotalToDate(),
                    contractItem.getAddedDate()
            );
            contractItemDTOList.add(contractItemDTO);
        }
        return contractItemDTOList;


    }

    @Override
    public ContractItemDTO getItemById(int id) {
        ContractItem contractItem = contractItemsRepo.findById(id).get();
        ContractItemDTO contractItemDTO = new ContractItemDTO(
                contractItem.getId(),
                contractItem.getItem(),
                contractItem.getDescription(),
                contractItem.getLocation(),
                contractItem.getDayTotal(),
                contractItem.getTotalToDate(),
                contractItem.getAddedDate()
        );
        return contractItemDTO;
    }

    @Override
    public String deleteItem(int id) {
        //if exist by id

        if (!contractItemsRepo.findById(id).isPresent()){
            return "Item not found";
        }

        contractItemsRepo.deleteById(id);
        return "Item Deleted";
    }

    @Override
    public void updateItem(ContractItemDTO contractItemDTO) {

        //if exist by id

        if (contractItemsRepo.findById(contractItemDTO.getId()).isPresent()){




            ContractItem contractItem = contractItemsRepo.findById(contractItemDTO.getId()).get();

            //getprevious day total and total to date
            int previousDayTotal = contractItem.getDayTotal();
            int previousTotalToDate = contractItem.getTotalToDate();

            //get current day total and total to date
            int currentDayTotal = contractItemDTO.getDayTotal();
            int currentTotalToDate = contractItemDTO.getTotalToDate();

            int newTotal = previousTotalToDate + currentDayTotal;


            contractItem.setId(contractItemDTO.getId());
            contractItem.setItem(contractItemDTO.getItem());
            contractItem.setDescription(contractItemDTO.getDescription());
            contractItem.setLocation(contractItemDTO.getLocation());
            contractItem.setDayTotal(contractItemDTO.getDayTotal());
            contractItem.setTotalToDate(newTotal);
            contractItemsRepo.save(contractItem);
        }




    }

    @Override
    public List<ContractItemDTO> getByDate(String date) {
        List<ContractItem> contractItemList = contractItemsRepo.findByAddedDate(date);
        List<ContractItemDTO> contractItemDTOList = new ArrayList<>();
        for (ContractItem contractItem : contractItemList) {
            ContractItemDTO contractItemDTO = new ContractItemDTO(
                    contractItem.getId(),
                    contractItem.getItem(),
                    contractItem.getDescription(),
                    contractItem.getLocation(),
                    contractItem.getDayTotal(),
                    contractItem.getTotalToDate(),
                    contractItem.getAddedDate()
            );
            contractItemDTOList.add(contractItemDTO);
        }
        return contractItemDTOList;
    }
}
