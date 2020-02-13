const express = require('express');
const os = require('os');
const cors = require('cors');
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('dist'));
app.get('/api', (req, res) => res.send('Hi'));

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
