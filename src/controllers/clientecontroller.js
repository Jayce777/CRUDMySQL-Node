const controller={};
const { json } = require('express');
const db=require('../conexion');

controller.listar=(req,res)=>{
    //obtener una conexión
    
        db.query("SELECT * from cliente",(err,clientes)=>{

            if(err){
                //si existe un error mostrar cual es 
                res.json(err);
            }else{

              
                    res.render('./datosclientes/clientes',{
                        //pasar los datos
                        data:clientes
                        //user:JSON.stringify(req.session)
                      });
               
                //enviar una vista
             
            }

        });
};

controller.obtenercliente=(req,res)=>{
    //obtener una conexión
    const idmod=req.params.cliid;
    console.log(idmod);
        db.query("SELECT * from cliente WHERE cliid=?",[idmod],(err,clientemod)=>{

            if(err){
                //si existe un erro mostrar cual es 
                res.json(err);
            }else{
                //enviar una vista
                console.log(clientemod);
               res.render('./datosclientes/editarcliente',{
                //pasar los datos
                data:clientemod[0]
               });
            }

        });

};

controller.agregar=(req,res)=>{
    //obtener una conexión
   const data=req.body;
   console.log(data);
               db.query("INSERT INTO cliente set ?",[data],(err,cliente)=>{

             if(err){
                 //si existe un erro mostrar cual es 
                 res.json(err);
                }else{
                 console.log(cliente);
                  //redirecciona a la ruta inicial del servidor
                  req.flash('success','Usuario creado correctamente');
                  res.redirect('./listar');
                }
      
             });
        
   
};


controller.eliminar=(req,res)=>{
    //obtener una conexión
   
    //params obtene los datos enviados por get 
   const id=req.params.cliid;
   console.log(id);
    db.query("DELETE FROM  cliente WHERE cliid= ?",[id],(err,cliente)=>{

     if(err){
         //si existe un erro mostrar cual es 
         res.json(err);
        }else{
         console.log(cliente);
          //redirecciona a la ruta inicial del servidor
          res.redirect('../listar');
        }

     });

     
};


controller.modificar=(req,res)=>{
    //obtener una conexión
   
    //params obtene los datos enviados por get 
   const id=req.params.cliid;
   const nuevocliente=req.body;
   console.log(id);
  // res.send('modificado '+id);
    db.query("UPDATE cliente SET ? WHERE cliid= ?",[nuevocliente,id],(err,cliente)=>{

     if(err){
         //si existe un erro mostrar cual es 
         res.json(err);
        }else{
         console.log(cliente);
          //redirecciona a la ruta inicial del servidor
          res.redirect('../listar');
        } 
});
};

//exportar controlador
module.exports=controller;
