package com.torontoOrg.contrack.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class NewContractItemSaveRequest {
        private String item;
        private String description;
        private String location;
        private String trackingUnit;
        private Double dayTotal;
}
