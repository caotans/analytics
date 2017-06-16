package com.cfw.model.entity;

/**
 * Created with IntelliJ IDEA.
 * User: xiaomi
 * Date: 16-11-15
 * Time: 下午3:37
 * To change this template use File | Settings | File Templates.
 */
public class DataDownload {
     private int Id;
     private String UserId;
     private String AllCode;
     private String AllName;
     private String  UpTime;
    private String excelArray;  //下载的时候前台传数据源
    private String url;                                    //下载的时候穿dk路径
    private String fileName;                                    //下载的时候文件名称
    private String result;                                    //下载的时候返回的页面
    private String titleName;                                    //下载的时候返回的页面
    private String sheetName;                                    //sheetName
    private String keyName;                                    //key
    private String chartName;                                    //echart文件名称
    private String chartImg;                                    //echart文件内容


    public String getAllName() {
        return AllName;
    }

    public void setAllName(String allName) {
        AllName = allName;
    }

    public String getUpTime() {
        return UpTime;
    }

    public void setUpTime(String upTime) {
        UpTime = upTime;
    }

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    public String getUserId() {
        return UserId;
    }

    public void setUserId(String userId) {
        UserId = userId;
    }

    public String getAllCode() {
        return AllCode;
    }

    public void setAllCode(String allCode) {
        AllCode = allCode;
    }

    public String getExcelArray() {
        return excelArray;
    }

    public void setExcelArray(String excelArray) {
        this.excelArray = excelArray;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public String getTitleName() {
        return titleName;
    }

    public void setTitleName(String titleName) {
        this.titleName = titleName;
    }



    public String getSheetName() {
        return sheetName;
    }

    public void setSheetName(String sheetName) {
        this.sheetName = sheetName;
    }

    public String getKeyName() {
        return keyName;
    }

    public void setKeyName(String keyName) {
        this.keyName = keyName;
    }

    public String getChartName() {
        return chartName;
    }

    public void setChartName(String chartName) {
        this.chartName = chartName;
    }

    public String getChartImg() {
        return chartImg;
    }

    public void setChartImg(String chartImg) {
        this.chartImg = chartImg;
    }
}
