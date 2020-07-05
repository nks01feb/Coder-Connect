const express = require('express');
const connectDB = require('./config/db');


const app = express();
//connect the database

connectDB();

//Init middleware

app.use(express.json({extended : false}));


const PORT = process.env.port || 5000;

app.get('/', (req,res)=>{
    res.send("syarted the app")
});

app.use('/api/users', require('./routes/api/user'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/post'));


app.listen(PORT, () =>{
    console.log("Servere started at port :"+ PORT);
})