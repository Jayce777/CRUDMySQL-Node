const express= require('express');
const cookieparser= require('cookie-parser');
const path = require('path');

const morgan = require('morgan');
const myconnection= require('express-myconnection');
const passport=require('passport');
const flash =require('connect-flash');
const session=require('express-session');
const mysqlstore=require('express-mysql-session');

const {database}=require('./datosconexion');
const app= express();
require('./lib/passport');

//-----------------importar rutas-------------------------//
const clienteroutes= require('./routes/cliente');
const autenticactionroutes=require('./routes/autenticacion');
const principalroutes=require('./routes/principal');
const jugadoresroutes=require('./routes/jugadores');

//-----------------fin importar rutas----------------------//


//---------------configuraciones-----------------------//
//puerto
app.set('port',process.env.PORT ||8082);
//instaciar ejs en las vistas
app.set('view engine','ejs');  
//contactenar directiorio mas nombre de la vista     
app.set('views',path.join(__dirname,'views'));
//---------------fin configuraciones---------------------//

//------------------------middleware--------------------//
app.use(session({
    secret:'playersession',
        resave:true,
        saveUninitialized:true,
        store:mysqlstore(database)
}));
//mostrar mensajes flash
app.use(flash());
//peticiones mostradas en consola
app.use(morgan('dev')); 
//interpreta todos los datos enviados por el front
app.use(express.urlencoded({extended:false})); 
//convierte las peticiones post en formato json
app.use(express.json());
//inicializa passport
app.use(passport.initialize());
//inicializa session
app.use(passport.session());
//inicializa cokie
app.use(cookieparser());
//---------------------fin middleware--------------------//


//--------------------Variables globales-----------------//
app.use((req,res,next)=>{
    app.locals.success=req.flash('success');
    app.locals.message=req.flash('message');
    app.locals.usuario=req.session.usuario;
    app.locals.descripcion=req.session.descripcion;
    app.locals.idrol=req.session.idrol;
    next();
});
//------------------fin Variables globales-----------------//

//Control caché página
app.use(function(req, res, next) {
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    //console.log('Cache');  
    next();
  });

//-------------------------rutas--------------------------//
//enrutando a cliente
app.use('/clientes',clienteroutes);
//enrutando a autenticación
app.use('/autenticacion',autenticactionroutes);

app.use('/',principalroutes);

app.use('/jugadores',jugadoresroutes);

//-------------------------rutas--------------------------//


//archivos estáticos para utilizar en toda la alicación
app.use(express.static(path.join(__dirname,'public')));
//servidor
app.listen(app.get('port'),()=>{
    console.log('Servidor escuchando por el puerto ',app.get('port'));  
});
