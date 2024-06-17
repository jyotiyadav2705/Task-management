module.exports = (sequelize, DataTypes) => {
    const UserTask = sequelize.define('userTask', {
        // attributes

        taskId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
    }, {
        freezeTableName: true,
        allowNull: false,
        tableName: 'userTask'
    });

    UserTask.associate = function (models) {
        UserTask.belongsTo(models.user, { foreignKey: 'userId', as: 'userDetails' });
        UserTask.belongsTo(models.task, { foreignKey: 'taskId', as: 'taskDetails' });
    }
    return UserTask;
}