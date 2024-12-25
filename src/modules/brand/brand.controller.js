const brandSvc = require("./brand.service");

class BrandController{
    store=async(req,res,next)=>{
        //TODO: Store operate 
       try{
        const data =await brandSvc.transformCreateRequest(req);
        //database store
        const brand=await brandSvc.createBrand(data)

        res.json({
            detail:brand,
            message:"Brand Created SuccessFully",
            status:"BANNER_CREATE_SUCCESS",
            options:null
        })

       }catch(exception){
        next(exception);
       }
    }

    index=async(req,res,next)=>{
        try{

            //pagination
            //100 data
            //per page:10 data=>pages=10

            let page=+req.query.page || 1;
            let limit=+req.query.page ||10;
            let skip=(page-1)*limit;

            let filter={};

            if(req.query.search){
                filter={
                    $or:[{title:new RegExp(req.query.search,'i')},
                    {status:new RegExp(req.query.search,'i')}]
                }
            }


            let data=await brandSvc.listAllBrand({skip,limit,filter})

            const totalCount=await brandSvc.countData(filter);

            res.json({
                detail:data,
                message:"Brand List SuccessFully",
                status:"BANNER_LIST_SUCCESS",
                options:{
                    currentPage:page,
                    limit:limit,
                    totalData:totalCount
                }

            })

        }catch(exception){
            next(exception);
        }
    }

    detail=async(req,res,next)=>{
        try{
            const id=req.params.id;
            const data=await brandSvc.getSingleByFilter({
                _id:id
            });
            res.json({
                detail:data,
                message:"Brand Fetched SuccessFully",
                status:"BANNER_SUCCESS",
                options:null
            })


        }catch(exception){
            next(exception);
        }
    }

    update =async(req,res,next)=>{
        try{
            const data=await brandSvc.getSingleByFilter({
                _id:req.params.id
            })
            const transformData=await brandSvc.transformUpdateRequest(req,data);
            const response=await brandSvc.updateByFilter({
                _id:req.params.id
            },transformData)

            res.json({
                detail:response,
                message:"Brand Updated SuccessFully",
                status:"BANNER_UPDATE_SUCCESS",
                options:null

            })

        }catch(exception){
            next(exception);
        }
    }

    delete=async(req,res,next)=>{
        try{
            const data=await brandSvc.getSingleByFilter({
                _id:req.params.id
            })
            const response=await brandSvc.deleteByFilter({
                _id:req.params.id
            })
            res.json({
                detail:response,
                message:"Brand Deleted SuccessFully",
                status:"BANNER_DELETE_SUCCESS",
                options:null

            })

        }catch(exception){
            next(exception);
        }


    }
    getForHome=async(req,res,next)=>{
        try{
            const listBrand=await brandSvc.listAllBrand({
                skip:0,
                limit :10,
                filter:{
                    $and:[{ status:'active'},
                        {startDate:{$lte:new Date()}},
                        {endDate:{$gte:new Date()}}
                    ]
                }
            })
            res.json({
                detail:listBrand,
                message:"Brand List For Home Page",
                status:"BANNER_LIST_HOME_SUCCESS",
                options:null
            })


        }catch(exception){
            next(exception);
        }
    }
}

const brandCtrl=new BrandController()
module.exports=brandCtrl;