const { checkLogin } = require('../../middlewares/auth.middleware')
const { bodyValidator } = require('../../middlewares/bodyvalidator.middleware')
const { allowRole } = require('../../middlewares/rbac.middleware')
const orderCtrl = require('./order.controller')
const { AddToCartDTO, CheckOutDTO, PaymentDTO } = require('./order.validator')

const orderRouter=require('express').Router()


//add to cart
orderRouter.post('/add-to-cart',checkLogin,allowRole(['customer','admin']),bodyValidator(AddToCartDTO),orderCtrl.addToCart)
//view cart Items
orderRouter.get('/my-cart',checkLogin,allowRole(['admin','customer']),orderCtrl.myCart)
//remove from cart or delete
orderRouter.put("/:cartId/update-cart",checkLogin,allowRole(['admin','customer']),orderCtrl.removeFromCart)

//checkout to order
orderRouter.post('/place-order',checkLogin,allowRole(['admin','customer']),bodyValidator(CheckOutDTO),orderCtrl.checkoutOrder)

//payment store
 orderRouter.post('/:id/payment',checkLogin,allowRole(['admin','customer']),bodyValidator(PaymentDTO),orderCtrl.makePayment)
//list order
 orderRouter.get('/list',checkLogin,orderCtrl.listMyOrder)

 //getDetail ById
 orderRouter.get('/:id/detail',checkLogin,orderCtrl.getOrderDetailById)


module.exports=orderRouter