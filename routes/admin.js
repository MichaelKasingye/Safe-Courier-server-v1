const express = require("express");
const router = express.Router();
const parcel = require("../models/parcel");
const {AdminModel} = require("../models/admin");
const bcrypt = require("bcrypt");
const Joi = require("joi");

const jwt = require('jsonwebtoken');
const mongoose  = require("mongoose");


//@route  Get api/v1/admin/parcel
//@desc   Get All parcel
//@access Public
router.get("/admin/parcel", (req, res) => {
   parcel.find()
  .sort({ date: -1 })
    .then((parcels) => res.json(parcels))
    .catch(error=>{
      console.log(error)
      res.status(500).json({
        error:error
      })
    });
});



//@route  Put api/v1/parcel
//@desc   Create a parcel
//@access Public
router.put("/parcel/:parcelId/status", (req, res) => {
  const id = req.params.parcelId;
  
  parcel.updateOne({ _id: id }, {
    status: req.body.status,
    })
  .then(() => {
   parcel.findOne({_id: id })
   .then(result =>res.send(result))
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err,
      message:`server error`
    });
  });
});

//@route  Put api/v1/parcel
//@desc   Create a parcel
//@access Public
router.put("/parcel/:parcelId/presentLocation", (req, res) => {
    const id = req.params.parcelId;
    
    parcel.updateOne({ _id: id }, {
        pickUp: req.body.pickUp,
      })
    .then(() => {
     parcel.findOne({_id: id })
     .then(result =>res.send(result))
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err,
        message:`server error`
      });
    });
  });

//@route  Delete api/parcel
//@desc   Delete an parcel
//@access Public
router.delete("/parcel/:id", (req, res) => {
  parcel.findById(req.params.id)
    .then((parcel) => parcel
    .remove()
    .then(() => res.json({
       Success: true,
       message:`information deleted`
       })))
    .catch((err) => res.status(404).json({ Success: false }));
});


//AUTHS

//@route  POST auth/signup
//@desc   Create a user
//@access Public
router.post("/admin/auth/signup", async (req, res) => {
  const { error } = validation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    const { name, email, password } = req.body;
    let user = await AdminModel.findOne({ email: email });
    if (user)
      return res.status(400).send(`User with email: ${email} already exists`)
      .json({
        message:`User with email: ${email} already exists`
      });

    const salt = await bcrypt.genSalt(10);
    user = await new AdminModel({
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

//@route  post /admin/auth/login
//@desc   Login
//@access Public
router.post("/admin/auth/login", async (req, res) => {
  const { error } = validation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const { name, password } = req.body;
  try {
    const user = await AdminModel.findOne({ name: name });
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
    res.status(500)
    .send(`Something is wrong`)
    .json({
      message:`Invalid User name or password`
    });
  }
});


function validation(data) {
  const schema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string()
  });
  return schema.validate(data);
}



module.exports = router;
