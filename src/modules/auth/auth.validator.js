const Joi=require("joi")
const registerDataDTO=Joi.object({
    name:Joi.string().min(2).max(50).required().messages({
        "string.empty":"Name should not be empty"
    }),
    email:Joi.string().email().required().messages({
        "string.empty": "Email is required",
        "string.email": "Invalid email format",
    }),
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*_-])[A-Za-z\d!@#$%&*_-]{8,15}$/).required().messages({
        "string.empty":"Password should not be empty",
        "string.pattern.base":"Password should be at least 8 characters, at least one uppercase letter one digit and a special Character"
    }),
    confirmPassword:Joi.string().equal(Joi.ref('password')).required().messages({
        "string.empty":"Confirm Password Should not be empty",
        "any.only": "Confirm Password should be same as password"
    }),
    role:Joi.string().regex(/^(customer|seller|admin)$/).default("customer"),  //customer, seller,admin
    gender:Joi.string().regex(/^(male|female|others)$/).required().messages({
        "string.pattern.base":"Gender Should be either male,female or others"
    }),
    address:Joi.string().optional(),
    phone:Joi.string().optional()
        
    })


    const loginDTO=Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().required()
    })

    const activationDTO=Joi.object({
        email:Joi.string().email().required(),
        otp:Joi.string().min(6).max(6).required()
    })
    // const forgetPasswordDTO=Joi.object({
    //     email:Joi.string().email().required()
    // })
   
    
    

    

    module.exports={
        registerDataDTO,
        loginDTO,
        activationDTO
    }