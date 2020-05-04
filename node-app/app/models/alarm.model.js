module.exports = (sequelize, Sequelize) => {
    const Alarm = sequelize.define("alarm", {
        companyId: {
            type: Sequelize.BIGINT
        },
        stationId: {
            type: Sequelize.BIGINT
        },
        cameraId: {
            type: Sequelize.BIGINT
        },
        message: {
            type: Sequelize.STRING
        },
        timestamp: {
            type: Sequelize.DATE
        },
        state: {
            type: Sequelize.BOOLEAN
        }
    });

    return Alarm;
};