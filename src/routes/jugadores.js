const express= require('express');
const router=express.Router();
const db=require('../conexion');
const {isLoggedIn}=require('../lib/validasesion');
const jugadorescontroller= require('../controllers/jugadorescontroller');


router.get('/inscripcion',isLoggedIn,jugadorescontroller.inscribir);

//exportar rutas
module.exports=router;