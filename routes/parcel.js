const { json } = require("express");
const express = require("express");
const router = express.Router();

let parcels = [
  {
    isCancelled: false,
    id: "ZA3",
    user: {
        id: "ZK4QW",
        name: "Victoria Grace Mark",
        email: "vicky@gmail.com"
    },
    parcelName: "2kg of salt",
    pickUp: "Mbuya",
    destination: "Seta",
    status: "openeddsdsd",
  },
  {
    isCancelled: false,
    id: "Z3",
    user: {
        id: "Z4QW",
        name: "Zulu John Mark",
        email: "zulu@gmail.com"
    },
    parcelName: "2kg of salt",
    pickUp: "Mbuya",
    destination: "Seta",
    status: "openeddsdsd",
  },
  {
    isCancelled: false,
    id: "K3",
    user: {
        id: "K4QW",
        name: "Kato Mark",
        email: "Male@gmail.com"
    },
    parcelName: "2kg of salt",
    pickUp: "Mbuya",
    destination: "Seta",
    status: "openeddsdsd",
  },
  {
    isCancelled: false,
    id: "r6",
    user: {
        id: "B4QW",
        name: "Male Bob",
        email: "mb@gmail.com"
    },
    parcelName: "2kg of salt",
    pickUp: "Mbuya",
    destination: "Seta",
    status: "openeddsdsd",
  },
  {
    isCancelled: false,
    id: "B4",
    user: {
        id: "B2QW",
        name: "Male Bob",
        email: "mb@gmail.com"
    },
    parcelName: "2kg of salt",
    pickUp: "Mbuya",
    destination: "Seta",
    status: "openeddsdsd",
  },
  {
    isCancelled: false,
    id: "B3",
    user: {
        id: "a2ws",
        name: "Mark Smith",
        email: "JM@gmail.com"
    },
    parcelName: "2kg of salt",
    pickUp: "Mbuya",
    destination: "Seta",
    status: "openeddsdsd",
  },
  {
    isCancelled: false,
    id: "B1",
    user: {
        id: "A21w",
        name: "John Smith",
        email: "JM@gmail.com"
    },
    parcelName: "42kg of salt",
    pickUp: "Kansanga",
    destination: "mbuya",
    status: "openeddsdsd",
  },
   {
  isCancelled: false,
  id: "2",
  user: {
      id: "a2",
      name: "Mike",
      email: "mk@gmail.com"
  },
  parcelName: "2kg of salt",
  pickUp: "Ntinda",
  destination: "Kololo",
  status: "OnBoarded",
},
 {
  isCancelled: false,
  id: "3",
  user: {
      id: "a3",
      name: "John",
      email: "j@gmail.com"
  },
  parcelName: "2kg of beans",
  pickUp: "Ntinda",
  destination: "Kololo",
  status: "OnBoarded",
},
{
isCancelled: false,
id: "4",
user: {
   id: "a4",
   name: "Bob",
   email: "m@gmail.com"
},
parcelName: "2kg of salt",
pickUp: "Ntinda",
destination: "Kololo",
status: "OnBoarded",
}
];

//@route  Get api/v1/parcel
//@desc   Get All parcel
//@access Public
router.get("/parcel", (req, res) => {
  console.log(`All Parcels : ${parcels}`);
  res.send(parcels),json();
});

//@route  get api/v1/parcel/:parcelId/
//@desc   Create a parcel
//@access Public
router.get("/parcel/:parcelId/", (req, res) => {
  const parcelId = req.params.parcelId;
  console.log(parcelId);

  parcels.filter((parcels) => parcels.id === parcelId)
  .map((parcels)=>{
    res.send(parcels)
    console.log(parcels)

  })
});


//@route  Get api/v1/users/<userId>/parcels
//@desc   Get All parcel
//@access Public
router.get("/users/:userId/parcels", (req, res) => {
  const userId = req.params.userId;
  console.log(userId);

  parcels.filter((parcels) => parcels.user.id === userId)
  .map((parcels)=>{
    res.send(parcels)
    console.log(parcels)

  })
});


//@route  POST api/v1/parcel
//@desc   Create a parcel
//@access Public
router.post("/parcel", (req, res) => {
  const parcel = req.body;

  parcels.push({...parcel});
    
    console.log(`parcels [${parcels}] added.`);
    res.send(parcels)
});


//@route  Put api/v1/parcel
//@desc   Create a parcel
//@access Public
router.put("/parcel/:parcelId/cancel", (req, res) => {
  const itemParcel = parcels.find((parcels) => parcels.id === req.params.parcelId);
  parcels.isCancelled = req.body.isCancelled;
  console.log(parcels.isCancelled);

  res.send(`parcelId has been updated to ${req.body.isCancelled}`)
});


module.exports = router;
