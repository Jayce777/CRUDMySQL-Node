const controllerauten={};
const passport=require('passport');
const db=require('../conexion');

controllerauten.iniciosesion=(req,res)=>{

    res.render('autenticacion/iniciosesion');
};

controllerauten.registrousuario=(req,res)=>{

    res.render('autenticacion/registrousuario');
};

controllerauten.ingresar= passport.authenticate('local.iniciosesion',{
    successRedirect:'../principal',
    failureRedirect:'./iniciosesion',
    failureFlash:true
});

controllerauten.registrar= passport.authenticate('local.registrousuario',{
    successRedirect:'./iniciosesion',
    failureRedirect:'./registrousuario',
    failureFlash:true
});

controllerauten.cerrarsesion=(req,res)=>{
    req.logout();
    req.session.destroy();
        res.redirect('./iniciosesion');

};


module.exports=controllerauten;