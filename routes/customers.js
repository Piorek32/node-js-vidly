const expres = require("express");
const router = require("express").Router();
const mongose = require("mongoose");
const Joi = require("@hapi/joi");
const  { Customer, validate } = require('../models/customer')



router.get("/", async (req, res) => {
  const customers = await Customer.find().sort({ name: 1 });
  res.send(customers);
});

router.post("/", async (req, res) => {
    console.log(req.body)

  const { error } = validate(req.body);
  if (error) return res.send(error.details[0].message);

  const customer = new Customer({
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone,
    rentals : ""
  });
  let result =  await customer.save();

  res.send(result);
});

router.put("/:id", async (req, res) => {
    const error = validateCustomer(req.body)
    if (error) return res.send(error.details[0].message)
    const customer = await Customer.findByIdAndUpdate(req.params.id , {
    isGold: req.body.isGold || false,
    name: req.body.name,
    phone: req.body.phone
    })
})


router.delete("/:id", async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id)


    res.send(customer)
});

router.get("/:id", async (req, res) => {
let customer;
try {
 customer = await Customer.findById(req.params.id);
} catch (error) {
    return res.status(404).send("kient o takim id nie istnieje")
}

    
   
    res.send(customer)
});




module.exports = router;
