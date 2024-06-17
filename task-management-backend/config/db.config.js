module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "XXXX", //password your db
    DB: "DATABASE",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};