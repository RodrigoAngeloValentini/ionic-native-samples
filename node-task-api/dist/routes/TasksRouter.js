"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let TASKS = require('../tasks.data');
class TasksRouter {
    /**
     * Initialize the TasksRouter
     */
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    /**
     * GET all Tasks.
     */
    getAll(req, res, next) {
        res.send({
            data: TASKS,
            status: true,
            timestamp: new Date().getTime()
        });
    }
    /**
     * GET one task by id
     */
    getOne(req, res, next) {
        let query = parseInt(req.params.id);
        let task = TASKS.find(task => task.id === query);
        if (task) {
            res.status(200)
                .send({
                data: task,
                status: true,
                timestamp: new Date().getTime()
            });
        }
        else {
            res.status(404)
                .send({
                status: false
            });
        }
    }
    /**
     * POST create one task
     */
    create(req, res, next) {
        let newTask = req.body;
        newTask.synchronized = ('synchronized' in newTask);
        if (!newTask.id) {
            newTask.id = new Date().getTime();
        }
        TASKS.push(newTask);
        res.status(201)
            .send({
            data: newTask,
            status: res.status,
            timestamp: new Date().getTime()
        });
    }
    /**
     * PUT update one task
     */
    update(req, res, next) {
        // param and body
        let taskId = parseInt(req.params.id);
        let updatedTask = req.body;
        // task in server 
        let serverTask = TASKS.find(task => task.id === taskId);
        if (serverTask) {
            // task id in server
            let serverTaskId = TASKS.indexOf(serverTask);
            // make sure the 'id' attribute is deleted
            delete updatedTask.id;
            // set the 'id' of updated task
            updatedTask.id = taskId;
            // update the array of tasks
            TASKS.splice(serverTaskId, 1, updatedTask);
            res.status(200)
                .send({
                data: updatedTask,
                status: true,
                timestamp: new Date().getTime()
            });
        }
        else {
            res.status(404)
                .send({
                status: false
            });
        }
    }
    /**
     * DELETE one task
     */
    delete(req, res, next) {
        let taskId = parseInt(req.params.id);
        if (TASKS.some(task => task.id === taskId)) {
            TASKS = TASKS.filter(task => task.id !== taskId);
            res.status(202)
                .send({
                status: true
            });
        }
        else {
            res.status(404)
                .send({
                status: false
            });
        }
    }
    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init() {
        this.router.get('/', this.getAll);
        this.router.get('/:id', this.getOne);
        this.router.post('/', this.create);
        this.router.put('/:id', this.update);
        this.router.delete('/:id', this.delete);
    }
}
exports.TasksRouter = TasksRouter;
// Create the TasksRouter, and export its configured Express.Router
const tasksRoutes = new TasksRouter();
tasksRoutes.init();
exports.default = tasksRoutes.router;
