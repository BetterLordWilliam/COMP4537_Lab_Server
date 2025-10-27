# **Zero to Self-Hosted Node**

You've successfully mastered the fundamentals of web development: **HTML**, **CSS**, and **JavaScript**. This is a significant first step, but it raises the crucial question for any aspiring developer:  
**How does one translate these front-end skills into a fully functional, production-ready piece of software?**  
This question forms the core objective of this blog series. We will walk you through the process of building and deploying a custom back-end application, concluding with a fully operational, **self-hosted Node.js HTTP server** running on an **Oracle Cloud Virtual Machine (VM)**.

## **Series Roadmap**

### **Part 1 & 2: Revisiting the JavaScript Core**

We will begin by establishing a solid foundation. These sections cover the often-overlooked technicalities of the language:

* A review of the **modern syntax** for **Object-Oriented Programming (OOP)**, including classes and modules, alongside standard project initialization using **npm**.  
* An exploration of **JavaScript's single-threaded design** and how **asynchronous programming** is achieved through mechanisms like **Promises** and the **Event Loop**.

---

### **Part 3: Architecture and API Development**

This is where we build the engine of our application. We will implement key engineering practices:

* We will adopt the **layered architectural pattern** (also known as the **services pattern**) to ensure a clean separation of concerns.  
* We will design a custom routing system using **ApiRouter** and **ApiEndpoint** classes to define structured **RESTful API endpoints**.  
* We will develop a service layer that will **persist data in files on the machine**, exposing its functionality via our API. To demonstrate full-stack connectivity, we will create a simple client-side application to consume these endpoints.

---

### **Part 4: Acquisition and Deployment**

Finally, we transition to deployment. This section guides you through the process of taking your code to a live server:

* Acquiring and configuring a **Linux Virtual Machine** on **Oracle Cloud**.  
* The steps required to deploy and run your complete Node.js application, effectively moving from zero to a self-hosted environment.

---

With the necessary context established, let's begin the technical journey.