/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2025, Vertigo.io, team@vertigo.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package io.vertigo.database.sql.vendor.mariadb;

import io.vertigo.commons.CommonsFeatures;
import io.vertigo.core.node.AutoCloseableNode;
import io.vertigo.core.node.config.BootConfig;
import io.vertigo.core.node.config.NodeConfig;
import io.vertigo.core.param.Param;
import io.vertigo.database.DatabaseFeatures;
import io.vertigo.database.impl.sql.vendor.h2.H2DataBase;
import io.vertigo.database.impl.sql.vendor.mariadb.MariaDbDataBase;
import io.vertigo.database.sql.AbstractSqlManagerTest;
import io.vertigo.database.sql.vendor.SqlDialect;
import io.vertigo.database.sql.vendor.SqlDialect.GenerationMode;

/**
 * Tests d'intégration pour MariaDB avec InnoDB.
 * Ces tests peuvent être lents car ils nécessitent une instance MariaDB.
 * Utilisez @Disabled pour les désactiver en développement.
 *
 * @author ppinette
 */
public final class MariaDbDataBaseManagerTest extends AbstractSqlManagerTest {

    private AutoCloseableNode node;

    @Override
    public SqlDialect getDialect() {
        return new MariaDbDataBase().getSqlDialect();
    }

    @Override
    protected NodeConfig buildNodeConfig() {
        return NodeConfig.builder()
                .withBoot(BootConfig.builder()
                        .withLocales("fr_FR")
                        .build())
                .addModule(new CommonsFeatures()
                        .build())
                .addModule(new DatabaseFeatures()
                        .withSqlDataBase()
                        .withC3p0(
                                Param.of("dataBaseClass", MariaDbDataBase.class.getName()),
                                Param.of("jdbcDriver", "org.mariadb.jdbc.Driver"),
                                Param.of("jdbcUrl", "jdbc:mariadb://localhost:3306/test?user=root&password=root"),
                                Param.of("minPoolSize", "1"),
                                Param.of("maxPoolSize", "5"),
                                Param.of("acquireIncrement", "1"))
                        .withC3p0(
                                Param.of("name", "secondary"),
                                Param.of("dataBaseClass", H2DataBase.class.getName()),
                                Param.of("jdbcDriver", "org.h2.Driver"),
                                Param.of("jdbcUrl", "jdbc:h2:mem:secondaryDatabase"))
                        .build())
                .build();
    }

    @Override
    protected String createTableMovie() {
        return "CREATE TABLE IF NOT EXISTS movie ( "
                + "mov_id INT AUTO_INCREMENT PRIMARY KEY, "
                + "title VARCHAR(255), "
                + "mail VARCHAR(255), "
                + "fps DECIMAL(6,3), "
                + "income DECIMAL(6,3), "
                + "color TINYINT(1), "
                + "release_date DATETIME NULL, "
                + "release_local_date DATE NULL, "
                + "release_instant DATETIME NULL, "
                + "icon LONGBLOB"
                + ") ENGINE=InnoDB";
    }

    @Override
    protected String createSequenceMovie() {
        return "CREATE SEQUENCE IF NOT EXISTS seq_movie START WITH 1 INCREMENT BY 20";
    }

    @Override
    protected GenerationMode getExpectedGenerationMode() {
        return GenerationMode.GENERATED_KEYS;
    }

    @Override
    protected boolean commitRequiredOnSchemaModification() {
        return true; // InnoDB nécessite un commit après DDL
    }


}
