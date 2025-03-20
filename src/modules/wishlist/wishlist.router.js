const { checkLogin } = require('../../middlewares/auth.middleware')
const { bodyValidator } = require('../../middlewares/bodyvalidator.middleware')
const { allowRole } = require('../../middlewares/rbac.middleware')
const wishListCtrl = require('./wishlist.controller')
const WishListDTO = require('./wishlist.validator')

const wishListRouter = require('express').Router()


wishListRouter.post('/add-to-wishlist', checkLogin, allowRole(['admin', 'customer']), bodyValidator(WishListDTO), wishListCtrl.addToWishList)
wishListRouter.get('/my-wishlist', checkLogin, allowRole(['admin', 'customer']), wishListCtrl.myWishList)
wishListRouter.route('/:id')
    .delete(checkLogin, allowRole(['admin', 'customer']), wishListCtrl.removeFromWishList)


module.exports = wishListRouter