module.exports = app => {
    const alarms = require("../controllers/alarm.controller.js");
  
    var router = require("express").Router();
  
    // Create a new alarm
    router.post("/", alarms.create);
  
    // Retrieve all alarms
    router.get("/", alarms.findAll);
  
    // Retrieve a single alarm with id
    router.get("/:id", alarms.findOne);
  
    // Update a alarm with id
    router.put("/:id", alarms.update);
  
    // Delete a alarm with id
    router.delete("/:id", alarms.delete);
  
    // Create a new alarm
    router.delete("/", alarms.deleteAll);
  
    app.use('/api/alarms', router);
};