const express= require('express');
const router=express.Router();
const db=require('../conexion');
const {isLoggedIn}=require('../lib/validasesion');

router.get('/principal',isLoggedIn,(req,res)=>{

res.render('./principal');

});

//exportar rutas
module.exports=router;