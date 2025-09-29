---
title: LLD (Low Level Design)
draft: false
tags:
  - LLD
  - DesignPattern
---
 
The rest of your content lives here. You can use **Markdown** here :)
## What is OOPS ?
OOP's stands for object oriented programming language , it is programming paradigm , where the code is written based on the objects , it contains methods and properties

## What is class and objects ?

Class is the bluebrint , to create Object where it does not take any space in memory,
Object is the instance of the class

### **1. Encapsulation**

**Definition:** Encapsulation is the process of bundling data (variables) and methods (functions) into a single unit (class) and restricting direct access to some components using access modifiers.

👉 Example: Declaring class variables as `private` and exposing them via `getters` and `setters`.

---

### **2. Abstraction**

**Definition:** Abstraction is the process of hiding implementation details and exposing only the essential features to the user.

👉 Example: When you call `.sort()` on a list, you don’t know the internal algorithm, you just know it sorts.

---

### **3. Inheritance**

**Definition:** Inheritance is a mechanism where one class (child/derived class) acquires the properties and behaviors of another class (parent/base class), promoting reusability.

👉 Example: `class Dog extends Animal` → Dog inherits properties and methods from Animal.

---

### **4. Polymorphism**

**Definition:** Polymorphism means “many forms.” It allows the same method or operator to behave differently based on the object it is acting upon.

👉 Example:

- **Compile-time polymorphism (Method Overloading):** Same method name, different parameters.
    
- **Runtime polymorphism (Method Overriding):** Subclass provides a specific implementation of a method already defined in its parent class.
    

---

💡 **Super-short version (if interviewer asks quick):**

- **Encapsulation:** Binding data + methods, restrict access.
    
- **Abstraction:** Show essential, hide details.
    
- **Inheritance:** Acquire properties from parent.
    
- **Polymorphism:** One interface, many implementations.


  
# OOP Relationships

  

In Object-Oriented Programming (OOP), classes and objects often interact with each other. These interactions are represented by **relationships**.

  

---

## 1. Association

**Definition**:

A "uses-a" relationship between two classes. Both objects can exist independently.

  

**Example (Java):**

```java

class Student {

String name;

}

  

class Course {

String title;

}

  

// A student enrolls in a course → Association

class Enrollment {

Student student;

Course course;

}

```

  

---

  

## 2. Aggregation

**Definition**:

A **“Has-a” relationship**, but with **weak ownership**. Represented as a **hollow diamond** in UML.

  

**Example (Java):**

```java

class Department {

String name;

}

  

class University {

String name;

List<Department> departments; // Aggregation

}

```

  

---

  

## 3. Composition

**Definition**:

A **“Has-a” relationship** with **strong ownership**. Represented as a **filled diamond** in UML.

  

**Example (Java):**

```java

class Engine {

String type;

}

  

class Car {

Engine engine; // Composition

Car() {

engine = new Engine(); // Created inside Car

}

}

```

  

---

  

## 4. Inheritance

**Definition**:

An **“Is-a” relationship**. One class inherits properties and behavior from another.

  

**Example (Java):**

```java

class Vehicle {

void start() {

System.out.println("Vehicle starts");

}

}

  

class Car extends Vehicle { // Inheritance

void drive() {

System.out.println("Car is driving");

}

}

```

  

---

  

## 5. Dependency

**Definition**:

A **"uses" relationship** where one class depends on another to function temporarily.

  

**Example (Java):**

```java

class Printer {

void print(String message) {

System.out.println(message);

}

}

  

class Report {

void generateReport(Printer printer) { // Dependency

printer.print("Report generated");

}

}

```

  

---

  

## ✅ Summary Table

  

| Relationship | Meaning | Example | Independence |

|---------------|----------------|---------------------|--------------|

| Association | Uses-a | Student ↔ Course | Independent |

| Aggregation | Has-a (weak) | University–Dept. | Independent |

| Composition | Has-a (strong) | Car–Engine | Dependent |

| Inheritance | Is-a | Car–Vehicle | Independent but related |

| Dependency | Uses temporarily | Report–Printer | Temporary |

  

---


## SOLID PRINCIPLE

## S - Single Responsiblity  Principle 
  where the class should have the single responsibility and one reason to change the object 
```java
class Logger {
     private String path;
     File file;

	 Logger(String path){
	   this.File = new File()
	 }

	 Log(message){
	 }
}
```

here the Logger will have the single responsiblity
## O - Open/Close Principle
where the class will open for extension and closed for modification

```java
  interface Shape{
       public void draw();
  }

  class Circle implements Shape{
      public void draw(){
         System.out.println("Drawing a circle.....");
      }
  }
```


## L - Liskova Substitution Prinicple

where the subtype can be substituted to their base type without affecting the correctness of the program

```java 
// class that doesn't follow this principle

class Bird {
    public void fly(){
       System.out.println("The Birds are flying! .... ");
    }
}


class Sparrow extends Bird {
    @override
	public void fly(){
       System.out.println("Sparrow is flying! .... ");
    }
}

class Penguine extends Bird {
	@override
	public void fly(){
       throws Expection("Penguine does not fly");
    }
}

class Main {
  public static void main(String arg[]){
      Sparrow sp = new Sparrow();
      sp.fly();
      
	  Penguine pq = new Penguine();
	  pq.fly() // This is will throws an exception will throws the exceptions
  }
}
```

Followed Version

```java

interface Flyable {
  public void fly();
}

class Bird {
   public void eat(){
       System.out.println("Birds will eat !!! ");
   }
}

class Sparrow extends Bird implements Flyable {
	public void fly(){
       System.out.println("Sparrow is flying! .... ");
    }
}

class Penguine extends Bird {
}

class Main {
  public static void main(String arg[]){
      Sparrow sp = new Sparrow();
      sp.fly();
      
	  Penguine pq = new Penguine();
	  pq.fly()
  }
}
```


## I - Interface Segregation Principle 

Interface should not force the subclass to implement the method which is not need

## D - Dependcy Inversion Principle

DI prinicpal states that the object receive their dependcy from the external source rather than creating internally 

