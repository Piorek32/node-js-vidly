const mongose = require("mongoose");
const Joi = require("@hapi/joi");

const customerSchema = mongose.Schema({
    isGold: Boolean,
    name: String,
    phone: Number
  });
  const Customer = new mongose.model("Customer", customerSchema);



  function validateCustomer(customer) {
    const schema = Joi.object({
      name: Joi.string()
        .min(3)
        .required(),
      phone: Joi.string()
        .min(9)
        .required(),
      isGold: Joi.boolean().required()
    });
  
    return schema.validate(customer);
  }  


  exports.Customer = Customer,
  exports.validate = validateCustomer