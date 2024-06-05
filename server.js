require('dotenv').config();

const express = require('express');
const mysql = require('mysql')
const cors = require('cors');
const path = require('path');


const app = express();
app.use(cors());

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Database Server: ${process.env.SERVER}`);
    console.log(`Database User: ${config.user}`);
    console.log(`Database User: ${process.env.DATABASE}`);
});

var sql = require("mssql");

const config = {
    user: 'VergAdmin',
    password: process.env.PASSWORD,
    server: process.env.SERVER,
    port: parseInt(process.env.DBPORT, 10), 
    database: process.env.DATABASE,
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    },
    options: {
      encrypt: true, // for azure
      trustServerCertificate: true // change to true for local dev / self-signed certs
    }
}