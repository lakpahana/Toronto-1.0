package com.torontoOrg.contrack.controller;

import com.torontoOrg.contrack.dto.ContractItemDTO;
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

    //simple get method
    @GetMapping(
            "/test"
    )
    public String test(){
        return "test";
    }

    @PostMapping(
            "/save"
    )
    public String saveCustomer(@RequestBody ContractItemDTO contractItemDTO){

        System.out.println("item " + contractItemDTO.getId());

        contractItemService.saveItem(contractItemDTO);
        System.out.println("item " + contractItemDTO);
        return "Saved";
    }

    //get all items

    @GetMapping(
            "/getAll"
    )
    public List<ContractItemDTO> getAll(){
        System.out.println("get all items");
        return contractItemService.getAll();
    }


    //get item by id

    @GetMapping(
            "/get/{id}"
    )

    public ContractItemDTO getItemById(@PathVariable("id") int id){
        return contractItemService.getItemById(id);
    }




    //update item

    @PutMapping(
            "/update"
    )

    public String updateItem(@RequestBody ContractItemDTO contractItemDTO){



        contractItemService.updateItem(contractItemDTO);
        return "Updated";
    }

    //delete item

    @DeleteMapping(
            "/delete/{id}"
    )
    public String deleteItem(@PathVariable("id") int id){
        String resp = contractItemService.deleteItem(id);
        return resp;
    }


    //get by date
    @GetMapping(
            "/getByDate/{date}"
    )
    public List<ContractItemDTO> getByDate(@PathVariable("date") String date){

        return contractItemService.getByDate(date);
    }


    //add multiple items at once

    @PostMapping(
            "/saveAll"
    )
    public String saveAll(@RequestBody List<ContractItemDTO> contractItemDTOList){
        contractItemService.saveAll(contractItemDTOList);
        return "Saved";
    }


}
