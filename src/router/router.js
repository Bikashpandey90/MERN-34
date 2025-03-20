const router = require('express').Router();

const authRouter = require("../modules/auth/auth.router")
const bannerRouter = require("../modules/banners/banner.router");
const brandRouter = require('../modules/brand/brand.router');
const categoryRouter = require('../modules/category/category.router');
const chatRouter = require('../modules/chat/chat.router');
const microRouter = require('../modules/micro-services/micro.router');
const orderRouter = require('../modules/order/order.router');
const productRouter = require('../modules/product/product.router');
const wishListRouter = require('../modules/wishlist/wishlist.router');



router.use(authRouter)
router.use('/banner', bannerRouter)
router.use('/brand', brandRouter)
router.use('/category', categoryRouter)
router.use('/product', productRouter)
router.use('/order', orderRouter)
router.use('/chat', chatRouter)
router.use("/micro", microRouter)
router.use('/wishlist', wishListRouter)



module.exports = router