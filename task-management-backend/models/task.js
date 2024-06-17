module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('task', {
        // attributes

        taskName: {
            type: DataTypes.STRING
        },

    }, {
        freezeTableName: true,
        tableName: 'task',
    });

    return Task;
}