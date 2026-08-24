var express = require('express');
var bodyParser=require('body-parser');
var jwt=require('jsonwebtoken');
var expressJwt=require('express-jwt').expressjwt;
var app = express();

var jwtClave="laclave_de_cecilio";

app.use(express.static('publica'));
app.use(bodyParser.json());
app.use(expressJwt({secret:jwtClave, algorithms: ['HS256']}).unless({path: ["/login"]}));

var usuario= {
 nombre:"cecilio",
 clave:"cecilio"
}

var noticias = [{
 id: 1,
 titulo: "noticia 1"
},{
    id: 2,
    titulo: "noticia 2"
}
];

app.get('/noticias', function(req, res) {
 res.send(noticias);
});

app.post("/login",function(request,response) {
if (request.body.nombre==usuario.nombre &&
request.body.clave==usuario.clave) {
 var token=jwt.sign({
 usuario:"cecilio"
 },jwtClave);
 response.send(token);
}else {
 response.status(401).end("usuario incorrecto")
}
});
app.listen(3000, function() {
 console.log('aplicacion en el puerto 3000!');
});