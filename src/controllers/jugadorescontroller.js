const controller={};
const { json } = require('express');
const db=require('../conexion');


controller.inscribir=(req,res)=>{

    db.query("SELECT perid FROM persona ORDER BY perid DESC LIMIT 1",(err,idperosna)=>{

        if(err){
            //si existe un erro mostrar cual es 
            res.json(err);
        }else{
            //enviar una vista
            console.log(idperosna[0].perid);
           res.render('./jugador/inscripciones',{
            //pasar los datos
            data:idperosna[0]
           });
        }
    });
    

};

module.exports=controller;