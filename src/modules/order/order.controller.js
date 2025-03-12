const { createdBy } = require("../../common/schema");
const productSvc = require("../product/product.service");
const orderDetailSvc = require("./detail/order-detail.service");
const orderSvc = require("./order.service");

class OrderController {
    addToCart = async (req, res, next) => {
        try {
            const { productId, quantity } = req.body;
            const loggedInUser = req.authUser;


            const productDetail = await productSvc.getSingleByFilter({
                _id: productId,
                status: 'active'
            })

            //productId exists cart

            const exists = await orderDetailSvc.getSingleCartByFilter({
                orderId: null,
                buyer: loggedInUser._id,
                product: productId
            })

            let cart = null;

            if (exists) {
                //already exists product in card
                let qty = +quantity + +exists.quantity;
                const updateBody = {
                    quantity: qty,
                    price: productDetail.actualAmt,
                    totalAmt: productDetail.actualAmt * qty

                }

                cart = await orderDetailSvc.updateSingleCart(exists._id, updateBody)
                res.json({
                    detail: cart,
                    message: "Product updated to cart ",
                    status: "ADD_TO_CART_SUCCESS",
                    options: null

                })


            } else {
                //new product to add in cart
                let orderDetail = {
                    orderId: null,
                    buyer: loggedInUser._id,
                    product: productDetail._id,
                    price: productDetail.actualAmt,
                    quantity: quantity,
                    totalAmt: (productDetail.actualAmt * quantity),
                    status: "cart",
                    seller: productDetail?.seller?._id,
                    createdBy: loggedInUser._id
                }
                cart = await orderDetailSvc.createCart(orderDetail)
                res.json({
                    detail: cart,
                    message: "Product added to cart successfully",
                    status: "ADD_TO_CART_SUCCESS",
                    options: null

                })

            }



        } catch (exception) {
            next(exception)
        }
    }

    myCart = async (req, res, next) => {
        try {
            let filter = {
                orderId: null
            }
            let loggedInUser = req.authUser;

            if (loggedInUser === 'customer') {
                filter = {
                    ...filter,
                    buyer: loggedInUser._id
                }
            }
            const data = await orderDetailSvc.getAllCartByFilter(filter)

            res.json({
                detail: data,
                message: "Cart details fetched successfully",
                status: "GET_CART_SUCCESS",
                options: null
            })

        } catch (exception) {
            next(exception)
        }
    }

    removeFromCart = async (req, res, next) => {
        try {
            const cartId = req.params.cartId;
            const quantity = +req.body.quantity;
            let loggedInUser = req.authUser;
            let filter = {
                orderId: null,
                _id: cartId
            }
            if (loggedInUser === 'customer') {
                filter = {
                    ...filter,
                    buyer: loggedInUser._id

                }

            }

            //cartId exists
            const cartDetail = await orderDetailSvc.getSingleCartByFilter(filter)
            if (!cartDetail) {
                throw {
                    code: 400, message: "Cart Items does no exists", status: "CART_NOT_FOUND"
                }
            }

            if (quantity < 0) {
                throw {
                    code: 400, message: "Quantity should be greater than or equal to actual to 0", status: "CART_NOT_FOUND"
                }
            }
            //cart quantity =>3 quantity
            if (cartDetail.quantity < quantity) {
                throw {
                    code: 400, message: "Quantity should be less than or equal to actual qantity you have on cart", status: "CART_NOT_FOUND"
                }
            }
            if (cartDetail.quantity === quantity || quantity === 0) {
                //delete cart item
                const del = orderDetailSvc.deleteFromCart(cartId)
                res.json({
                    detail: del,
                    message: "Cart item deleted successfully",
                    status: "CART_ITEM_REMOVED",
                    options: null


                })
            } else {
                let updateBody = {
                    quantity: cartDetail.quantity - quantity,
                    price: cartDetail.product.actualAmt,
                    totalAmt: cartDetail.product.actualAmt * (cartDetail.quantity - quantity)
                }
                const updated = await orderDetailSvc.updateSingleCart(cartId, updateBody)
                res.json({
                    detail: updated,
                    message: "Cart item deleted successfully",
                    status: "CART_ITEM_REMOVED",
                    options: null


                })
            }

        } catch (exception) {
            next(exception)
        }
    }

    checkoutOrder = async (req, res, next) => {
        try {
            const { cartId, discount, serviceCharge, deliveryCharge } = req.body
            const loggedInUser = req.authUser

            //
            let filter = {
                _id: { $in: cartId },
                orderId: null,

            }
            if (loggedInUser.role === 'customer') {
                filter = {
                    ...filter,
                    buyer: loggedInUser._id
                }
            }
            const cartDetail = await orderDetailSvc.getAllCartByFilter(filter);

            if (cartDetail.length !== cartId.length) {
                throw { code: 400, message: "all or some of the items does not exist", status: "CART_NOT_FOUND" }
            }
            let subTotal = 0;
            cartDetail.map((item) => {
                subTotal += item.totalAmt
            })
            subTotal = subTotal - discount * 100 + serviceCharge * 100 + deliveryCharge * 100

            let tax = subTotal * 0.13
            let total = subTotal + tax
            let orderData = {
                buyer: loggedInUser._id,
                subTotal: subTotal,
                tax: tax * 100,
                total: total,
                orderDate: new Date(),
                discount: discount * 100,
                serviceCharge: serviceCharge * 100,
                deliveryCharge: deliveryCharge * 100,
                status: "pending"


            }

            const order = await orderSvc.createOrder(orderData);
            //cart update

            await orderDetailSvc.updateCartByFilter({ _id: { $in: cartId } }, { orderId: order._id })

            res.json({
                detail: order,
                message: "order created successfully",
                status: "ORDER_CREATED_SUCCESSFULLY",
                options: null
            })




        } catch (exception) {
            next(exception)
        }
    }
    makePayment = async (req, res, next) => {
        try {
            const orderId = req.params.id;
            const data = req.body;
            const orderDetail = await orderSvc.getSingleOrderByFilter({
                _id: orderId

            })

            //transaction
            const transactionObj = {
                orderId: orderDetail._id,
                amount: data.amount,
                transactionCode: data.transactionCode || Date.now(),
                paymentMethods: data.method || 'cash',
                data: data.data || null
            }

            const transaction = await orderSvc.populateTranscation(transactionObj)

            await orderSvc.updateOneOrderByFilter({
                _id: orderId
            }, { isPaid: true })

            res.json({
                detail: transaction,
                message: "paid successfully",
                status: "ORDER_PAID_SUCCESSFULLY",
                options: null

            })


        } catch (exception) {
            next(exception)
        }
    }

    listMyOrder = async (req, res, next) => {
        try {
            const loggedInUser = req.authUser;
            //admin,seller,customer
            let filter = {


            }

            if (loggedInUser.role === 'admin') {
                let list = await orderSvc.getAllOrderByFilter(filter)
                res.json({
                    detail: list,
                    message: "list of orders",
                    status: "LIST_ORDER_SUCCESSFULLY",
                    options: null
                })


            } else if (loggedInUser.role === 'customer') {


                filter = {
                    ...filter,
                    buyer: loggedInUser._id

                }

                let list = await orderSvc.getAllOrderByFilter(filter)
                res.json({
                    detail: list,
                    message: "list of orders",
                    status: "LIST_ORDER_SUCCESSFULLY",
                    options: null
                })

            } else if (loggedInUser.role === 'seller') {

                filter = {
                    ...filter,
                    seller: loggedInUser._id,
                    orderId: { $ne: null }

                }



                // const list = await orderSvc.getAllOrderByFilter(filter)
                const list = await orderDetailSvc.getAllCartByFilter(filter)
                res.json({
                    detail: list,
                    message: "list of orders",
                    status: "LIST_ORDER_SUCCESSFULLY",
                    options: null
                })


            } else {
                throw { code: 403, message: "Role not defined", status: "USER_ROLE_NOT_FOUND" }
            }

        } catch (exception) {
            console.log("listMyOrder", exception)
            next(exception)

        }
    }

    getOrderDetailById = async (req, res, next) => {
        try {

            const orderDetail = await orderDetailSvc.getAllCartByFilter({
                orderId: req.params.id
            })
            res.json({
                detail: orderDetail,
                message: "Order Detail",
                status: "LIST_ORDER_SUCCESSFULLY",
                options: null
            })
        } catch (exception) {
            console.log("getOrderDetailById", exception)
            next(exception)
        }
    }
}

const orderCtrl = new OrderController();
module.exports = orderCtrl