package com.cfw.model.entity;


import java.util.Date;


/**
 * 
 * @author johnny.Lu
 * @version 1.0
 * @date Jun 18, 2007
 */
public class SysUser {

	private String id;

	private String userName;

	private String userPsw;

	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUserName() {
		return this.userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getUserPsw() {
		return this.userPsw;
	}

	public void setUserPsw(String userPsw) {
		this.userPsw = userPsw;
	}
	
}
