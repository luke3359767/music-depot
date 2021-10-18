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









const jwt= require('jsonwebtoken')

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

let refreshTokens=[]

app.post("/api/refresh",(req,res)=>{
  //take the refresh token from user
  const refreshToken=req.body.token 
  //send error if there is no tocken or its invalid
  if(!refreshToken) return res.status(401).json("You are not auth !!!")
  if(!refreshTokens.includes(refreshToken)){
    return res.status(403).json("RefreshToken is invalid");
  }
  jwt.verify(refreshToken, "myRefreshSecretKey",(err,user)=>{
    err && console.log(err);
    refreshTokens=refreshTokens.filter(token=>token!==refreshToken);
    const newAccessToken=generateAccessToken(user)
    const newAccessToken=generateAccessToken(user)
  });

  //if everything is ok, create a new one, refresh
})

const generateAccessToken=(user)=>{
    return jwt.sign({id:user.id,isAdmin:user.isAdmin},"mySecretKey",{expiresIn:"15m"})
         
}

const generateRefreshToken=(user)=>{
    return jwt.sign(
            { id: user.id, isAdmin: user.isAdmin },
            "myRefreshSecretKey",
          );
         
}

app.post("/api/login",(req, res)=>{
    const {username,password}=req.body;
    const user=users.find(u=>{
        return u.username===username &&u.password===password
    })
    if(user){
      const accessToken = generateAccessToken(user);
      const refreshToken=generateRefreshToken(user);
      refreshTokens.push(refreshToken)
       res.json({
         username: user.username,
         isAdmin: user.isAdmin,
         accessToken,
       });
    }else{
        res.status(400).json("Username or password incorrect")
    }
})

const verify=(req,res,next)=>{
  const authHeader= req.headers.authorization
  if(authHeader){
    const token=authHeader.split(" ")[1]
    jwt.verify(token, "mySecretKey",(err,user)=>{
      if(err){
        return res.status(403).json("Token is not valid");
      }

      req.user=user;
      console.log("this is the user: ",user)
      next();

    });
  }else{
    res.status(401).json("not auth");
  }
}

app.delete("/api/users/:userId",verify,(req, res)=>{
  if(req.user.id===req.params.userId || req.user.isAdmin){
    res.status(200).json("deleted successfully");
  }else{
    res.status(403).json("you are not allow to delete the user")
  }
})
















app.listen(port, () =>
    console.log(`Listening on port ${port}`)); 

app.get('/', (req, res) => res.send('Hello world!'));
app.use("/testapi",testapiRouter)
app.use("/testemail",testdbapiRouter)
