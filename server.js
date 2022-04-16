const express = require('express');
const serv= express();
var bodyParser = require('body-parser')
const pg = require('pg');

const pool = new pg.Pool({
user: 'postgres',
host: 'localhost',
database: 'ubereats',
password: 'dinoclier', // à modifier
port: 5432
});

var entrees;
var pizzas;
var boissons;

pool.connect();
pool.query("SELECT * FROM entrees",(err,res)=>{
    if(!err){
        entrees = res.rows;
    }
    else{
        console.log(console.error);
    }
})

pool.query("SELECT * FROM pizzas",(err,res)=>{
    if(!err){
        pizzas = res.rows;
    }
    else{
        console.log(console.error);
    }
})

pool.query("SELECT * FROM boissons",(err,res)=>{
    if(!err){
        boissons = res.rows;
    }
    else{
        console.log(console.error);
    }
    
})
pool.end;

serv.use(express.static('.'));
serv.use(bodyParser.json());
serv.use(bodyParser.urlencoded());

serv.get('/',function (req,res) {
    res.render("Main.ejs",{entrees:entrees,boissons:boissons,pizzas:pizzas});
});

serv.post('/',function (req,res) {
    res.render("Main.ejs",{entrees:entrees,boissons:boissons,pizzas:pizzas});
    console.log(req.body);
});
 
serv.listen(8080);

console.log("The server is now running at http://localhost:8080");