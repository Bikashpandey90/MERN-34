const WishListModel = require("./wishlist.model")

class WishListService {
    create = async (data) => {
        try {
            const wishlist = new WishListModel(data)
            return await wishlist.save()
        }
        catch (exception) {
            console.log("Wishlist Create", exception)
            throw exception
        }
    }
    delete = async (wishlistId) => {
        try {
            // const mongoose = require("mongoose");
            // if (!mongoose.Types.ObjectId.isValid(wishlistId)) {
            //     throw { code: 400, message: "Invalid WishList ID", status: "INVALID_WISHLIST_ID" };
            // }
            const removed = await WishListModel.findByIdAndDelete(wishlistId);
            if (!removed) {
                throw { code: 400, message: "WishList Item does not exist anymore", status: "WISHLIST_DOES_NOT_EXIST" };
            }
            return removed;

        } catch (exception) {
            console.log("Wishlist Delete", exception);
            throw exception;
        }
    }
    getAllWishListByFilter = async (filter) => {
        try {
            const wishlist = await WishListModel.find(filter)
                .populate("product", ['_id', 'title', 'price', 'discount', 'actualAmt', 'slug', 'images', 'stock', 'category'])

            return wishlist




        } catch (exception) {
            console.log("Wishlist getAllWishListByFilter", exception)
            throw exception
        }

    }
    getSingleByFilter = async (filter) => {
        try {
            const wishlist = await WishListModel.findOne(filter)
                .populate("product", ['_id', 'title', 'price', 'discount', 'actualAmt', 'slug'])

            return wishlist;

        } catch (exception) {
            console.log("getSinglecartByFilter", exception);
            throw exception;
        }

    }

}
const wishListSvc = new WishListService()
module.exports = wishListSvc