const router=require("express").Router()
const PaymentController=require("../Controller/PaymentController")

router.post('/payment',PaymentController.ProductPayment)
router.get('/transactions',PaymentController.getTransactions)
module.exports=router