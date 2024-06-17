const models = require('../models')
const sequelize = models.sequelize;


//To fetch list of all users
exports.getAllUsers = async (req, res, next) => {
    const allUsers = await models.user.findAll({
        order: [['id', 'DESC']],
        where: { isActive: true }
    });
    if (allUsers.length === 0) {
        return res.status(404).json({
            message: 'Data not Found',
        });
    } else {
        return res.status(200).json({
            message: 'Success',
            data: allUsers,
            count: allUsers.length,
        });
    }
}

//To add task with assignee
exports.addTask = async (req, res, next) => {
    try {
        let { userId, taskName, } = req.body;

        if (!userId || !taskName) {
            return res.status(400).json({
                message: 'Check request body'
            });
        }

        await sequelize.transaction(async (t) => {

            const newTask = await models.task.create({ taskName });
            let taskId = newTask?.dataValues?.id;
            if (taskId) await models.userTask.create({ userId, taskId, isActie: true });
        })

        return res.status(200).json({
            error:0,
            message: 'Task Assigned!'
        });

    } catch (err) {

        return res.status(400).json({
            message: 'Something Went Wrong',
            error: err
        });
    }
}

//To remove task by id
exports.removeTaskById = async (req, res, next) => {
    try {
        if (!req.query.taskId) {
            return res.status(400).json({
                message: 'Task ID required!',
            });
        }
        const TaskData = await models.userTask.findOne({ where: { id: req.query.taskId, isActive: true } });
        if (!TaskData) {
            return res.status(400).json({
                message: 'Task not found or already deleted!',
            });
        } else {
            await models.userTask.update({
                isActive: false
            }, { where: { id: req.query.taskId, isActive: true } });

            return res.status(201).json({
                error:0,
                message: 'User task removed Successfully!'
            });
        }
    } catch (err) {

        return res.status(400).json({
            message: 'Something Went Wrong',
            error: err
        });
    }

}

//To fetch list of all user tasks
exports.getAllUserTask = async (req, res, next) => {
    const allUsers = await models.userTask.findAll({
        order: [['id', 'DESC']],
        where: { isActive: true },
        attributes: ['id', 'isActive'],
        include: [
            {
                model: models.user,
                as: 'userDetails',
                attributes: ['name']
            },
            {
                model: models.task,
                as: 'taskDetails',
                attributes: ['taskName']
            }
        ]
    });
    if (allUsers.length === 0) {
        return res.status(404).json({
            message: 'Data not Found',
        });
    } else {
        return res.status(200).json({
            message: 'Success',
            data: allUsers,
            count: allUsers.length,
        });
    }
}