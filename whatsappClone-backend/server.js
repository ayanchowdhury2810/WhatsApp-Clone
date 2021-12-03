// importing
import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js' ;
import Pusher from 'pusher'; 
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config({path:'./config.env'});

// app config
const app = express()
const port = process.env.PORT

const pusher = new Pusher({
    appId: "1309408",
    key: "fa6b7753282ce84fc46c",
    secret: "9f55f2b4548534da9e3f",
    cluster: "ap2",
    useTLS: true
  });
  

// middleware
app.use(express.json());
app.use(cors())

// ----------------------------------------------------------
// instead of typing the code below we can install cors and import it

// app.use((req, res, next) =>{
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers', '*');
//     next();
// });
// ----------------------------------------------------

// DB config
const connection_url  = process.env.DATABASE;
mongoose.connect(connection_url)
// .then(()=>console.log('connected to DB'))
// .catch(err=>console.log(err));

const db = mongoose.connection;

db.once('open', ()=>{
    console.log('DB connected')

    const msgCollection =db.collection('messagecontents');
    const changeStream = msgCollection.watch();

    changeStream.on('change',(change)=>{
        console.log('A change occured',change);

    if(change.operationType == 'insert'){
        const messageDetails = change.fullDocument;
        pusher.trigger('messages', 'inserted',{
            name: messageDetails.name,
            message:messageDetails.message,
            timestamp:messageDetails.timestamp,
            received:messageDetails.received
        });
    } else {
        console.log('Error triggering pusher');
    }
    });
});

// 

// app routes
app.get('/',(req,res)=>res.status(200).send('hello world'));

app.get('/messages/sync', (req,res)=>{
    Messages.find((err, data)=>{
        if(err){
            res.status(500).send(err);
        } else{
            res.status(200).send(data);
        }
    })    
})

    
app.post('/messages/new', (req,res)=>{
    const dbMessage = req.body   

    Messages.create(dbMessage, (err, data)=>{
        if(err){
            res.status(500).send(err);
        } else{
            res.status(201).send(data);
        }
    })
})

// listen
app.listen(port,()=>console.log(`Listening to localhost:${port}`));