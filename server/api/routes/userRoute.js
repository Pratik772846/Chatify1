const express = require('express');
const router = express.Router();
const User = require('../models/userModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const UserController = require('../controllers/userController.js');
const CheckAuth = require('../middleware/authMiddleware.js');



router.post('/register',UserController.user_signup);

// router.post('/login',UserController.user_login);

router.post('/login',(req,res)=>{
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
                    token: token,
                    name: user[0].name
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
});

router.post('/check_jwt',CheckAuth,UserController.user_checkjwt);
// router.get('/allusers',CheckAuth,UserController.allUsers);
router.get('/allusers',UserController.allUsers);

module.exports = router;