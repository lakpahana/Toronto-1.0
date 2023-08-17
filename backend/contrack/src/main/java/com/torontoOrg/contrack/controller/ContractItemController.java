package com.torontoOrg.contrack.controller;

import com.torontoOrg.contrack.dto.ContractItemDTO;
import com.torontoOrg.contrack.dto.request.NewContractItemSaveRequest;
import com.torontoOrg.contrack.dto.request.UpdateContractItemRequest;
import com.torontoOrg.contrack.dto.response.ContractItemResponse;
import com.torontoOrg.contrack.service.ContractItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(
        "/api/v1/contractItem"
)
@CrossOrigin
public class ContractItemController {

    @Autowired
    private ContractItemService contractItemService;

    @PostMapping(
            "/save"
    )
    public String saveItem(@RequestBody NewContractItemSaveRequest newContractItemSaveRequest) {
        String res = contractItemService.saveItem(newContractItemSaveRequest);
        return res;
    }

    //get by id
    @GetMapping(
            "/get/{id}"
    )
    public ContractItemResponse getItemById(@PathVariable int id) {
        return contractItemService.getItemById(id);
    }

    //get distinct items by itemid
    @GetMapping(
            "/getDistinctItems"
    )

    public List<ContractItemResponse> getDistinctItems() {
        return contractItemService.getDistinctItems();
    }

    //Update item
    @PutMapping(
            "/update"
    )
    public String updateItem(@RequestBody UpdateContractItemRequest updateContractItemRequest) {
        contractItemService.updateItem(updateContractItemRequest);
        return "Item Updated";
    }

    //save list of items
    @PostMapping(
            "/saveList"
    )

    public String saveList(@RequestBody List<UpdateContractItemRequest> updateContractItemRequestList) {
        contractItemService.saveList(updateContractItemRequestList);
        return "List Saved";
    }

    //GET list of items for a date
    @GetMapping(
            "/getItemsByDate/{date}"
    )

    public List<ContractItemResponse> getItemsByDate(@PathVariable String date) {
        return contractItemService.getItemsByDate(date);
    }




}
