// httpServer.js
const http = require('http');
const fs = require('fs');

// Read questions from a JSON file
let questionsData;
let questions; 

function readQuestions(){
    questionsData = fs.readFileSync('../data/questions.json', 'utf8');
    questions = JSON.parse(questionsData);
}

// Create a simple HTTP server
const server = http.createServer((req, res) => {
  // Set CORS headers to allow requests from any origin
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  if (req.url === '/questions' && req.method === 'GET') {
    readQuestions();
    // Serve the questions endpoint
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(questions));
  } else {
    // Serve other requests
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }

  // Log the request method and URL to the console
  console.log(`${req.method} ${req.url}`);
});

// Set the port on which the server will listen
const port = 3000;

// Start the server and listen on the specified port
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});