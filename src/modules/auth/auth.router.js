
const authRouter = require("express").Router();
const { checkRefreshToken, checkLogin } = require("../../middlewares/auth.middleware");
const { bodyValidator } = require("../../middlewares/bodyvalidator.middleware");
const uploader = require("../../middlewares/multipart-parser.middleware");
const { allowRole } = require("../../middlewares/rbac.middleware");
const authCtrl = require("./auth.controller");
const { registerDataDTO, loginDTO, activationDTO, updateProfileDTO } = require("./auth.validator");




//if multipart/form-data content does not have any file to upload use.none() function




//Routing middleware
//Routing


//Modules -> feature
// ecommerce=>
//MVP(minimal viable feature)only with core feature
//auth and authorization
//multi vendor/single vendor
//orders
//product
//brand
//category
//transactions
//banners
//chat implementation(socket)

/// add-ons features
//reviews
//offers/coupons/vouchers
//logistics
//inventory
//customer support



// app.get('/url',(req,res,<next>)=>{},(req,res,<next>)=>{})
// app.post('/url',(req,res)=>{})
// app.put('/url',(req,res)=>{})
// app.patch('/url',(req,res)=>{})
// app.delete('/url',(req,res)=>{})



///register
//method:post
//response: json =>message=>your account has been registered
authRouter.post('/register', uploader().single('image'), bodyValidator(registerDataDTO), authCtrl.register)

//activate
authRouter.post('/activate', bodyValidator(activationDTO), authCtrl.activateUser)
authRouter.post('/resend-otp', bodyValidator(activationDTO), authCtrl.resendOtp)
// authRouter.post('/forget-password',bodyValidator(forgetPasswordDTO),authCtrl.sendResetOTP)



// /login
//method:post
//response:json=>message=>your account has been logged in

authRouter.post('/login', bodyValidator(loginDTO), authCtrl.login)

// /me
//method:get
//response:json=>data : a user object with name,email,address,id,password(a random text),role
//message=>your account information

authRouter.get('/me', checkLogin, authCtrl.getLoggedInUser) //add checkLogin before authCtrl
authRouter.get('/refresh', checkRefreshToken, authCtrl.getRefreshToken)

authRouter.route('/:id')
    .delete(checkLogin, allowRole('admin'), authCtrl.delete)

authRouter.patch('/update-profile', checkLogin, uploader().single('image'), bodyValidator(updateProfileDTO), authCtrl.updateProfile)





module.exports = authRouter