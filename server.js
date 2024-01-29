// server.js
const express = require('express');
const app = express();
const port = 3000;

// Object to store the visited IP addresses and their timestamps
const visitedData = {};

// Middleware to log the IP address and timestamp of the visitor
app.use((req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress;
    if (!visitedData[ip]) {
        visitedData[ip] = { timestamp: Date.now(), totalTime: 0 };
    }
    next();
});

// Middleware to handle the leave signal and update the total time spent
app.post('/leave', express.raw({ type: 'application/json' }), (req, res) => {
    const ip = req.ip || req.connection.remoteAddress;
    const currentTime = Date.now();
    if (visitedData[ip]) {
        visitedData[ip].totalTime += Math.floor((currentTime - visitedData[ip].timestamp) / 1000);
        delete visitedData[ip];
    }
    res.status(204).end();
});

app.use(express.static('public'));

app.get('/', (req, res) => {
    // Display the list of visited IP addresses with time spent on the home page
    const currentTime = Date.now();
    res.send(`
        <h1>Welcome to my website!</h1>
        <h2>Visited IP Addresses:</h2>
        <table>
            <thead>
                <tr>
                    <th>IP Address</th>
                    <th>Time Spent (seconds)</th>
                </tr>
            </thead>
            <tbody>
                ${Object.keys(visitedData).map(ip => {
                    const { timestamp, totalTime } = visitedData[ip];
                    const timeSpentSeconds = Math.floor((currentTime - timestamp) / 1000);
                    return `<tr><td>${ip}</td><td>${timeSpentSeconds}</td></tr>`;
                }).join('')}
            </tbody>
        </table>
        <script src="index.js"></script>
    `);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
