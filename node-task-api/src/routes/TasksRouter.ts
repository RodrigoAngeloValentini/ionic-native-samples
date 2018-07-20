import { Router, Request, Response, NextFunction } from 'express';

let TASKS = require('../tasks.data');

export class TasksRouter {

    router: Router

    /**
     * Initialize the TasksRouter
     */
    constructor() {
        this.router = Router();
        this.init();
    }

    /**
     * GET all Tasks.
     */
    public getAll(req: Request, res: Response, next: NextFunction) {
        res.send({
            data: TASKS,
            status: true,
            timestamp: new Date().getTime()
        });
    }

    /**
     * GET one task by id
     */
    public getOne(req: Request, res: Response, next: NextFunction) {
        let query = parseInt(req.params.id);
        let task = TASKS.find(task => task.id === query);
        if (task) {
            res.status(200)
                .send({
                    data: task,
                    status: true,
                    timestamp: new Date().getTime()
                });
        } else {
            res.status(404)
                .send({
                    status: false
                });
        }
    }

    /**
     * POST create one task
     */
    public create(req: Request, res: Response, next: NextFunction) {

        let newTask = req.body;
        newTask.synchronized = ('synchronized' in newTask);
        if (!newTask.id) { newTask.id = new Date().getTime(); }
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
    public update(req: Request, res: Response, next: NextFunction) {

        // param and body
        let taskId: number = parseInt(req.params.id);
        let updatedTask = req.body;

        // task in server 
        let serverTask = TASKS.find(task => task.id === taskId);

        if (serverTask) {

            // task id in server
            let serverTaskId: number = TASKS.indexOf(serverTask);

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

        } else {
            res.status(404)
                .send({
                    status: false
                });
        }
    }

    /**
     * DELETE one task
     */
    public delete(req: Request, res: Response, next: NextFunction) {
        let taskId: number = parseInt(req.params.id);

        if (TASKS.some(task => task.id === taskId)) {
            TASKS = TASKS.filter(task => task.id !== taskId);
            res.status(202)
                .send({
                    status: true
                });
        } else {
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

// Create the TasksRouter, and export its configured Express.Router
const tasksRoutes = new TasksRouter();
tasksRoutes.init();

export default tasksRoutes.router;