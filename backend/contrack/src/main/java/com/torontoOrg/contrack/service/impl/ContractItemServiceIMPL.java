package com.torontoOrg.contrack.service.impl;

import com.torontoOrg.contrack.dto.request.NewContractItemSaveRequest;
import com.torontoOrg.contrack.dto.request.UpdateContractItemRequest;
import com.torontoOrg.contrack.dto.response.ContractItemResponse;
import com.torontoOrg.contrack.entity.ContractItem;
import com.torontoOrg.contrack.repo.ContractItemsRepo;
import com.torontoOrg.contrack.service.ContractItemService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class ContractItemServiceIMPL implements ContractItemService {

    @Autowired
    private ContractItemsRepo contractItemsRepo;

    @Autowired
    private ModelMapper modelMapper;


    @Override
    public String saveItem(NewContractItemSaveRequest newContractItemSaveRequest) {

        //generate a new item id
        int itemId = contractItemsRepo.findTopByItemId();
        itemId++;
        ContractItem contractItem = modelMapper.map(newContractItemSaveRequest, ContractItem.class);
        contractItem.setItemId(itemId);
        contractItem.setAddedDate(LocalDateTime.now());
        contractItem.setTotalToDate(newContractItemSaveRequest.getDayTotal());

        //print the item
        System.out.println(contractItem.toString());

        contractItemsRepo.save(contractItem);
        return "Item Saved";
    }


    @Override
    public ContractItemResponse getItemById(int id) {
        ContractItem contractItem = contractItemsRepo.findFirstByItemIdOrderByUpdatedDateDesc(id);
        ContractItemResponse contractItemResponse = modelMapper.map(contractItem, ContractItemResponse.class);
        return contractItemResponse;

    }

    @Override
    public List<ContractItemResponse> getDistinctItems() {
        //get unique items by itemId
        List<ContractItem> contractItems = contractItemsRepo.findAllByDistinctTopByItemId();
        List<ContractItemResponse> contractItemResponses = modelMapper.map(contractItems, List.class);
        return contractItemResponses;
    }

    @Override
    public String updateItem(UpdateContractItemRequest updateContractItemRequest) {
        ContractItem contractItem = modelMapper.map(updateContractItemRequest, ContractItem.class);
        //get the item by id
        ContractItem contractItem1 = contractItemsRepo.findFirstByItemIdOrderByUpdatedDateDesc(updateContractItemRequest.getItemId());
        //if exist
        if (contractItem1 == null) {
            throw new RuntimeException("Item not found");
        }
        LocalDateTime addedDate = contractItem1.getAddedDate();
        contractItem.setAddedDate(addedDate);

        double totalToDate = contractItem1.getTotalToDate()  + updateContractItemRequest.getDayTotal();

        contractItem.setTotalToDate(totalToDate);

        contractItemsRepo.save(contractItem);

        return "Item Updated";
    }



    @Override
    public String saveList(List<UpdateContractItemRequest> updateContractItemRequestList) {
        for (UpdateContractItemRequest updateContractItemRequest : updateContractItemRequestList) {

            //if itemid is null add new item else update item if it exists
            if (updateContractItemRequest.getItemId() == 0) {
                //generate a new item id
                int itemId = contractItemsRepo.findTopByItemId();
                itemId++;
                ContractItem contractItem = modelMapper.map(updateContractItemRequest, ContractItem.class);
                contractItem.setItemId(itemId);
                contractItem.setAddedDate(LocalDateTime.now());
                contractItem.setTotalToDate(updateContractItemRequest.getDayTotal());

                //print the item
                System.out.println(contractItem.toString());

                contractItemsRepo.save(contractItem);
            } else {
                ContractItem contractItem = modelMapper.map(updateContractItemRequest, ContractItem.class);
                //get the item by id
                ContractItem contractItem1 = contractItemsRepo.findFirstByItemIdOrderByUpdatedDateDesc(updateContractItemRequest.getItemId());
                //if exist
                if (contractItem1 == null) {
                    throw new RuntimeException("Item not found");
                }
                LocalDateTime addedDate = contractItem1.getAddedDate();
                contractItem.setAddedDate(addedDate);

                double totalToDate = contractItem1.getTotalToDate()  + updateContractItemRequest.getDayTotal();

                contractItem.setTotalToDate(totalToDate);

                contractItemsRepo.save(contractItem);
            }


        }
        return "List Saved";
    }

    @Override
    public List<ContractItemResponse> getItemsByDate(String date) {
        //convert date to local date time

        String dateString = date ;// Replace with your date string
        LocalDate datew = LocalDate.parse(dateString); // Parse the date part

        // Create a LocalTime with midnight time (00:00:00)
        LocalTime time = LocalTime.MIDNIGHT;

        // Combine the parsed date and the LocalTime to create LocalDateTime
        LocalDateTime dateTime = LocalDateTime.of(datew, time);

        //start of day
        LocalDateTime dateTime1 = dateTime.with(LocalTime.MIN);

        //end of day
        LocalDateTime dateTime2 = dateTime.with(LocalTime.MAX);
        List<ContractItem> contractItems = contractItemsRepo.findAllByUpdatedDateBetween(dateTime1, dateTime2);
        List<ContractItemResponse> contractItemResponses = modelMapper.map(contractItems, List.class);
        return contractItemResponses;
    }


}

