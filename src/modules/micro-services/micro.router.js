const { bodyValidator } = require("../../middlewares/bodyvalidator.middleware")
const microCtrl = require("./micro.controller")
const { newsLetterDTO } = require("./micro.validator")

const microRouter = require("express").Router()

microRouter.post('/news-letter', bodyValidator(newsLetterDTO), microCtrl.newsLetter)

module.exports = microRouter