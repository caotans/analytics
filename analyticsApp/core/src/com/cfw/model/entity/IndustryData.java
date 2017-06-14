package com.analytics.web.model.entity;

import java.util.Date;

/**
 * Created with IntelliJ IDEA.
 * User: xiaomi
 * Date: 17-2-27
 * Time: 上午11:00
 * To change this template use File | Settings | File Templates.
 */
public class IndustryData {
    private int Id;
    private String IndustryDataCode;
    private String DataDate;
    private String DataValue;
    private Date CreatedTime;

    public Date getCreatedTime() {
        return CreatedTime;
    }

    public void setCreatedTime(Date createdTime) {
        CreatedTime = createdTime;
    }

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    public String getIndustryDataCode() {
        return IndustryDataCode;
    }

    public void setIndustryDataCode(String industryDataCode) {
        IndustryDataCode = industryDataCode;
    }

    public String getDataDate() {
        return DataDate;
    }

    public void setDataDate(String dataDate) {
        DataDate = dataDate;
    }

    public String getDataValue() {
        return DataValue;
    }

    public void setDataValue(String dataValue) {
        DataValue = dataValue;
    }

    public IndustryData(int id, String industryDataCode, String dataDate, String dataValue, Date createdTime) {
        Id = id;
        IndustryDataCode = industryDataCode;
        DataDate = dataDate;
        DataValue = dataValue;
        CreatedTime = createdTime;
    }

    public IndustryData() {
    }
}
