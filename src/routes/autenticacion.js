const express= require('express');
const authrouter=express.Router();
const passport=require('passport');
const db=require('../conexion');

const authcontroller= require('../controllers/autenticacioncontroller');


authrouter.get('/iniciosesion',authcontroller.iniciosesion);
authrouter.post('/iniciosesion',authcontroller.ingresar);
authrouter.get('/cerrarsesion',authcontroller.cerrarsesion);

authrouter.get('/registrar',authcontroller.registrousuario);
authrouter.post('/registrar',authcontroller.registrar);



//exportar rutas
module.exports=authrouter;
