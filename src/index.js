require('colors');

const express = require('express');
const cors = require('cors')
const app = express();

const consign = require('consign');
const cookieParser = require('cookie-parser');
const http = require('http').createServer(app);
const socketIO = require('socket.io')(http);
const admin = require("firebase-admin");

const serviceAccount = require("./firebase/sabinas-app-firebase-adminsdk-uqi8o-f2dd50249f.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sabinas-app.firebaseio.com"
});


app.use(express.static('./public'));
app.set('port', process.env.PORT || 3000);
app.use(express.urlencoded({extended: false}));         
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.dbFirestore = admin.firestore();
app.io = socketIO;

consign({cwd: 'src'})
.include('libs/config.js')
.then('./database.js')    
.then('middlewares')
.then('controllers')
.then('routes')
.into(app); 

//Iniciar Server
http.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`.bgMagenta);
});




