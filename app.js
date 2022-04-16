const express = require('express');
const apiRouter = require('./routes/api/v1/index');
const schedulerFunct = require('./scheduler');
const app = express();
const port = process.env.PORT || 3000;
var bodyParser = require('body-parser');


app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use('/api/v1', apiRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  schedulerFunct.scheduler();
});


