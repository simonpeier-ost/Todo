import {Request, Response} from 'express'
import {Todo, todoStore} from "../services/todo-service";

export class IndexController {
    constructor() {
        // Initialize default todos when the controller is instantiated
        todoStore.initializeDefaults().catch(error => console.error("Error initializing default todos:", error));
    }

    async index(req: Request, res: Response) {
        const {orderBy, orderDirection, filter} = (req as any).session.userSettings;
        try {
            // Fetch todos from the database
            const order = Number(orderDirection) === -1 ? -1 : 1;
            let todos = await todoStore.all(orderBy as keyof Todo, order); // Assuming you have an `all` method in your TodoStore to fetch all todos
            if (filter === "uncompleted") {
                todos = (todos as Todo[]).filter((todo: Todo) => !todo.finished);
            }

            // Render the index template with the fetched data
            res.render("index", {
                todos: todos,
                sessionUserSettings: (req as any).session.userSettings
            }); // Pass the fetched todos to the template
        } catch (error) {
            console.error("Error fetching todos:", error);
            // Handle error appropriately
            res.status(500).send("Internal Server Error");
        }
    }

    async renderAddTodo(req: Request, res: Response) {
        // Render the index template with the fetched data
        res.render("todo", {sessionUserSettings: (req as any).session.userSettings, edit: false}); // Pass the fetched todos to the template
    }

    async addTodo(req: Request, res: Response) {
        try {
            const {title, importance, dueDate, description, finished} = req.body;
            const newTodo = await todoStore.add(title, importance, dueDate, description, finished);

            if (req.body.action === "update") {
                res.redirect(`/todo/${newTodo._id}`);
            } else {
                res.redirect("/");
            }
        } catch (error) {
            console.error('Error adding todo:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    async renderEditTodo(req: Request, res: Response) {
        const id = String(req.params.id);
        const todo = await todoStore.get(id);
        // Render the index template with the fetched data
        res.render("todo", {todo: todo, sessionUserSettings: (req as any).session.userSettings, edit: true}); // Pass the fetched todos to the template
    }

    async editTodo(req: Request, res: Response) {
        try {
            const id = String(req.params.id);
            const {title, importance, dueDate, description, finished} = req.body;
            await todoStore.update(id, title, importance, dueDate, description, finished);
            if (req.body.action === "update") {
                res.redirect(`/todo/${id}`);
            } else {
                res.redirect("/");
            }
        } catch (error) {
            console.error('Error adding todo:', error);
            res.status(500).send('Internal Server Error');
        }
    }
}

export const indexController = new IndexController();
