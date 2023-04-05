const mongoose = require('mongoose');
const User = require('../models/userModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.user_signup = (req,res,next)=>{
    const {name,email,password,pic} = req.body;
    if(!name || !email || !password){
        return res.status(422).json({error:"Please add all the fields"});
    }
    User.find({email: req.body.email})
    .exec()
    .then(user=>{
        if(user.length>=1){
            return res.status(409).json({
                message: 'Mail exists'
            });
        }
        else{
            bcrypt.hash(req.body.password,10,(err,hash)=>{
            if(err){
                return res.status(500).json({
                    error: err
                });
            }
            else{
                const user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    name: req.body.name,
                    email: req.body.email,
                    password: hash

                })
                user.save().then(result=>{
                    console.log(result);
                    res.status(201).json({
                        name: result.name,
                        email: result.email,
                        password: result.password,
                        _id: result._id,
                        message: 'User created'
                    });
                }).catch(err=>{
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                })
             };
    
            }); 
        }
    });
}

exports.user_login = (req,res,next)=>{
    const {email,password} = req.body;
    User.find({email: req.body.email})
    .exec()
    .then(user=>{
        if(user.length<1){
            return res.status(401).json({
                message: 'Auth failed'
            });
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
            if(err){
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            if(result){
                 const token =jwt.sign({
                    email: user[0].email,
                    userId: user[0]._id
                },
                process.env.JWT_KEY,
                {
                    expiresIn: "1h"
                },
                 );
            

                return res.status(200).json({
                    message: 'Auth successful',
                    token: token
                });
            }
            res.status(401).json({
                message: 'Auth failed'
            });
        });
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
}

exports.user_checkjwt = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token,process.env.JWT_KEY);
        req.userData = decoded;
        next();
    }
    catch(error){
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
}

exports.allUsers = async(req,res)=>{
    const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

//   const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  const users = await User.find(keyword);
  res.send(users);
}
