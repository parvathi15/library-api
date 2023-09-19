const router = require("express").Router();
let Recipe = require("../models/recipe.model.js");
const mongoose = require("mongoose"); //for database

router.route("/").get((req, res) => {
    Recipe.find()
    .then(members => res.json(members))
    .catch(err => res.status(400).json("Error: " + err));
});


router.route("/add").post((req, res) => {
  const recipeid = Number(req.body.recipeid);
  const title = req.body.title;
const newExercise = new Recipe({

    recipeid,
    title
  });

  newExercise
    .save()
    .then(() => res.json("Recipe added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
    Recipe.findById(req.params.id)
    .then(member => res.json(member))
    .catch(err => res.status(400).json("Error: " + err));
});
router.route("/:id").delete((req, res) => {
    Recipe.findByIdAndDelete(req.params.id)
    .then(() => res.json("Recipe deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:id").put((req, res) => {
    Recipe.findById(req.params.id)
    .then(recipe => {
        recipe.recipeid = Number(req.body.recipeid);
        recipe.title = req.body.title;
       
        recipe
        .save()
        .then(() => res.json("recipe updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/title/:param").get((req, res) => {
    var param = req.param("param");
    console.log(param);
  
    var query = {};
  
    try {
      var id = mongoose.mongo.ObjectID(param);
      query = { id: id };
    } catch {
       query = { title: new RegExp(param, "i") };
      // query = { title: param };
    }
  
    mongoose.model("Recipe").find(query, function(err, obj) {
      res.send(obj);
      console.log(obj);
    });
  });



module.exports = router;