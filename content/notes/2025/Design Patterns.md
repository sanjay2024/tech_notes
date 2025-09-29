---
title: Design Patterns
draft: false
tags:
  - DesignPattern
---
 
The rest of your content lives here. You can use **Markdown** here :)
## Definition:
* There are proven solution for proven recurring desgin problems , they are not code , rather than just good practices for reusable abstraction

## Types of design patterns (23 Patterns)

1. Creational Pattern (5)
2. Structural Pattern (7)
3. Behavioural Pattern (11)


## Creational Pattern

They deal with Object Creation Mechanisim

1. Singleton Pattern
2. Factory Pattern
3. Abstract pattern
4. Builder Pattern
5. Prototype Pattern


## Structural Design Patterns

**Structural design patterns** deal with how **classes and objects are composed** to form larger, more complex structures while keeping them **flexible and efficient**.

## Behavioural Pattern
Where this pattern works with behaviour between the objects



## Singletone Pattern

It is used manage the single instance all over the application, example mongoose instance , where the mongo connection is presist for all the mongose import 

## Does it is thread safety? 

If you create the instance during , then it will  be thread safety, because your creating the instance during the class loading 
```java
package DesignPattern.CreationalPattern;

  

// Lazy Loading - because the object creation happend after the class loading. It is not thread safe

// class Mongoose {

// private static Mongoose instance;

// int counter = 0;

  

// private Mongoose(){

// }

  

// public static Mongoose getMongooseInstance(){

// if(instance == null)

// instance = new Mongoose();

// return instance;

// }

  

// public int getCount(){

// return this.counter;

// }

  

// public void incrementCounter(){

// this.counter++;

// }

// }

  
  

//Eager Loading It is thread safe because the Object creation happens during the class loading;

class Mongoose {

private static Mongoose instance = new Mongoose();

int counter = 0;

  

private Mongoose(){

}

  

public static Mongoose getMongooseInstance(){

return instance;

}

  

public int getCount(){

return this.counter;

}

  

public void incrementCounter(){

this.counter++;

}

}

  

public class SingleTon {

public static void main(String[] args) {

	Mongoose mongoose = Mongoose.getMongooseInstance();
	
	mongoose.incrementCounter();
	
	mongoose.incrementCounter();
	
	  
	
	System.out.println("Counter for Mongoose Instance "+ mongoose.counter);
	
	  
	
	Mongoose mongoose2 = Mongoose.getMongooseInstance();
	
	  
	
	mongoose2.incrementCounter();
	
	mongoose2.incrementCounter();
	
	  
	
	System.out.println("Counter for Mongoose Instance2 "+ mongoose2.counter);

}

}
```


Suppose if you create the single instance during the execution then the thread is not safe, you want to handle it mannualy by these methods

1. using synchronize keyword where it ensures thread safety
2. double check locking
