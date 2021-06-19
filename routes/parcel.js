const express = require("express");
const router = express.Router();
const parcel = require("../models/parcel");
const auth = require("../middleware/auth")
const {UserModel} = require("../models/user");
const mongoose  = require("mongoose");


//@route  Get api/v1/parcel
//@desc   Get All parcel
//@access Public
router.get("/parcel",auth, (req, res) => {
   parcel.find()
  // .select("User name _id")
  .sort({ date: -1 })
  // .populate('user')
  // .exec()
    .then((parcels) => res.json(parcels))
    .catch(error=>{
      console.log(error)
      res.status(500).json({
		  message:`server error`,
        error:error
      })
    });
});

//@route  get api/v1/parcel/:parcelId/
//@desc   Create a parcel
//@access Public
router.get("/parcel/:parcelId/", (req, res) => {
  const parcelId = req.params.parcelId;
  parcel.find({"_id":parcelId})
    .sort({ date: -1 })
    .then((parcels) => {
      if (!parcels) {
        return res.status(404).send(`no such id ${userId}`)
        .json({
          message:`No such id ${userId}`
        })
      }
      res.json(parcels)
    })
    .catch(error => {
      console.log(error)
      res.status(400).send(`Invalid user id ${userId}`)
      .json({
        message:`Invalid user id ${userId}`
      })
    });
});


//@route  Get api/v1/users/<userId>/parcels
//@desc   Get All parcel
//@access Public
router.get("/users/:userId/parcels",auth, (req, res) => {
  const userId = req.params.userId;
  parcel.find({"user._id":userId})
    .sort({ date: -1 })
    .then((parcels) => {
      if (!parcels) {
        return res.status(404).send(`no such id ${userId}`)
      }
      res.json(parcels)
    })
    .catch(error => {
      console.log(error)
      res.status(400).send(`Invalid user id ${userId}`)
    });
});


//@route  POST api/v1/parcel
//@desc   Create a parcel
//@access Public
router.post("/parcel",auth, (req, res) => {
  const { params, body, user } = req;
  // user = UserModel.find();
//  const detailUser = user.populate('user')
// console.log(user);
  const newParcel = new parcel(
    
    {    user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    parcelName: req.body.parcelName,
    pickUp: req.body.pickUp,
    destination: req.body.destination,
    isCancelled: req.body.isCancelled,
    status: req.body.status,
  });
  newParcel.save()
  .then((parcel) => res.json(parcel))
  .catch(error=> {
    console.log(error)
  res.status(500).json({
    message:`Check your input information`
  })
  });
});


//@route  Put api/v1/parcel
//@desc   Create a parcel
//@access Public
router.put("/parcel/:parcelId/cancel", (req, res) => {
  const id = req.params.parcelId;
  
  parcel.updateOne({ _id: id }, {
      isCancelled: req.body.isCancelled,
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
router.put("/parcel/:parcelId/destination",auth, (req, res) => {
  const id = req.params.parcelId;
  
  parcel.updateOne({ _id: id }, {
    destination: req.body.destination,
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
module.exports = router;
