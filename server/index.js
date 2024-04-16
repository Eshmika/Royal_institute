const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const {mongoose} = require('mongoose');
const mongoose = require('mongoose'); 
const Classes = require('./models/Classes');
const cookieParser = require('cookie-parser');
const app = express();

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('MongoDB connected'))
.catch((err)=> console.log('Database not connected', err));

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));


app.use('/', require('./routes/authRouters'));
app.use('/', require('./routes/timetableRouter'));

//add class

app.post('/api/classes',(req,res)=>{

    Classes.create(req.body)
    .then((data));
})
const port = 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));