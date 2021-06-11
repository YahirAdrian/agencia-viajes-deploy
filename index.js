// const express = require('express');
import express from 'express';
import router from './server/routes/index.js';
import db from './server/config/db.js';
import dotenv from 'dotenv';
dotenv.config({path: 'variables.env'});
const app = express();

//Conectar la base de datos
db.authenticate()
    .then(()=>console.log('Base de datos conectada'))
    .catch(error=> console.log(error));

//Definir puerto
const host = process.env.HOST || '0.0.0.0';
const port  = process.env.PORT || 4000;
//nodemon index.js

//Habilitar pug
app.set('view engine', 'pug');

//Obtener el año actual
app.use((request, response, next)=>{
    const year = new Date();
    response.locals.actualYear = year.getFullYear();
    response.locals.nombreSitio = 'Agencia de Viajes';
    return next();
})

//Agregar body parser para leer los dato de formulario
app.use(express.urlencoded({extended: true}))

//Definir la carpeta publica
app.use(express.static('public'));

//Agregar Router
app.use('/',  router);

app.listen(port,host, ()=>{
    console.log(`El servidor esta funcionando en el puerto ${port}`)
})