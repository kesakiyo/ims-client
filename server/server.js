/* External dependencies */
const path = require('path');
const moment = require('moment');

/* Create Express App */
const express = require('express');
const app = express();

/* Set timezone */
process.env.TZ = 'Asia/Seoul';

/* Apply Middleware */
const userAgent = require('express-useragent');

app.use(userAgent.express());

/* Apply Router */
const compression = require('compression');

app.use(compression());
app.use('/', (req, res, next) => {
  const current = +moment();
  if (current < 1526223600000) {
    res.sendFile(path.join(__dirname, '..', 'build', 'expired.html'));
  } else {
    express.static(path.join(__dirname, '..', 'build'))(req, res, next);
  }
});

app.get('*', (req, res) => {
  res.redirect('/');
})

/* Start express app */
const http = require('http');
const httpServer = http.createServer(app);

const PORT = (() => {
  if (process.env.NODE_ENV === 'production') {
    return 4000;
  }
  return 4001;
})();

httpServer.listen(PORT);
