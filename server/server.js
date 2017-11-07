/* External dependencies */
const path = require('path');

/* Create Express App */
const express = require('express');
const app = express();

/* Apply Middleware */
const userAgent = require('express-useragent');

app.use(userAgent.express());

/* Apply Router */
const compression = require('compression');

app.use(compression());
app.use('/', express.static(path.join(__dirname, '..', 'build')));

app.get('*', (req, res) => {
  res.redirect('/');
})

/* Start express app */
const http = require('http');
const httpServer = http.createServer(app);

httpServer.listen(4000);
