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
* [Quarto] Upgraded poi version from 3.14 to 3.15 and xdocreport from 1.0.5 to 1.0.6
* [Quarto] PublisherNode is no longer a definition


Release 0.9.3 - 2016/10/11
----------------------
[Migration help](https://github.com/KleeGroup/vertigo/wiki/Vertigo-Migration-Guide#from-093-to-094)

__In Bold__ : Potential compatibility problems 
* [All] Code cleaning, refactoring and documenting
* [All] to JDK 1.8
* [Quarto] Removed stax which comes with java 1.6
* [Quarto] Fixed DtObject without pk
* [Quarto] Fixed tests : Denorm list must have an IdField
* [Quarto] Moved ExportManager from io.vertigo.dynamo to io.vertigo.quarto



Release 0.9.2 - 2016/06/28
----------------------
[Migration help](https://github.com/KleeGroup/vertigo/wiki/Vertigo-Migration-Guide#from-091-to-092)

__In Bold__ : Potential compatibility problems 
* [All] Code cleaning, refactoring and documenting
* [Quarto] Fixed duplicate initialization
* [Quarto] Fixed docx tags for better compatibility (w:InstrText to w:t)
* [Quarto] Added docx converter with XDocReport
* [Quarto] Upgrade vertigo (9.2) and other libs version (poi, openoffice)



Release 0.9.1 - 2016/02/05
----------------------
