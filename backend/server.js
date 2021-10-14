const express = require('express'); //Line 1
const connectDB = require('./config/db');
const cors= require('cors');
const morgan=require('morgan');
const app = express(); //Line 2
const port = process.env.PORT || 5000; //Line 3

const testapiRouter=require("./routes/testapi")

// connectDB();
app.use(cors());
app.use(morgan("dev"));
app.listen(port, () => console.log(`Listening on port ${port}`)); 

app.get('/', (req, res) => res.send('Hello world!'));
app.use("/testapi",testapiRouter)