const { createIndexes } = require("../order.model");
const OrderDetailModel = require("./order-detail.model");

class OrderDetailService {

    getSingleCartByFilter = async (filter) => {
        try {
            const cart = await OrderDetailModel.findOne(filter)
                .populate("buyer", ['_id', 'name', 'email', 'phone', 'address', 'image'])
                .populate("product", ['_id', 'title', 'price', 'discount', 'actualAmt', 'slug'])

            return cart;

        } catch (exception) {
            console.log("getSinglecartByFilter", exception);
            throw exception;
        }

    }

    getAllCartByFilter = async (filter) => {
        try {
            const cart = await OrderDetailModel.find(filter)
                .populate("buyer", ['_id', 'name', 'email', 'phone', 'address', 'image'])
                .populate("product", ['_id', 'title', 'price', 'discount', 'actualAmt', 'slug', 'images'])

            return cart;

        } catch (exception) {
            console.log("getSinglecartByFilter", exception);
            throw exception;
        }

    }
    createCart = async (data) => {
        try {
            const cartObj = new OrderDetailModel(data);
            return await cartObj.save();

        } catch (exception) {
            console.log("createCart", exception);
            throw exception
        }
    }
    updateSingleCart = async (cartId, updateData) => {
        try {
            const updateBody = await OrderDetailModel.findByIdAndUpdate(cartId, { $set: updateData }, { new: true })
            return updateBody;

        } catch (exception) {
            console.log("updateSingleCart", exception);
            throw exception
        }
    }
    updateCartByFilter = async (filter, updateData) => {
        try {
            const updateBody = await OrderDetailModel.updateMany(filter, { $set: updateData })
            return updateBody;

        } catch (exception) {
            console.log("updateSingleCart", exception);
            throw exception
        }

    }

    deleteFromCart = async (cartId) => {
        try {
            const removed = await OrderDetailModel.findByIdAndDelete(cartId)
            if (!removed) {
                throw { code: 400, message: "Cart does not exists anymore", status: "CART_DOES_NOT_EXISTS" }
            }
            return removed;

        } catch (exception) {
            console.log("deleteFromCart", exception);
            throw exception

        }
    }

}

const orderDetailSvc = new OrderDetailService();
module.exports = orderDetailSvc