const Joi = require("joi")
const registerDataDTO = Joi.object({
    name: Joi.string().min(2).max(50).required().messages({
        "string.empty": "Name should not be empty"
    }),
    email: Joi.string().email().required().messages({
        "string.empty": "Email is required",
        "string.email": "Invalid email format",
    }),
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*_-])[A-Za-z\d!@#$%&*_-]{8,15}$/).required().messages({
        "string.empty": "Password should not be empty",
        "string.pattern.base": "Password should be at least 8 characters, at least one uppercase letter one digit and a special Character"
    }),
    confirmPassword: Joi.string().equal(Joi.ref('password')).required().messages({
        "string.empty": "Confirm Password Should not be empty",
        "any.only": "Confirm Password should be same as password"
    }),
    role: Joi.string().regex(/^(customer|seller|admin)$/).default("customer"),  //customer, seller,admin
    gender: Joi.string().regex(/^(male|female|others)$/).required().messages({
        "string.pattern.base": "Gender Should be either male,female or others"
    }),
    address: Joi.string().optional(),
    phone: Joi.string().optional()

})


const loginDTO = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

const activationDTO = Joi.object({
    email: Joi.string().email().required(),
    otp: Joi.string().min(6).max(6).required()
})
// const forgetPasswordDTO=Joi.object({
//     email:Joi.string().email().required()

// })


const updateProfileDTO = Joi.object({
    name: Joi.string().min(2).max(50).optional().messages({
        "string.min": "Name should have at least 2 characters",
        "string.max": "Name should not exceed 50 characters",
    }),
    email: Joi.string().email().optional().messages({
        "string.email": "Invalid email format",
    }),
    phone: Joi.string().pattern(/^\d{10}$/).optional().messages({
        "string.pattern.base": "Phone number should be a 10-digit number",
    }),
    address: Joi.string().max(255).optional().messages({
        "string.max": "Address should not exceed 255 characters",
    }),
    // password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*_-])[A-Za-z\d!@#$%&*_-]{8,15}$/).when('newPassword', {
    //     is: Joi.exist(),
    //     then: Joi.required(),
    //     otherwise: Joi.optional()
    // }).messages({
    //     "string.empty": "Password should not be empty",
    //     "string.pattern.base": "Password should be at least 8 characters, at least one uppercase letter one digit and a special Character"
    // }),
    // newPassword: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*_-])[A-Za-z\d!@#$%&*_-]{8,15}$/).when('password', {
    //     is: Joi.exist(),
    //     then: Joi.required(),
    //     otherwise: Joi.optional()
    // }).messages({
    //     "string.empty": "New Password should not be empty",
    //     "string.pattern.base": "New Password should be at least 8 characters, at least one uppercase letter one digit and a special Character"
    // }),
    // confirmPassword: Joi.string().equal(Joi.ref('newPassword')).when('newPassword', {
    //     is: Joi.exist(),
    //     then: Joi.required(),
    //     otherwise: Joi.optional()
    // }).messages({
    //     "string.empty": "Confirm Password Should not be empty",
    //     "any.only": "Confirm Password should be same as New Password"
    // }),
});










module.exports = {
    registerDataDTO,
    loginDTO,
    activationDTO,
    updateProfileDTO
}