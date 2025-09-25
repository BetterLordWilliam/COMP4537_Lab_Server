// import express from 'express';
import http from 'http';
import fs from 'fs';
import path from 'path';

// const app = express();

// app.use(express.static('public'));

// app.listen(port, () => {
//     console.log(`Server running on ${port}`);
// });

const port = process.env.PORT || 3000;
const publicDirectory = path.normalize(path.resolve('./public'));

const contentTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    let filePath = '';
    let contentType = '';

    // So we don't need to say index.html
    if (req.url.endsWith('/')) {
        filePath = path.join(publicDirectory, req.url, 'index.html');
        contentType = contentTypes['.html'];
    } else {
        filePath = path.join(publicDirectory, req.url);
        contentType = contentTypes[path.extname(req.url)] || 'application/octet-stream';
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
});

server.listen(port, () => {
    console.log(`server running on ${port}`);
})
