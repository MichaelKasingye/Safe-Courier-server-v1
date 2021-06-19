const mongoose = require('mongoose');
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const schema = new mongoose.Schema({
    name: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  });

 
  exports.validation = (data) => {
    const schema = Joi.object({
      name: Joi.string().required().min(3).max(250),
      email: Joi.string()
        .email({ tlds: { allow: ["com", "net", "org", "ug"] } })
        .required(),
      password: Joi.string().required(),
      password_conf: Joi.ref("password"),
    });
    return schema.validate(data);
  };

  exports.AdminModel = mongoose.model("theAdmin", schema);