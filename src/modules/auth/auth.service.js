const brcypt=require("bcryptjs")
const fileUploaderSvc=require("../../services/fileuploader.service")
const{randomStringGenerator}=require("../../utilities/helpers");
const UserModel = require("../user.model");
const emailSvc=require("../../services/mail.service")
class AuthService{
    transformUserRegister=async(req)=>{
        try{
            
        let data=req.body;
        //password
        const salt=brcypt.genSaltSync(10)
        data.password=brcypt.hashSync(data.password,salt);
        delete data.confirmPassword;

        // brcypt.compareSync("Admin123#",data.password);


        let file=req.file;  //single upload

        if(file){
            data.image=await fileUploaderSvc.uploadFile(file.path,'/users')

        }
       
        data.otp=randomStringGenerator(6,false) 
        data.otpExpiryTime = new Date(Date.now()+300000)
        data.status = 'inactive';

        return data

        }catch(exception){
            console.log(exception);
            throw exception
        }
    }

    createUser=async(data)=>{
        try{
            const  userObj= new UserModel(data);
                  return await userObj.save();     //insert or update
        }catch(exception){
            console.log("Create user", exception);
            throw exception
        }
    }
    sendActivationNotification=async(name,otp,email)=>{
        try{
            let msg=`Dear ${name},<br/>
            <p>Thank you for registering with us.Please activate your account by using the following otp code:
            </p>
            <p ><strong style="color:red">${otp}</strong></p>
            <p>Warm regards</p>
            <p>${process.env.SMTP_FROM}
            </p>
            <small>
            <em>Please do not reply to this email directly.</em>
            </small>`
    
            await emailSvc.sendEmail({
                to: email,
                subject:"Registration Success",
                message:msg,
            });

        }catch(exception){
            console.log(exception)
            throw exception

        }
    }

    getSingleUserByFilter=async(filter)=>{
        try{
            const user=await UserModel.findOne(filter)
            if(!user){
                throw{code:"422",status:"USER_NOT_FOUND",message:"User not found",detail:""}
            }

            return user;

        }catch(exception){
            console.log("GETSIGNLEUSERBYFILTER ERROR : ",exception);
            throw exception

        }
    }


    resetOtp=async(user)=>{
        try{
            //new otp
            let otp=randomStringGenerator(6,false)
            let expiryTime=new Date(Date.now()+300000)

            user.otp=otp; 
            user.otpExpiryTime = expiryTime;

            return await user.save()
            

        }catch(exception){
            console.log("RESETOTP ERROR : ",exception);
            throw exception
        }
    }
    activateUser=async(user)=>{
        try{
            user.otp=null;
            user.otpExpiryTime=null;
            user.status = 'active';


            return await user.save();
        }catch(exception){
            console.log("ActivateUser",exception)
            throw exception
        }
    }

}
const authSvc=new AuthService()
module.exports=authSvc