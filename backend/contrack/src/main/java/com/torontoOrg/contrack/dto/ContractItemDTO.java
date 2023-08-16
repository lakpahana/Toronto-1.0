package com.torontoOrg.contrack.dto;

import java.time.LocalDateTime;

public class ContractItemDTO {

    private int id;
    private String item;
    private String description;
    private String location;
    private Integer dayTotal;
    private Integer totalToDate;
    private LocalDateTime addedDate;

    // Constructors

    public ContractItemDTO() {
    }

    public ContractItemDTO(int id, String item, String description, String location, Integer dayTotal, Integer totalToDate, LocalDateTime addedDate) {
        this.id = id;
        this.item = item;
        this.description = description;
        this.location = location;
        this.dayTotal = dayTotal;
        this.totalToDate = totalToDate;
        this.addedDate = addedDate;
    }

    // Getters and setters

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getItem() {
        return item;
    }

    public void setItem(String item) {
        this.item = item;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Integer getDayTotal() {
        return dayTotal;
    }

    public void setDayTotal(Integer dayTotal) {
        this.dayTotal = dayTotal;
    }

    public Integer getTotalToDate() {
        return totalToDate;
    }

    public void setTotalToDate(Integer totalToDate) {
        this.totalToDate = totalToDate;
    }

    public LocalDateTime getAddedDate() {
        return addedDate;
    }

    public void setAddedDate(LocalDateTime addedDate) {
        this.addedDate = addedDate;
    }
}
