const router = require("express").Router();
const auth = require("../middleware/auth");
const jwt = require('jsonwebtoken');

const bcrypt = require("bcrypt");
const { UserModel, validation } = require("../models/user");


//@route  POST auth/signup
//@desc   Create a user
//@access Public
router.post("/auth/signup", async (req, res) => {
    const { error } = validation(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
  
    try {
      const { name, email, password } = req.body;
      let user = await UserModel.findOne({ email: email });
      if (user)
        return res.status(400).send(`User with email: ${email} already exists`)
        .json({
          message:`User with email: ${email} already exists`
        });
  
      const salt = await bcrypt.genSalt(10);
      user = await new UserModel({
        name: name,
        email: email,
        password: await bcrypt.hash(password, salt),
      });

      const savedUser = await user.save();
      if (!savedUser) throw Error('Something went wrong saving the user');
      // res.status(201).send(user);

      //TOken
      const token = jwt.sign(user.toJSON(), "privateKey");
      if (!token) throw Error('Couldnt sign the token');
      
      res.status(200).json({
        acessToken: token,
        user: user,
        message:`Welcome ${user.name}`
      });


    } catch (error) {
      res.status(500).send(`Something went wrong`)
      .json({
        message:`Invalid User name or email`
      });
    }

 

  });

module.exports = router;