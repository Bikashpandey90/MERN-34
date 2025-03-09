require("dotenv").config()
const fileUploaderSvc = require("../../services/fileuploader.service");
const brcypt = require("bcryptjs");
const emailSvc = require("../../services/mail.service");
const { randomStringGenerator } = require("../../utilities/helpers");
const authSvc = require("./auth.service")
const jwt = require("jsonwebtoken");
const bannerSvc = require("../banners/banner.service");
class AuthController{
    
    register=async (req,res,next)=>{
        try{
            //body parser
            let data=await authSvc.transformUserRegister(req);
        //name valid
        const user =await authSvc.createUser(data);
        await authSvc.sendActivationNotification(data.name, data.otp, data.email)
        //email,password,confirmPassword,gender,role,phone,address
        //validate
        //db store
        //notify
            //Email notification
        //client response
        res.json({
            data:user,
            message:"Register data",
            status:"REGISTERED_DATA",
            options:null

        })
        }catch(exception){
            console.log("Register",exception)
            next(exception)
        }
    }
    //activate
    activateUser=async(req,res,next)=>{
        try{
            const data=req.body;  //email,otp
            const user=await authSvc.getSingleUserByFilter({
                email:data.email
            })
            //pre activated user
            if(user.status==='active'){
                throw {code:400, message:"User already activated",status:"ALREADY_ACTIVATED_USER"}
            }
            //otp verify
            //expiry time
            let today=Date.now();
            let otpExpiry=user.otpExpiryTime.getTime();  //expiry time

            if(today>otpExpiry){
                throw {code:422,message:"OTP expired",status:"OTP_EXPIRED"}
            }

            if(data.otp!== user.otp){
                throw {code:403,message:"Invalid OTP code",status:"OTP_INVALID"}

            }
            await authSvc.activateUser(user)

            res.json({
                detail:null,
                message:"User Activated Successfully",
                status:"USER_ACTIVATED",
                options:null

            })
            


        }catch(exception){
            console.log("ActivateUser",exception)
            next(exception)
        }
    }
    resendOtp=async(req,res,next)=>{

        try{
            const data=req.body;  //email,otp
            let user=await authSvc.getSingleUserByFilter({
                email:data.email
            })

            //pre activated user

            if(user.status==='active'){
                throw {code:400, message:"User already activated",status:"ALREADY_ACTIVATED_USER"}
            }
            //otp verify
            //expiry time
            let today=Date.now();
            let otpExpiry=user.otpExpiryTime.getTime();  //expiry time

            if(today <= otpExpiry){
                throw {code:422,message:"OTP expired",status:"OTP_EXPIRED"}
            }
            user=await authSvc.resetOtp(user)
            await authSvc.sendActivationNotification(user.name,user.otp,user.email)
            res.json({
                detail:{otp:user.otp},
                status:"OTP_RESEND",
                message:"OTP resend successfully",
                options:null
            })
        }catch(exception){
            console.log("ActivateUser",exception)
            next(exception)
        }
    }

    login=async(req,res,next)=>{
        try{
            const data=req.body;
            const user=await authSvc.getSingleUserByFilter({
                email:data.email,
               
            })

            //active
            if(user.status !== 'active'){
                throw {code:401,message:"User is not active",status:"USER_NOT_ACTIVE"}
 
            }
            //verify password
            if(brcypt.compareSync(data.password,user.password)){

                ///TODO : OTP generate=> db user update
                //responst

                //jwt

                let accessToken=jwt.sign({
                    sub:user._id,
                    typ:"bearer"
                },process.env.JWT_SECRET,{
                    expiresIn:"1h"
                });

                let refreshToken=jwt.sign({
                    sub:user._id,
                    typ:"refresh"

                },process.env.JWT_SECRET,{
                    expiresIn:"10d"
                });
                res.json({
                    detail:{
                        accessToken:accessToken,
                        refreshToken:refreshToken,
                        user:{
                            _id:user._id,
                            name:user.name,
                            email:user.email,
                            role:user.role,
                            image:user.image
                        }
                    },
                    message:"user login success",
                    status:"LOGIN_SUCCESS",
                    options:null
                })
            }else{
                throw {code:401,message:"Invalid password",status:"INVALID_PASSWORD"}
            }
        }catch(exception){
            console.log("Login:",exception)
            next(exception)
        }

    }
    //verify login otp=>email,otp
        //token
          
          getLoggedInUser=async(req,res,next)=>{
            try{
                res.json({
                    detail:req.authUser,
                    message:"Your Profile",
                    status:"YOUR_PROFILE",
                    options:null
                })

            }catch(exception){
                next(exception)
            }
          }
    getRefreshToken=async(req,res,next)=>{
        try{
            let user=req.authUser;
            let accessToken=jwt.sign({
                sub:user._id,
                typ:"bearer"
            },process.env.JWT_SECRET,{
                expiresIn:"1h"
            })
            let refreshToken=jwt.sign({
                sub:user._id,
                typ:"refresh"
            },process.env.JWT_SECRET,{
                expiresIn:"10d"
            })
            res.json({
                detail:{
                    accessToken:accessToken,
                    refreshToken:refreshToken
                    },
                    message:"Token Refreshed",
                    status:"TOKEN_REFRESHED",
                    options:null
            })
        }catch(exception){
            next("getRefreshToken :",exception)
        }
    } 

    // sendResetOTP=async(req,res,next)=>{
    //     try{
    //         let email=req.body.email

            
    //     }catch(exception){
    //         next(exception)
    //     }
    // }
    
    delete=async(req,res,next)=>{
        try{
            const data=await authSvc.getSingleUserByFilter({
                _id:req.params.id
            })
            const response=await authSvc.deleteByFilter({
                _id:req.params.id
            })
            res.json({
                detail:response,
                message:"User Deleted",
                status:"USER_DELETED",
                options:null

            })
        }catch(exception){
            console.log(exception)
        }
    }
}
const authCtrl=new AuthController()
module.exports=authCtrl