const bannerSvc = require("./banner.service");

class BannerController {
    store = async (req, res, next) => {
        //TODO: Store operate 
        try {
            const data = await bannerSvc.transformCreateRequest(req);
            //database store
            const banner = await bannerSvc.createBanner(data)

            res.json({
                detail: banner,
                message: "Banner Created SuccessFully",
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
                filter.$or = [
                    { title: new RegExp(req.query.search, 'i') },
                    { status: new RegExp(req.query.search, 'i') }
                ]
            }



            let data = await bannerSvc.listAllBanner({ skip, limit, filter })

            const totalCount = await bannerSvc.countData(filter);

            res.json({
                detail: data,
                message: "Banner List SuccessFully",
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
            const data = await bannerSvc.getSingleByFilter({
                _id: id
            });
            res.json({
                detail: data,
                message: "Banner Fetched SuccessFully",
                status: "BANNER_SUCCESS",
                options: null
            })


        } catch (exception) {
            next(exception);
        }
    }

    update = async (req, res, next) => {
        try {
            const data = await bannerSvc.getSingleByFilter({
                _id: req.params.id
            })
            const transformData = await bannerSvc.transformUpdateRequest(req, data);
            const response = await bannerSvc.updateByFilter({
                _id: req.params.id
            }, transformData)

            res.json({
                detail: response,
                message: "Banner Updated SuccessFully",
                status: "BANNER_UPDATE_SUCCESS",
                options: null

            })

        } catch (exception) {
            next(exception);
        }
    }

    delete = async (req, res, next) => {
        try {
            const data = await bannerSvc.getSingleByFilter({
                _id: req.params.id
            })
            if (!data) {
                throw new Error("Banner Not Found");
            }
            const response = await bannerSvc.deleteByFilter({
                _id: req.params.id
            })
            res.json({
                detail: response,
                message: "Banner Deleted SuccessFully",
                status: "BANNER_DELETE_SUCCESS",
                options: null

            })

        } catch (exception) {
            next(exception);
        }


    }
    getForHome = async (req, res, next) => {
        try {
            let filter = {
                $and: [{ status: 'active' },
                { startDate: { $lte: new Date() } },
                { endDate: { $gte: new Date() } }
                ]
            }

            const listBanner = await bannerSvc.listAllBanner({
                skip: 0,
                limit: 10,
                filter: filter
            })

            res.json({
                detail: listBanner,
                message: "Banner List For Home Page",
                status: "BANNER_LIST_HOME_SUCCESS",
                options: null
            })


        } catch (exception) {
            next(exception);
        }
    }
}

const bannerCtrl = new BannerController()
module.exports = bannerCtrl;