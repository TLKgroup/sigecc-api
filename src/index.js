require('colors');

const express = require('express');
const cors = require('cors')
const app = express();

const consign = require('consign');
const cookieParser = require('cookie-parser');
const http = require('http').createServer(app);
const socketIO = require('socket.io')(http);
const admin = require("firebase-admin");

const serviceAccount = require("./firebase/pan-app-d4327-firebase-adminsdk-l1krr-ed0eab66c8.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pan-app.firebaseio.com"
});

app.use(express.static('./public'));
app.set('port', process.env.PORT || 3000);
app.use(express.urlencoded({extended: true, limit: '500mb', parameter: 500000}));         
app.use(express.json({limit: '500mb'}));
app.use('/images', express.static('images'));
app.use(cookieParser());
app.use(cors());
app.dbFirestore = admin.firestore();
app.dbFire = admin.auth();
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
  console.log(`Server on port ${app.get('port')}`.blue);
});