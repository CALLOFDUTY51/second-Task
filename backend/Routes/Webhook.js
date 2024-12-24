const router=require("express").Router()
const WebhookController=require("../Controller/WebhookController")


router.post('/statusChange',WebhookController.statusChange)
module.exports=router