const express=require("express")

const app=express()

const stripe=require("stripe")("sk_test_51QXAuJ01G69PQEFoNbw0tREUThb5xvpCesP59WgfFMS1rsAEjeCaAqkhTxceAm9AD7r1kWq83wyldD0GjypdRung00xZKl8et9")
app.use(express.json())


app.listen(9000,()=>{
    console.log("App is listening on port 9000")
})

