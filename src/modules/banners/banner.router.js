const { checkLogin } = require("../../middlewares/auth.middleware");
const { bodyValidator } = require("../../middlewares/bodyvalidator.middleware");
const uploader = require("../../middlewares/multipart-parser.middleware");
const { allowRole } = require("../../middlewares/rbac.middleware");
const bannerCtrl = require("./banner.controller");
const { bannerCreateDTO, bannerUpdateDTO } = require("./banner.validator");

const bannerRouter=require("express").Router();

bannerRouter.get('/home-banner',bannerCtrl.getForHome)

bannerRouter.route('/')
          .post(checkLogin,allowRole("admin"),uploader().single('image'),bodyValidator(bannerCreateDTO),bannerCtrl.store) // to create and store a banner
          .get(checkLogin,allowRole("admin"),bannerCtrl.index)

bannerRouter.route('/:id')
          .get(checkLogin,allowRole('admin'),bannerCtrl.detail)
          .patch(checkLogin,allowRole('admin'),uploader().single('image'),bodyValidator(bannerUpdateDTO),bannerCtrl.update) // to update a banner
          .delete(checkLogin,allowRole('admin'),bannerCtrl.delete) // to delete a banner

//CRUD
//CREATE
//banner

// bannerRouter.route('/')
//      .post()
//      .get()

// bannerRouter.route('/:id')
//        .post()
//        .put()
//        .delete()

module.exports=bannerRouter