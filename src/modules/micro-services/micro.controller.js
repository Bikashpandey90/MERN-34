const { options } = require("joi")
const microSvc = require("./micro.services")

class MicroController {

    newsLetter = async (req, res, next) => {
        try {

            const data = req.body
            const email = microSvc.sendConfirmationMail(data.email)

            res.json({
                detail: null,
                message: "News Letter Subscribed",
                status: "NEWSLETTER_ACTIVATED",
                options: null

            })


        } catch (exception) {
            next(exception)
        }
    }

}

const microCtrl = new MicroController()
module.exports = microCtrl