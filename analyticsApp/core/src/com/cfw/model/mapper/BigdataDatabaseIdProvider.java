package com.cfw.model.mapper;

import org.apache.ibatis.mapping.DatabaseIdProvider;

import javax.sql.DataSource;
import java.sql.SQLException;
import java.util.Properties;

public class BigdataDatabaseIdProvider implements DatabaseIdProvider {
	
	private Properties properties;
	
	private String dbDialect;

	public void setDbDialect(String dbDialect) {
		this.dbDialect = dbDialect;
	}

	public String getDatabaseId(DataSource dataSource) throws SQLException {
		return dbDialect;
	}

	public void setProperties(Properties properties) {
		this.properties = properties;
	}

}
