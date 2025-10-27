# **Section 3: Layered Architecture, RESTful APIs, and CORS**

This section transitions from foundational JavaScript to building a **robust, well-structured Node.js HTTP server**. We will establish the core operational components of our application, including a custom server class, the **Layered Architectural Pattern** using **Services**, a custom system for handling **RESTful API endpoints**, and, crucially, the implementation of **Cross-Origin Resource Sharing (CORS)**.

## **3.1 Creating a Class for Our Server**

Our first step is to create a dedicated **Server** class. This class abstracts the low-level concerns of the native Node.js http module, handling essential tasks like reading configuration, listening for connections, and differentiating between public asset requests and API calls.

### **3.1.1 Basic Setup and Environment Variables**

For security and deployability, we read configuration details (like the operating port) from environment variables. We use process.env.PORT and define a static mimeTypeMap to correctly serve public files.  
The core server listening logic is contained within the start() method:

JavaScript

start() {  
    http.createServer((req, res) \=\> {  
        const proto \= (req.socket.encrypted) ? 'https' : 'http'; // a little redundant but in case  
        const url \= new URL(\`${proto}://${req.headers.host}${req.url}\`);

        // API or public  
        if (url.pathname.startsWith('/api')) {  
            this.handleApi(url, req, res);  
        } else if (req.method \=== 'GET') {  
            this.handlePublic(url, req, res);  
        } else {  
            this.serverConfused(url, req, res);  
        }  
    }).listen(this.port);  
}

### **3.1.2 Serving Public Resources and Request Differentiation**

The server's callback must determine whether a request is for a static file (like index.html) or an API resource.

* If the request URL path starts with /api, it is routed to handleApi.  
* If the method is GET and the path is not /api, it is treated as a request for a static asset, routed to handlePublic.  
* All other unknown request types are handled by serverConfused.

The handlePublic method uses asynchronous file system operations (fs/promises) to read files from the /public directory. A key piece of logic involves path resolution: if a request points to a directory (ends with / or has no file extension), we automatically serve its index.html file.  
To ensure the browser correctly interprets the returned file, we use a static mimeTypeMap to set the correct Content-Type header. Errors during file reading (e.g., file not found) are caught, and a 404 response is sent via notFound.

JavaScript

// The Server Class Methods

serverConfused(reqUrl, req, res) {  
    res.writeHead(500, {  
        'Content-Type': 'text/html'  
    });  
    res.end('\<h1\>Something Went Very Wrong\</h1\>\<p\>Something went verywrong on the server.\</p\>');  
}

notFound(reqUrl, req, res) {  
    res.writeHead(404, {  
        'Content-Type': 'text/html'  
    });  
    res.end('\<h1\>404 Not Found\</h1\>\<p\>The content you are looking for could not be found. Get wrekt.\</p\>');  
}

async handlePublic(reqUrl, req, res) {  
    try {  
        const item \= (reqUrl.pathname.endsWith('/') || \!path.extname(reqUrl.pathname))  
            ? path.join(reqUrl.pathname, 'index.html')  
            : reqUrl.pathname;

        const filePath \= path.join(this.rootDir, 'public', item);

        const file \= await fs.readFile(filePath);  
        const fileExt \= path.extname(filePath).toLowerCase();

        const mime \= Server.mimeTypeMap\[fileExt\] || 'application/octet-stream';

        res.writeHead(200, { 'Content-Type': mime });  
        res.end(file);  
    } catch (err) {  
        this.notFound(reqUrl, req, res);  
    }  
}

async handleApi(reqUrl, req, res) {  
    res.writeHead(500, { 'Content-Type': 'application/json' });  
    res.end(JSON.stringify({ message: 'No API Router configured.' }));  
}

(The Server class, including the mimeTypeMap and constructor, is assumed to be fully defined.)

## **3.2 Layered Architecture and Services**

To design a system that is easily extensible, maintainable, and testable, we enforce the **Layered Architectural Pattern**. This principle divides the application into distinct, decoupled layers, ensuring that business rules and data persistence logic are separated from one another.

| Layer | Responsibility | Components |
| :---- | :---- | :---- |
| **Business Logic Layer** | Authentication, data validation, and sequencing operations (e.g., ensuring a user is logged in before saving a note). | ApiEndpoint, ApiRouter |
| **Data Access Layer** | Low-level mechanics of data persistence (e.g., performing a database query, reading/writing files). | **Services** (NoteManager, MySQLService) |

### **The Role of Services**

A **Service** provides an abstracted, controlled set of methods for interacting with a specific resource, thus forming the Data Access Layer. For example, our NoteManager service encapsulates all file system interactions, so the API layer never needs to know *how* data is stored, only *what* method to call to store it.

## **3.3 Practical Services: Logger and NoteManager**

### **3.3.1 The Logger Service**

The Logger is a crucial utility service responsible for auditing application events. It formats messages and directs them to either the console or persistent log files (info.log and error.log). This separation ensures logging logic doesn't clutter our main server or API handler files.

### **3.3.2 The NoteManager Service (Data Access Layer)**

The NoteManager is our core data access service. In this demonstration, it handles the low-level logic of creating and reading text files in a local /notes directory, thereby fulfilling the Data Access Layer's responsibility.

### **3.3.3 Defining Application Business Rules (The Scenario)**

To demonstrate the utility of our architectural layers, we establish a simple, non-negotiable **business rule** for our fictional note-taking application:

1. **Note ID Requirement:** A unique identifier (id) **must** be provided for every note. Without an ID, our system cannot correctly create, retrieve, or manage the note file. The API layer is responsible for explicitly enforcing this rule before passing the request to the NoteManager service.

## **3.4 REST Architecture: ApiEndpoint and ApiRouter**

To manage requests routed to handleApi, we implement a custom routing system that adheres to the **REST (Representational State Transfer)** standard. This involves using two classes to structure our endpoints cleanly.

### **3.4.1 The ApiEndpoint Base Class**

ApiEndpoint is a base class that all resource handlers will extend (like our upcoming NoteEndpoint). It provides default, overridable handlers for the main HTTP methods (GET, POST, etc.) and includes static utility methods (writeSuccessResponse, writeBadRequestResponse) to ensure all API responses are uniformly structured and status codes are correctly managed.

### **3.4.2 The ApiRouter Class**

The ApiRouter acts as the traffic controller for all API calls. It holds a collection of registered endpoints and is responsible for matching an incoming request's URL (e.g., /api/notes) to the correct endpoint instance (notesEndpoint). It then dynamically invokes the corresponding HTTP method handler (notesEndpoint.get()).

## **3.5 Creating an API Endpoint for Notes**

The NoteEndpoint class represents the Business Logic Layer for our note resource. It connects the external API structure to our internal NoteManager service (Data Access Layer).

### **Implementing GET (Read)**

The GET method performs the critical business logic of checking the URL query parameters for the required id and then, if valid, requests the data from the service layer.

JavaScript

// modules/rest/endpoints/notesEndpoint.js (within the get method)

async get(reqUrl, req, res) {  
    const id \= reqUrl.searchParams.get('id');

    if (\!id) {  
        // Business Rule Validation (3.3.3)  
        return ApiEndpoint.writeBadRequestResponse(res, {  
            message: 'You must specify a note \\'id\\' in the query parameters.'  
        });  
    }  
    // ... (Data access using this.noteManager.readNote(id) and response handling)  
}

### **Implementing POST (Create/Update)**

The POST method is more complex as it involves streaming data. It asynchronously collects the incoming request payload (req.on('data') and req.on('end')), parses the JSON, validates the fields (ID and content), and then uses the noteManager to persist the data to the file system.

## **3.6 Cross-Origin Resource Sharing (CORS)**

Since our client-side application will eventually be hosted on a separate domain/port (a different **origin**) from our Node.js API, we must address the issue of **Cross-Origin Resource Sharing (CORS)**.  
CORS is a security mechanism enforced by web browsers. By default, browsers prevent scripts loaded from one origin (e.g., a web client running locally) from making "cross-origin" requests to an API running on another origin (e.g., our self-hosted Node.js server). This prevents malicious sites from performing unauthorized actions.  
To explicitly grant permission for our client to communicate with our API, we must include specific HTTP response headers. We implement a dedicated addCorsHeaders method in our Server class and call it for every response:

JavaScript

// Server.js \- inside the Server class

addCorsHeaders(res) {  
    res.setHeader('Access-Control-Allow-Origin', '\*'); // Allows requests from any origin  
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');  
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');  
}

// ... (Logic in start() method)

// CORS Middleware (Applied before routing logic)  
this.addCorsHeaders(res);  
if (req.method \=== 'OPTIONS') {  
    res.writeHead(204); // Respond immediately to preflight requests  
    return res.end();  
}

The use of \* for Access-Control-Allow-Origin grants access to any domain. Furthermore, we explicitly handle the **preflight request**—an automatic OPTIONS request sent by the browser before complex methods like POST or PUT—by responding with a 204 No Content status code. This handshake is essential for allowing the client to proceed with the actual API call.