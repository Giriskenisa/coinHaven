const express = require('express');
const app = express();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const {registerValidation,loginValidation} = require('../validation')
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');


app.use(express.json());

app.post('/register', async (req, res) =>{
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const emailExist = await User.findOne({email:req.body.email});
    if(emailExist) {return res.status(400).send('Email Already Exists.');}

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password,salt);

    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password: hashPass,
    });
    try{
        const savedUser = await user.save();
        sendMail(savedUser.email,savedUser._id);
        res.send(savedUser);
    }catch(err){
        console.log(err);
        res.status(400).send(err);
    }
});

app.get('/deneme',(req,res,next)=>{
  res.send("Hello from me");
})

app.post('/login', async (req,res) => {
 const {error} = loginValidation(req.body);
 if(error) return res.status(400).send(error.details[0].message);

 const user = await User.findOne({email:req.body.email});
 if(!user) return res.status(400).send('Email or Password is Wrong');

 if(!user.isVerified) return res.status(400).send('Please Verificate your Account.')
 
  const validPass = await bcrypt.compare(req.body.password,user.password);
  if(!validPass) return res.status(400).send("Invalid Password");

  const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
  res.header('token',token).send(token);
});

app.get('/verify/:id',async (req, res) =>{
    const id = req.params.id;
    const user = await User.findOne({_id:id})
    if(user){
        user.isVerified = true;
        await user.save();
        res.send('Your Account has been verificated.')
    }else {
        res.send('User Not Found');
    }
});


const sendMail = (email,id) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: 'sakar2092@gmail.com',
            pass: process.env.mail_pass
        }
    });
    
    let mailOptions = {
        from: 'sakar2092@gmail.com',
        to: email,
        subject: 'Email Verification',
        html: `Press <a href=http://localhost:3000/api/user/verify/${id}> here</a> to verify your email. Thanks`
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error.message);
        }
        console.log('success');
    });
    
}
app.listen(3001,()=>{
  console.log("running auth");
})
