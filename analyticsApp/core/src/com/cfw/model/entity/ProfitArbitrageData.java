package com.analytics.web.model.entity;

import oracle.sql.TIMESTAMP;

import java.util.Date;

/**
 * Created with IntelliJ IDEA.
 * User: xiaomi
 * Date: 17-2-27
 * Time: 上午11:00
 * To change this template use File | Settings | File Templates.
 */
public class ProfitArbitrageData {
    private int Id;
    private String ProArbitrageCode;
    private String DataDate;
    private float DataValue;
    private Date CreateTime;

    public Date getCreateTime() {
        return CreateTime;
    }

    public void setCreateTime(Date createTime) {
        CreateTime = createTime;
    }

    public ProfitArbitrageData() {
    }

    public ProfitArbitrageData(String dataDate, float dataValue, int id, String ProArbitrageCode) {

        DataDate = dataDate;
        DataValue = dataValue;
        Id = id;
        this.ProArbitrageCode = ProArbitrageCode;
    }

    public String getDataDate() {

        return DataDate;
    }

    public void setDataDate(String dataDate) {
        DataDate = dataDate;
    }

    public float getDataValue() {
        return DataValue;
    }

    public void setDataValue(float dataValue) {
        DataValue = dataValue;
    }

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    public String getProArbitrageCode() {
        return ProArbitrageCode;
    }

    public void setProArbitrageCode(String ProArbitrageCode) {
        this.ProArbitrageCode = ProArbitrageCode;
    }
}
