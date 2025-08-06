const  mongoose = require("mongoose");
const { schemaOpts } = require("../../common/schema");

const WishListSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true

    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true
    },



}, schemaOpts)
const WishListModel = mongoose.model("WishList", WishListSchema)
module.exports = WishListModel