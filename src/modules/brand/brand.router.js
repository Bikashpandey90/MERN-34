const { checkLogin } = require("../../middlewares/auth.middleware");
const { bodyValidator } = require("../../middlewares/bodyvalidator.middleware");
const uploader = require("../../middlewares/multipart-parser.middleware");
const { allowRole } = require("../../middlewares/rbac.middleware");
const brandCtrl = require("./brand.controller");
const { brandCreateDTO, brandUpdateDTO } = require("./brand.validator");

const brandRouter=require("express").Router();

brandRouter.get('/home-brand',brandCtrl.getForHome)

//TODO: APT to get all the products by slug
//brandRouter.get("/slug/:slug",brandCtrl.getProductList)

brandRouter.route('/')
          .post(checkLogin,allowRole("admin"),uploader().single('image'),bodyValidator(brandCreateDTO),brandCtrl.store) // to create and store a brand
          .get(checkLogin,allowRole("admin"),brandCtrl.index)

brandRouter.route('/:id')
          .get(checkLogin,allowRole('admin'),brandCtrl.detail)
          .patch(checkLogin,allowRole('admin'),uploader().single('image'),bodyValidator(brandUpdateDTO),brandCtrl.update) // to update a brand
          .delete(checkLogin,allowRole('admin'),brandCtrl.delete) // to delete a brand

//CRUD
//CREATE
//brand

// brandRouter.route('/')
//      .post()
//      .get()

// brandRouter.route('/:id')
//        .post()
//        .put()
//        .delete()

module.exports=brandRouter