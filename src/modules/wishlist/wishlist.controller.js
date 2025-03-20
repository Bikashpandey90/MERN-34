const ProductModel = require("../product/product.model");
const productSvc = require("../product/product.service");
const wishListSvc = require("./wishlist.service");

class WishListController {
    addToWishList = async (req, res, next) => {
        try {
            const { productId } = req.body;
            const loggedInUser = req.authUser;

            if (!productId) {
                return res.status(400).json({ message: "Product ID is required" });
            }

            const productDetail = await productSvc.getSingleByFilter({
                _id: productId,
                status: "active",
            });

            if (!productDetail) {
                return res.status(404).json({ message: "Product not found " });
            }

            const existingWishListItem = await wishListSvc.getSingleByFilter({
                userId: loggedInUser._id,
                productId: productDetail._id,
            });

            if (existingWishListItem) {
                return res.status(409).json({ message: "Product already in wishlist" });
            }

            const newWishListItem = await wishListSvc.create({
                userId: loggedInUser._id,
                productId: productDetail._id,
                product: productDetail
            });

            res.json({
                detail: newWishListItem,
                message: "Product added to wishlist successfully",
                status: "ADD_TO_WISHLIST_SUCCESS",
                options: null

            })
        } catch (exception) {
            next(exception);
        }
    };


    myWishList = async (req, res, next) => {
        try {

            let filter = {}
            let loggedInUser = req.authUser
            if (loggedInUser.role === 'customer') {
                filter = {
                    ...filter,
                    userId: loggedInUser._id
                }

            }
            const data = await wishListSvc.getAllWishListByFilter(filter)
            res.json({
                detail: data,
                message: "Wish list data fetched successfully",
                status: "GET_WISHLIST_SUCCESS",
                options: null

            })



        } catch (exception) {
            next(exception);

        }
    }
    removeFromWishList = async (req, res, next) => {
        try {
            const wishListId = req.params.id;
            let loggedInUser = req.authUser;
    
            let filter = { _id: wishListId };
    
            if (loggedInUser.role === "customer") {
                filter = { ...filter, userId: loggedInUser._id };
            }
    
            console.log("Filter for wishlist item:", filter); // Debugging line
    
            const wishListDetail = await wishListSvc.getSingleByFilter(filter);
            console.log("Wishlist item found:", wishListDetail); // Debugging line
    
            if (!wishListDetail) {
                return res.status(400).json({
                    data: {},
                    message: "Item does not exist",
                    status: "ITEM_NOT_FOUND",
                    options: null,
                });
            }
    
            const del = await wishListSvc.delete(wishListId);
            res.json({
                detail: del,
                message: "WishList item deleted successfully",
                status: "WISHLIST_ITEM_REMOVED",
                options: null,
            });
        } catch (exception) {
            next(exception);
        }
    };
    
}

const wishListCtrl = new WishListController();
module.exports = wishListCtrl;