# **Section 2: Project Setup, OOP, and Modern Modules**

Now that we've covered the core technicalities of JavaScript, it's time to establish a structured project environment using modern syntax for **Object-Oriented Programming (OOP)** and **Modules (ESM)**. This structure is foundational for building a maintainable, self-hosted application.

## **Prerequisites**

We assume you have:

* **Node.js** installed (which includes the Node.js runtime).  
* **npm** (Node Package Manager) installed.  
* A **shell environment** (PowerShell, Git Bash, or Linux/macOS terminal) to run commands.

---

## **Initial Project Setup with Node and npm**

We begin by initializing our project to take advantage of npm's package management capabilities and to configure it for the modern module system.

1. **Create the Project Directory:**  
   Bash  
   mkdir node-self-host  
   cd node-self-host

2. **Initialize the Project:** Run the npm init command.  
   Bash  
   npm init

   For the prompts, you can accept most of the defaults. However, it is **critical** to set the module type to **module** instead of the legacy commonjs when prompted, or by manually editing the resulting file.

Your final package.json file should look similar to this, ensuring the "type": "module" entry is present:

JSON

{  
  "name": "node-self-host",  
  "version": "1.0.0",  
  "description": "Walkthrough project for self-hosting Node.js.",  
  "main": "index.js",  
  "scripts": {  
    "start": "node index.js",  
    "test": "echo \\"Error: no test specified\\" && exit 1"  
  },  
  "type": "module",  
  "author": "",  
  "license": "ISC"  
}

**Note:** We've added a simple "start" script to show how you would launch the application using npm run start, though running node index.js directly is just as valid for now.  
---

## **JavaScript Classes: Modern OOP Syntax**

JavaScript's **class** syntax provides a clear, familiar structure for defining objects, closely resembling languages like Java or C\#. Classes are the primary unit of organization for our business logic.

### **Anatomy of a Class**

Classes support both **instance** and **static** members:

* **Instance Members** are specific to each object created from the class (accessed via this in the constructor).  
* **Static Members** belong to the class definition itself, not a specific instance. They are ideal for utility functions or constants.

JavaScript

class MathUtility {  
  // Static Properties (Constants)  
  static PI \= 3.14159;  
  static E \= 2.718;

  constructor(name) {  
    // Instance Property, set in the constructor  
    this.name \= name;  
  }

  // Instance Method (requires an instance to call)  
  getInstanceName() {  
    console.log(\`This is an instance named: ${this.name}\`);  
  }

  // Static Methods (called directly on the class)  
  static areaOfCircle(r) {  
    // Static methods must access static properties using the class name  
    return MathUtility.PI \* r \* r;  
  }

  static circumference(r) {  
    return 2 \* MathUtility.PI \* r;  
  }  
}

// Accessing Static Members  
console.log(MathUtility.PI);          // Output: 3.14159  
console.log(MathUtility.areaOfCircle(2));

// Accessing Instance Members  
let myCalc \= new MathUtility('My Calculator');  
myCalc.getInstanceName(); // Output: This is an instance named: My Calculator

### **Encapsulation and Private Fields**

While all class members are public by default, modern JavaScript provides support for **true private fields** using the \# prefix. While not strictly required, using private fields is best practice for true encapsulation and signals to other developers that certain members should not be modified externally.

JavaScript

class BankAccount {  
  \#balance; // This field is truly private

  constructor(initialDeposit) {  
    this.\#balance \= initialDeposit;  
  }  
    
  // Public method to safely access the private field  
  getBalance() {  
    return this.\#balance;  
  }  
}

---

## **JavaScript Modules (ESM)**

In a large application, we must follow the **Single Responsibility Principle** (SRP)—one class per file is a common guideline. **ECMAScript Modules (ESM)** are the modern, standard way to manage code dependencies across files.

### **Exporting Members**

You have two primary methods for exposing code from a file (module):

#### **1\. Named Exports (export)**

You can export multiple symbols (classes, functions, variables) from a single file. The names must be imported exactly as they are exported.  
**modules/math.js**

JavaScript

export class MathUtility { /\* ... class definition ... \*/ }

export function addition(a, b) {  
  return a \+ b;  
}

#### **2\. Default Export (export default)**

You can only have one default export per file. The advantage is that the importing module can choose **any name** for the imported symbol, which can be convenient but may lead to inconsistency.  
**modules/calculator.js**

JavaScript

export default class Calculator { /\* ... class definition ... \*/ }

### **Importing Members**

The syntax for importing depends on how the symbol was exported:

JavaScript

// index.js

// 1\. Importing Named Exports (must use the exact names and curly braces)  
import { MathUtility, addition } from './modules/math.js';

// 2\. Importing a Default Export (can be given any name)  
import MyCalculator from './modules/calculator.js';

console.log(addition(5, 7));  
let m \= new MathUtility('Basic Math');

ESM syntax provides the clean, explicit dependency management needed for scalable applications, and it is the standard for both Node.js (server-side) and browser (client-side) JavaScript.