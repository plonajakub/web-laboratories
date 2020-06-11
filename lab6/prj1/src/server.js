const http = require('http');
const os = require('os');
const fs = require('fs');
const moment = require('moment');
const oneLinerJoke = require('one-liner-joke');

http.createServer(function (req, res) {
    const endpoint = req.url;
    if (endpoint === '/ping') {
        getPing(req, res);
    } else if (endpoint === '/datetime') {
        getDateTime(req, res);
    } else if (endpoint === '/cpus') {
        getCpus(req, res);
    } else if (endpoint === '/env') {
        getEnv(req, res);
    } else if (endpoint === '/joke') {
        getJoke(req, res);
    } else if (endpoint === '/somedata') {
        getSomeData(req, res);
    } else {
        res.writeHead(404);
        res.write('404: CONTENT NOT FOUND');
        res.end();
    }
}).listen(8088);

function getPing(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('pong');
    res.end();
}

function getDateTime(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write(moment().format('MMMM Do YYYY, h:mm:ss a'));
    res.end();
}

function getCpus(req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(os.cpus()));
    res.end();
}

function getEnv(req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(process.env));
    res.end();
}

function getJoke(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write(oneLinerJoke.getRandomJoke().body);
    res.end();
}

function getSomeData(req, res) {
    fs.readFile('./assets/data.json', (err, data) => {
        if (err) {
            res.writeHead(500);
            res.write('Error while reading the file');
            res.end();
            console.error(err);
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(data);
            res.end();
        }
    });
}