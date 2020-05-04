module.exports = {
    DATABASE_URL: process.env.POSTGRES_DATABASE_URL || '',
    HOST: process.env.POSTGRES_HOST || "127.0.0.1",
    USER: process.env.POSTGRES_USER || "root",
    PASSWORD: process.env.POSTGRES_PASSWORD || "s3kr1t",
    DB: process.env.POSTGRES_DB || "nodeApp",
    dialect: process.env.POSTGRES_DIALECT || "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};