const { checkLogin } = require("../../middlewares/auth.middleware");
const { bodyValidator } = require("../../middlewares/bodyvalidator.middleware");
const uploader = require("../../middlewares/multipart-parser.middleware");
const { allowRole } = require("../../middlewares/rbac.middleware");
const categoryCtrl = require("./category.controller");
const { categoryCreateDTO, categoryUpdateDTO } = require("./category.validator");

const categoryRouter=require("express").Router();

categoryRouter.get('/home-category',categoryCtrl.getForHome)

//TODO: APT to get all the products by slug
//categoryRouter.get("/slug/:slug",categoryCtrl.getProductList)

categoryRouter.route('/')
          .post(checkLogin,allowRole("admin"),uploader().single('image'),bodyValidator(categoryCreateDTO),categoryCtrl.store) // to create and store a category
          .get(checkLogin,allowRole("admin"),categoryCtrl.index)

categoryRouter.route('/:id')
          .get(checkLogin,allowRole('admin'),categoryCtrl.detail)
          .patch(checkLogin,allowRole('admin'),uploader().single('image'),bodyValidator(categoryUpdateDTO),categoryCtrl.update) // to update a category
          .delete(checkLogin,allowRole('admin'),categoryCtrl.delete) // to delete a category

//CRUD
//CREATE
//category

// categoryRouter.route('/')
//      .post()
//      .get()

// categoryRouter.route('/:id')
//        .post()
//        .put()
//        .delete()

module.exports=categoryRouter