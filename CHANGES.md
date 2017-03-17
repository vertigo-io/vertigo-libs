Version history
===============

Running 0.9.5-SNAPSHOT
----------------------

more to come :)



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
