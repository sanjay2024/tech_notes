---
title: UML - Class Diagrams
draft: false
tags:
  - DesignPattern
---
 
The rest of your content lives here. You can use **Markdown** here :)
1. UML class notations
2. perspectives of the class diagram
3. relationship between classess

## Class Representations

* Class Name - TOP 
* Attributes - Middle
* Methods/operations - Bottom

## Class Visibility

* Public (+)
* private (-)
* protected (#)
* package (~)

## Relationships of class 

1. Association -> (uses-a)
2. aggregation - (Has-a) (weak coupling)
3. composition - (Has-a) (tight coupling)
4. reliazation (implementation)
5. dependecy -( uses)

Association:  A -------- B
Aggregation:  Library ◇------ Book
Composition:  House ◆------ Room
Realization:  Dog --------▷ Animal (interface)
Dependency:   Car - - - - - - > Engine
