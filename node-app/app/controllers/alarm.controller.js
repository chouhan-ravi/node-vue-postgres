const db = require("../models");
const Alarm = db.alarms;
const Op = db.Sequelize.Op;

// Create and Save a new Alarm
exports.create = (req, res) => {
    // Validate request
    if (!req.body.companyId) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Alarm
    const alarm = {
        companyId: req.body.companyId,
        stationId: req.body.stationId,
        cameraId: req.body.cameraId,
        message: req.body.message,
        timestamp: req.body.timestamp,
        state: req.body.state ? req.body.state : false
    };

    // Save Alarm in the database
    Alarm.create(alarm)
    .then(data => {
        res.send({state: data.state});
    })
    .catch(err => { 
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Alarm."
        });
    });
};

// Retrieve all Alarms from the database.
exports.findAll = (req, res) => {
    const search = req.query.q;
    var condition = search ? { message: { [Op.like]: `%${search}%` } } : null;

    Alarm.findAll({ where: condition })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving alarms."
        });
    });
};

// Find a single Alarms with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Alarm.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving Alarm with id=" + id
        });
    });
};

// Update a Alarm by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Alarm.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Alarm was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Alarm with id=${id}. Maybe Alarm was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Alarm with id=" + id
        });
    });
};

// Delete a Alarm with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Alarm.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Alarm was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Alarm with id=${id}. Maybe Alarm was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Alarm with id=" + id
        });
    });
};

// Delete all Alarms from the database.
exports.deleteAll = (req, res) => {
    Alarm.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({ message: `${nums} Alarm were deleted successfully!` });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while removing all alarms."
        });
    });
};