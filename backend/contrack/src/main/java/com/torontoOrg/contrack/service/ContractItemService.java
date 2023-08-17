package com.torontoOrg.contrack.service;

import com.torontoOrg.contrack.dto.ContractItemDTO;
import com.torontoOrg.contrack.dto.request.NewContractItemSaveRequest;
import com.torontoOrg.contrack.dto.request.UpdateContractItemRequest;
import com.torontoOrg.contrack.dto.response.ContractItemResponse;

import java.util.List;

public interface ContractItemService {


    String saveItem(NewContractItemSaveRequest newContractItemSaveRequest);

    ContractItemResponse getItemById(int id);


    List<ContractItemResponse> getDistinctItems();

    String updateItem(UpdateContractItemRequest updateContractItemRequest);

    String saveList(List<UpdateContractItemRequest> updateContractItemRequestList);


    List<ContractItemResponse> getItemsByDate(String date);
}
