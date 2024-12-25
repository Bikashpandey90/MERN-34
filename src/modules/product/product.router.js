const { checkLogin } = require("../../middlewares/auth.middleware");
const { bodyValidator } = require("../../middlewares/bodyvalidator.middleware");
const uploader = require("../../middlewares/multipart-parser.middleware");
const { allowRole } = require("../../middlewares/rbac.middleware");
const productCtrl = require("./product.controller");
const { productCreateDTO, productUpdateDTO } = require("./product.validator");

const productRouter=require("express").Router();

productRouter.get('/home-product',productCtrl.getForHome)

productRouter.route('/')
          .post(checkLogin,allowRole(["admin","seller"]),uploader().array('images'),bodyValidator(productCreateDTO),productCtrl.store) // to create and store a product
          .get(checkLogin,allowRole(["admin","seller"]),productCtrl.index)

productRouter.route('/:id')
          .get(checkLogin,allowRole(["admin","seller"]),productCtrl.detail)
          .patch(checkLogin,allowRole(["admin","seller"]),uploader().array('images'),bodyValidator(productUpdateDTO),productCtrl.update) // to update a product
          .delete(checkLogin,allowRole(["admin","seller"]),productCtrl.delete) // to delete a product

//CRUD
//CREATE
//product

// productRouter.route('/')
//      .post()
//      .get()

// productRouter.route('/:id')
//        .post()
//        .put()
//        .delete()

module.exports=productRouter