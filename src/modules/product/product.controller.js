const { createdBy } = require("../../common/schema");
const authSvc = require("../auth/auth.service");
const productSvc = require("./product.service");

class ProductController {
    store = async (req, res, next) => {
        //TODO: Store operate 
        try {
            const data = await productSvc.transformCreateRequest(req);
            //database store
            const product = await productSvc.createProduct(data)

            res.json({
                detail: product,
                message: "Product Created SuccessFully",
                status: "BANNER_CREATE_SUCCESS",
                options: null
            })

        } catch (exception) {
            next(exception);
        }
    }

    index = async (req, res, next) => {
        try {

            //pagination
            //100 data
            //per page:10 data=>pages=10

            let page = +req.query.page || 1;
            let limit = +req.query.limit || 10;
            let skip = (page - 1) * limit;

            let filter = {};

            if (req.query.search) {
                filter = {
                    $or: [{ title: new RegExp(req.query.search, 'i') },
                    { status: new RegExp(req.query.search, 'i') }]
                }
            }


            let data = await productSvc.listAllProduct({ skip, limit, filter })

            const totalCount = await productSvc.countData(filter);

            res.json({
                detail: data,
                message: "Product List SuccessFully",
                status: "BANNER_LIST_SUCCESS",
                options: {
                    currentPage: page,
                    limit: limit,
                    totalData: totalCount
                }

            })

        } catch (exception) {
            next(exception);
        }
    }



    detail = async (req, res, next) => {
        try {
            const id = req.params.id;
            const data = await productSvc.getSingleByFilter({
                _id: id
            });
            res.json({
                detail: data,
                message: "Product Fetched SuccessFully",
                status: "BANNER_SUCCESS",
                options: null
            })


        } catch (exception) {
            next(exception);
        }
    }

    update = async (req, res, next) => {
        try {
            const data = await productSvc.getSingleByFilter({
                _id: req.params.id
            })
            const transformData = await productSvc.transformUpdateRequest(req, data);
            const response = await productSvc.updateByFilter({
                _id: req.params.id
            }, transformData)

            res.json({
                detail: response,
                message: "Product Updated SuccessFully",
                status: "BANNER_UPDATE_SUCCESS",
                options: null

            })

        } catch (exception) {
            next(exception);
        }
    }

    delete = async (req, res, next) => {
        try {
            const data = await productSvc.getSingleByFilter({
                _id: req.params.id
            })
            const response = await productSvc.deleteByFilter({
                _id: req.params.id
            })
            res.json({
                detail: response,
                message: "Product Deleted SuccessFully",
                status: "BANNER_DELETE_SUCCESS",
                options: null

            })

        } catch (exception) {
            next(exception);
        }


    }
    getForHome = async (req, res, next) => {
        try {
            let page = +req.query.page || 1;
            let limit = +req.query.limit || 10;
            let skip = (page - 1) * limit;

            let filter = { $and: [{ status: 'active' }] };
            if (req.query.search) {
                filter.$or = [
                    { title: new RegExp(req.query.search, 'i') },
                    { description: new RegExp(req.query.search, 'i') },
                    { slug: new RegExp(req.query.search, 'i') }

                ]
            }
            const listProduct = await productSvc.listAllProduct({ skip, limit, filter })
            res.json({
                detail: listProduct,
                message: "Product List For Home Page",
                status: "BANNER_LIST_HOME_SUCCESS",
                options: null
            })


        } catch (exception) {
            next(exception);
        }
    }
    getDealsProduct = async (req, res, next) => {
        try {
            const listProduct = await productSvc.listAllProduct({
                skip: 0,
                limit: 10,
                filter: {
                    $and: [{ status: 'active' }, {
                        discount: { $ne: 0 }
                    }]
                }
            })
            res.json({
                detail: listProduct,
                message: "Product List For Home Page",
                status: "BANNER_LIST_HOME_SUCCESS",
                options: null
            })


        } catch (exception) {
            next(exception);
        }
    }

    getBySlug = async (req, res, next) => {
        try {
            const slug = req.params.slug;
            const productDetail = await productSvc.getSingleByFilter({
                slug: slug
            })


            //related products logic
            const listRelated = await productSvc.listAllProduct({
                skip: 0,
                limit: 8,
                filter: {
                    slug: { $ne: slug },
                    category: productDetail.category
                }
            })
            res.json({
                detail: {
                    product: productDetail,
                    related: listRelated
                },
                message: "Product Detail",
                status: "PRODUCT_DETAIL_SUCCESS",
                options: null
            })


        } catch (exception) {
            next(exception);
        }

    }
    getShopsItem = async (req, res, next) => {
        try {

            const seller = req.authUser._id;

            //pagination
            //100 data
            //per page:10 data=>pages=10

            let page = +req.query.page || 1;
            let limit = +req.query.limit || 10;
            let skip = (page - 1) * limit;

            let filter = { createdBy: seller };

            if (req.query.search) {
                filter = {
                    $or: [{ title: new RegExp(req.query.search, 'i') },
                    { status: new RegExp(req.query.search, 'i') },
                    ]
                }
            }


            let data = await productSvc.listAllProduct({ skip, limit, filter })

            const totalCount = await productSvc.countData(filter);

            res.json({
                detail: data,
                message: "Product List SuccessFully",
                status: "BANNER_LIST_SUCCESS",
                options: {
                    currentPage: page,
                    limit: limit,
                    totalData: totalCount
                }

            })

        } catch (exception) {
            next(exception);
        }
    }

    getNewProduct = async (req, res, next) => {
        try {
            let page = +req.query.page || 1;
            let limit = +req.query.limit || 10;
            let skip = (page - 1) * limit;
            let sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

            let filter = { $and: [{ status: 'active' }, { createdAt: { $gte: sevenDaysAgo } }] };
            const listProduct = await productSvc.listAllProduct({ skip, limit, filter })
            res.json({
                detail: listProduct,
                message: "New Arrivals  For Home Page",
                status: "NEW_ARRIVALS_LIST_SUCCESS",
                options: null
            })


        } catch (exception) {
            next(exception);
        }
    }

}

const productCtrl = new ProductController()
module.exports = productCtrl;