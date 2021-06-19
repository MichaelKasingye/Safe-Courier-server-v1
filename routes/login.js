const router = require("express").Router();
const Joi = require("joi");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

const { UserModel } = require("../models/user");

router.post("/auth/login", async (req, res) => {
  const { error } = validation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const { name, password } = req.body;
  try {
    const user = await UserModel.findOne({ name: name });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).send(`Invalid email or password`);
    }
    
    //Token
    const token = jwt.sign(user.toJSON(), "privateKey");
    if (!token) throw Error('Couldnt sign the token');
    
    res.status(200).json({
      acessToken: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      message:`Welcome ${user.name}`
    });

  } catch (error) {
    console.error(error);
    res.status(500).send(`Something is wrong`)
    .json({
      message:`Invalid User name or email`
    });
  }
});

function validation(data) {
  const schema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().required(),
  });
  return schema.validate(data);
}

module.exports = router;
