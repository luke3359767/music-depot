const express = require('express'); //Line 1
const connectDB = require('./config/db');
const cors= require('cors');
const morgan=require('morgan');
const app = express(); //Line 2
const port = process.env.PORT || 5000; //Line 3
// require('./models/User');

const testapiRouter=require("./routes/testapi")
const testdbapiRouter=require('./routes/testdbapi')

connectDB();
app.use(cors());
app.use(express.json())
app.use(morgan("dev"));



const users = [
  {
    id: "1",
    username: "John123",
    password: "jifjsldfjks@!#@12",
    isAdmin: true,
  },
  {
    id: "2",
    username: "Jane",
    password: "jjj@!#@12",
    isAdmin: false,
  },
];

app.post("api/login",(req, res)=>{
    const {username,password}=req.body;
    const user=users.find(u=>{
        return u.username===username &&u.password===password
    })
    if(user){
    res.json(user);
    }else{
        res.status(404).json("Username or password incorrect")
    }
})

app.listen(port, () =>
    console.log(`Listening on port ${port}`)); 

app.get('/', (req, res) => res.send('Hello world!'));
app.use("/testapi",testapiRouter)
app.use("/testemail",testdbapiRouter)
