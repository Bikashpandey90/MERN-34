const emailSvc = require("../../services/mail.service")

class MicroServices {

    sendConfirmationMail = async (email) => {
        try {
            let msg = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Newsletter Subscription</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 10px;
            background-color: #f9f9f9;
        }
        .header {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .footer {
            font-size: 12px;
            color: #777;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <p class="header">Dear User,</p>
        <p>Thank you for subscribing to our newsletter. You will now receive the latest deals, exclusive offers, and discount coupons.</p>
        <p>Warm regards,</p>
        <p>Ecom Store</p>
        <p class="footer"><em>Please do not reply to this email directly.</em></p>
    </div>
</body>
</html>
`

            await emailSvc.sendEmail({
                to: email,
                subject: "Newsletter Subscription",
                message: msg
            })

        } catch (exception) {
            throw exception
        }
    }


}
const microSvc = new MicroServices()
module.exports = microSvc