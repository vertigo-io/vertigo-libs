Version history
===============

Running 2.0.0-SNAPSHOT
----------------------

more to come :)

Release 1.1.0 - 2017/12/07
----------------------
[Migration help](https://github.com/KleeGroup/vertigo/wiki/Vertigo-Migration-Guide#from-100-to-110)

* [dashboard] added module dashboard (bêta)
* [struts2] Added multiple file upload support 
* [quarto] Fixed #12 (LocalDate and DateTime) 
* [all] Updated versions (javax.mail, lucene, selenium) : javaxmail 15.6 to 1.6.0, lucene 5.5.4 to 6.6.1

Release 1.0.0 - 2017/07/07
----------------------
[Migration help](https://github.com/KleeGroup/vertigo/wiki/Vertigo-Migration-Guide#from-094-to-100)

__In Bold__ : Potential compatibility problems 

* [All] Code cleaning, refactoring and documenting 
*	[all] remove x in modules names
* [all] one extensions -> one maven module
* [all] all extensions have the same structure
*	[quarto] Fixed #6
*	[struts2] Added test tag label
* [orchestra] remove unnecessary logger
* [orchestra] move module in extensions
* [orchestra] addded a simple fallback for migration from removed _tempo_ (ProcessDefinition.legacyBuilder)
* [orchestra] fix bug in memory impl
*	[orchestra] bug fix (for update for planif)
*	[orchestra] bug fix (multiple planif) 
*	[orchestra] Fixed activities reservation : only waiting
*	[orchestra] Fixed some pb (reserve already reserved activities, lock )
*	[orchestra] Added MultiNode executors tests
* [workflow] Moving definitions and mda in io/vertigo/workflow
*	[workflow] remove x in all names
* [rules] Moving definitions and mda in io/vertigo/rules
*	[rules] remove x in all names
*	[social] Added notifications TTL support. With cleaner daemon and tests
* [social] Notifications Fixed queue order
*	[social] move redis-conntector to vertigo-commons
* [social] created new module to bundle comment, notification and more to come
*	[social] Fixed notifications Redis TTL 
*	[mail] move tempo/mail into vertigo-mail
* [stella] general refactoring (simpler + java8 primitives + master/worker) 
* [notification] moved to social
* [comment] moved to social


* [All] Updated dependencies versions
  org.assertj assertj-core 2.5.0 -> 3.8.0
  com.sun.mail javax.mail 1.5.5 -> 1.5.6
  com.h2database h2 1.4.193 -> 1.4.196
  io.rest-assured rest-assured 3.0.1 -> 3.0.3
  org.apache.poi poi 3.15 -> 3.16
  fr.opensagres.xdocreport * 1.0.6 -> 2.0.1
  com.google.code.gson gson 1.7 -> 2.8.1
  org.glassfish.jersey.core jersey-client 2.22.2 -> 2.25.1
  org.eclipse.jetty * 9.3.6.v20151106 -> 9.4.6.v20170531
  org.apache.lucene * 5.5.0 -> 5.5.4
  org.slf4j slf4j-log4j12 1.7.21 -> 1.7.25
  org.seleniumhq.selenium * 2.53.1 -> 3.4.0
  com.machinepublishers jbrowserdriver 0.17.3 -> 0.17.8
  commons-io commons-io 2.4 -> 2.5



Release 0.9.4 - 2017/03/13
----------------------
[Migration help](https://github.com/KleeGroup/vertigo/wiki/Vertigo-Migration-Guide#from-093-to-094)

__In Bold__ : Potential compatibility problems 
* [All] Code cleaning, refactoring and documenting (and Stream java8, Optionnal, Methods refs, ...)
* [All] Always use WrappedException (wrap & unwrap), and params order changed
* [All] Updating Workflow, Rules, Audit, Account with the latest sources from Kinetix
* [All] Moved impl package into extension's root package
* __[All] Renamed 	vertigo-x-parent==> vertigo-extensions__
* [WF] Added oom, crebase and DAO for WfEntities
* [WF] Refactored vertigo-x-workflow, many updates, tests and fixes
* [Account] fixed multi accounts with the same id
* [Notif] fixed multi notifs withe the same id
* [Notif] Standardization of Notification Center between Kinetix and Vertigo. Send Notification to a group is now deprecated. Please use send to a set of users instead.
* [Notif] Added Ws to remove many notifications
* __[Notif] Refactored Ws routes__
* __[All] Refactored structures. Rename xxxManager to xxxService__. Extension are little app so WebServices, Services, DAO.



Release 0.9.3 - 2016/10/11
----------------------

__In Bold__ : Potential compatibility problems 
* [All] Updated to vertigo 0.9.3
* [All] Fixed URI and persistence on Data/Entity objects
* [All] Updated to java 8
* [Audit] Initial release for vertigo-x-audit
* [Workflow] Initial release for vertigo-x-workflow
* [Rules] Initial release for vertigo-x-rules
* [All] Updated jedis


Release 0.9.2 - 2016/07/04
----------------------

__In Bold__ : Potential compatibility problems 
* [All] Updated to vertigo 0.9.2


Release 0.9.1 - 2016/02/08
----------------------

__In Bold__ : Potential compatibility problems 
* [All] Updated to vertigo 0.9.1


Release 0.9.0 - 2016/02/08
----------------------

__In Bold__ : Potential compatibility problems 
* [All] Code cleaning, refactoring and documentations
* [All] Updated to vertigo 0.9.0
* [Comment] Updated manager api : loggedUser is resolved in WebService not in Manager
* [Connector] Upgraded jedis to 2.8.0
* [Connector] Added redis database on RedisConnector
* [Connector] Merge pull request #3
