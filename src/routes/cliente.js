const express= require('express');
const router=express.Router();
const db=require('../conexion');
const {isLoggedIn}=require('../lib/validasesion');
const clientecontroller= require('../controllers/clientecontroller');

router.get('/listar',isLoggedIn,clientecontroller.listar);
router.post('/agregar',isLoggedIn,clientecontroller.agregar);
router.get('/eliminar/:cliid',isLoggedIn,clientecontroller.eliminar);
router.get('/modificar/:cliid',isLoggedIn,clientecontroller.obtenercliente);
router.post('/modificar/:cliid',isLoggedIn,clientecontroller.modificar);

//exportar rutas
module.exports=router;