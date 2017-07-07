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
* __[Vega/Struts2] Merged similarity between Struts2 and Vega, now Struts2 uses Vega to limit
* [Struts2] Renamed getStringValue as getInputValue
* [Struts2] exclude javassit conflct with java8 for reflections
* [Struts2] Added Junit tests on a test application, with some components (input, select, button, autocomplete, ...)
* [Struts2] Added test radio on contextMdl
* [Struts2] Added ContextVFile and tests
* [Struts2] Removed unnecessary equals and hashcode : use native objet equals and hashcode
* [Struts2] Mark context as dirty if userException and garbage it. Page keep old context id. <= fix case of updated context reused with userException
* [Struts2] Fixed missing td in layout table at end tag
* [Struts2] Fixed submitTag colspan parameter
* [Struts2] Added Ajax updates (should use CropHtmlFilter and <sj:submit>)
* [Struts2] Upgrade Struts2 from 2.3.28.1 to 2.5.10.1
* [Struts2] Upgrade Struts2 : added <v:div> tag for layout table support (struts2 remove previous s:div tag)
* [Struts2] Upgrade Struts2 : Fixed parentTheme don't take xhtml theme
* [Struts2] Upgrade Struts2 : methods can't be prefixed by do* anymore
* [Struts2] Upgrade Struts2 : need new dtd and strict-method-invocation false on package tag
* [Struts2] Removed tr td from hidden tag
* [Struts2] Supported tooltip on tag <s:a>



Release 0.9.3 - 2016/10/11
----------------------
[Migration help](https://github.com/KleeGroup/vertigo/wiki/Vertigo-Migration-Guide#from-092-to-093)

__In Bold__ : Potential compatibility problems 
* [All] Code cleaning, refactoring and documenting
* [Struts2] Fixed checkbox without label



Release 0.9.2 - 2016/06/28
----------------------
[Migration help](https://github.com/KleeGroup/vertigo/wiki/Vertigo-Migration-Guide#from-091-to-092)

__In Bold__ : Potential compatibility problems 
* [All] Code cleaning, refactoring and documenting
*  [Struts2] Fixed #3 : delete cache element in tx
* __[Struts2] Upgrade vertigo (9.2) and other libs version (struts 2.3.28.1)__
* [Struts2] Fixed #4 fully implements of indexOf in UiListUnmodifiable



Release 0.9.1 - 2016/02/05
----------------------
[Migration help](https://github.com/KleeGroup/vertigo/wiki/Vertigo-Migration-Guide#from-090-to-091)

__In Bold__ : Potential compatibility problems 
* [All] Code cleaning, refactoring and documenting
* [Struts2] Refactored cache config and renamed FieldType Primarykey to ID
* [Struts2] Moved EhCachePlugin to vertigo-commons
* [Struts2] Fixed deamon issue
* [Struts2] Update to servlet 3.1.0  
* [Struts2] Code style

