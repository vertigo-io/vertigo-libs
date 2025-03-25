# vertigo-libs
=================

[![License](https://img.shields.io/badge/License-Apache%202.0-green.svg)](https://opensource.org/licenses/Apache-2.0)
[![Maven Central](https://img.shields.io/maven-central/v/io.vertigo/vertigo.svg?label=Maven%20Central)](https://search.maven.org/search?q=g:%22io.vertigo%22)

Vertigo-libs provides feature-rich components that can be seamlessly integrated into any Vertigo application.
Leverage them to enhance your applications!


## vertigo-account [![Ready to use?](https://img.shields.io/badge/Ready%20to%20use%3F-yes-green.svg)]()
### A simple yet powerful user management system

* __Authentication__ : A set of connectors to easily manage user authentication within your application.
* __Authorization__ : User session and security tools to control access to resources based on roles and/or data properties.
* __Identity__ : A way for storing and identifying user accounts.


## vertigo-basics [![Ready to use?](https://img.shields.io/badge/Ready%20to%20use%3F-yes-green.svg)]()
### A collection of commonly used configurations
* __Constraints__ : A set of data validation constraints.
* __Formatter__ : A set of utilities for formatting data.
* __Task__ : A set of task execution engines.


## vertigo-commons [![Ready to use?](https://img.shields.io/badge/Ready%20to%20use%3F-yes-green.svg)]()
### A suite of essential utilities

* __Codec__ : Convert objects from one format to another (built-in codecs: HTML, SHA1, Base64, Compression, Serialization).
* __EventBus__ : A simple event bus for handling application events.
* __PEG__ : A lightweight parser for your [DSL](http://en.wikipedia.org/wiki/Domain-specific_language).
* __Script__ : Execute scripts from within your code (useful for merging code and data dynamically).
* __Transaction__ : Simple transaction management.


## vertigo-database [![Ready to use?](https://img.shields.io/badge/Ready%20to%20use%3F-yes-green.svg)]()
### Simplified database access

* __SQL__ : Built-in handlers for Oracle, MSSQL, PostgreSQL, and H2.
* __TimeSeries__ : Connect to time-series databases (built-in integration for InfluxDB).
* __Migration__ : Database migration support (built-in integration for Liquibase).


## vertigo-datafactory [![Ready to use?](https://img.shields.io/badge/Ready%20to%20use%3F-yes-green.svg)]()
### Efficient data access with powerful search capabilities
* __Collections__ : Collection utilities (including full-text indexing, faceting, and filtering).
* __Search__ : A simple and efficient search API.


## vertigo-datamodel [![Ready to use?](https://img.shields.io/badge/Ready%20to%20use%3F-yes-green.svg)]()
### A streamlined approach to defining application models
* __Criteria__ : A unified API for building filters (predicates, SQL queries).
* __Task__ : Create and manage various tasks (e.g., direct database queries).
* __SmartType__ : Top-2-bottom POJOs to simplify communication between database, services, and UI.


## vertigo-datastore [![Ready to use?](https://img.shields.io/badge/Ready%20to%20use%3F-yes-green.svg)]()
### Effortless data management across multiple systems
* __Cache__ : Manage cached data (built-in integration for Ehcache, Redis, and in-memory storage).
* __File__ : Handle file creation and storage (built-in integration for databases, file systems, and S3).
* __Store__ : Simple access to the persistence layer (supports object type-based routing, CRUD operations, and many-to-many relationships).
* __KVStore__ : A key-value store (built-in integration for BerkeleyDB, Ehcache, H2, Redis, Speedb, and in-memory storage).


## vertigo-stella [![Ready to use?](https://img.shields.io/badge/Ready%20to%20use%3F-no-red.svg)]()
* __Node__ : A worker node for distributed operations.
* __Work__ : Process, schedule, or distribute tasks.


## vertigo-ui [![Ready to use?](https://img.shields.io/badge/Ready%20to%20use%3F-yes-green.svg)]()
### A bridge for using Vertigo with SpringMVC/Thymeleaf applications

Use [Vue.js](https://vuejs.org) and [Quasar](https://quasar.dev) or [DSFR](https://vue-ds.fr/) for UI development.


## vertigo-vega [![Ready to use?](https://img.shields.io/badge/Ready%20to%20use%3F-yes-green.svg)]()
### Share your applications with others

* __REST__ : Add a REST API layer to your application, optimized for production-ready Single-Page Applications with built-in security features.


## vertigo-vortex [![Ready to use?](https://img.shields.io/badge/Ready%20to%20use%3F-no-red.svg)]()
TODO

-----

## Additional note for [Eclipse](https://www.eclipse.org/) users
A plugin named [KSP Plugin](https://github.com/sebez/vertigo-chroma-kspplugin) developed by [sebez](https://github.com/sebez/) enhances the developer experience.

An official plugin, **Vertigo DSL Plugin**, is available on the Eclipse Marketplace.

# License
                vertigo - application development platform
                
                Copyright (C) 2013-2025, Vertigo.io, team@vertigo.io
                
                Licensed under the Apache License, Version 2.0 (the "License");
                you may not use this file except in compliance with the License.
                You may obtain a copy of the License at
                
                http://www.apache.org/licenses/LICENSE-2.0
                
                Unless required by applicable law or agreed to in writing, software
                distributed under the License is distributed on an "AS IS" BASIS,
                WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                See the License for the specific language governing permissions and
                limitations under the License.
