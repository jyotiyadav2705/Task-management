module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "2705@Jyoti", //password your db
    DB: "assignment2",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};