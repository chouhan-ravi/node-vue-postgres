const db = require("../models");
const Alarm = db.alarms;
const Op = db.Sequelize.Op;

exports.saveAlarm = (alarm) => {
    Alarm.create(alarm)
    .then(data => {
        return data;
    })
    .catch(err => { 
        return err;
    });
};