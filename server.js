// import express from 'express';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { API_LIBRARY } from './modules/endpoints.js';

// const app = express();

// app.use(express.static('public'));

// app.listen(port, () => {
//     console.log(`Server running on ${port}`);
// });

class Server {
  constructor () {
    this.port             = process.env.port || 3000;
    this.publicDirectory  = path.normalize(path.resolve('./public'));
    this.publicEndpoint   = RegExp('\/COMP4537\/labs\/.*');
    this.apiEndpoint      = RegExp('\/COMP4537\/api\/.*');

    this.contentTypes     = {
      '.html': 'text/html',
      '.js': 'application/javascript',
      '.css': 'text/css',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpg',
      '.ico': 'image/x-icon'
    };
  }

  handlePublic(req, res) {
      // Basically just reverse engineering the app.use(express.statis('./whatever')
      // why did express have to be outlawed ... 😡😡😡😡😡😡

      try {
          let filePath        = '';
          let contentType     = '';

          if (req.url.endsWith('/')) {
              filePath = path.join(this.publicDirectory, req.url, 'index.html');
              contentType = this.contentTypes['.html'];
          } else {
              filePath = path.join(this.publicDirectory, req.url);
              contentType = this.contentTypes[path.extname(req.url)] || 'application/octet-stream';
          }

          fs.readFile(filePath, (err, content) => {
              if (err) {
                  res.writeHead(404, { 'Content-Type': 'text/html' });
                  res.end('<h1>404 Not found</h1><p>Such a thing does not exist.</p>');
              } else {
                  res.writeHead(200, { 'Content-Type': contentType });
                  res.end(content, 'utf-8');
              }
          });

      } catch (error) {
          res.writeHead(500, { 'Content-Type': 'text/html' });
          res.end(`<h1>500 Server Error</h1><p>I am broken.</p><p>${error.message}</p>`);
      }
  }

  handleApi(req, res) {
      try {
          let reqEndpoint = req.url.split('?')[0];
          let endpoints   = API_LIBRARY[req.method] || [];
          let match       = false;

          // Loop through all the applications endpoints and see if it matches the requests endpoint
          for (let endpoint of endpoints) {
              // console.log(`Test agaisnt endpoint: ${endpoint.endpoint}`);
              // console.log(`Incomming request: ${reqEndpoint}`);

              match = reqEndpoint.match(endpoint.regExp);

              if (match) {
                  return endpoint.handle(req, res);
              }
          }

          // No endpoint matched
          if (!match) {
              res.writeHead(404, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({
                  status: 404,
                  request: req.url,
                  error: 'no such API endpoint'
              }));
          }

      // Some error happened while processing the request
      // Dip out and display a 500
      // It be broken
      } catch (error) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
              status: 500,
              request: req.url,
              error: error.message
          }));
      }
  }

  startServer() {
    const server = http.createServer((req, res) => {
        console.log(`request for ${req.url} received.`);

        if (req.url.match(this.apiEndpoint)) {
            // console.log('This is an API request');
            this.handleApi(req, res)
            return;
        }

        // Otherwise just assume this is a public request
        // console.log('This is a public request');
        this.handlePublic(req, res);
    });

    server.listen(this.port, () => {
        console.log(`server running on ${this.port}`);
    });
  }
}

new Server().startServer();

