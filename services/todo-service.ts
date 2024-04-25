import Datastore from 'nedb-promises'

export class Todo {
    public _id?: string

    constructor(
        id: string | null,
        public title: string,
        public importance: number,
        public dueDate: Date,
        public description: string,
        public finished: boolean
    ) {
        if (id !== null) {
            this._id = id;
        }
    }
}

export class TodoStore {
    constructor(public db?: Datastore) {
        const options = process.env.DB_TYPE === "FILE" ? {filename: './data/todos.db', autoload: true} : {}
        this.db = db || new Datastore(options);
    }

    async add(title: string, importance: number, dueDate: Date, description: string, finished: boolean,): Promise<Todo> {
        const todo = new Todo(null, title, Number(importance), new Date(dueDate), description, finished);
        return this.db!.insert(todo);
    }

    async update(id: string, title: string, importance: number, dueDate: Date, description: string, finished: boolean): Promise<number> {
        importance = Number(importance);
        return this.db!.update({_id: id}, {$set: {title, importance, dueDate, description, finished}})
    }

    async delete(id: string): Promise<Document> {
        await this.db!.update({_id: id}, {$set: {"state": "DELETED"}});
        return this.get(id);
    }

    async get(id: string): Promise<Document> {
        return this.db!.findOne({_id: id});
    }

    async all(): Promise<Todo[]> {
        return this.db!.find({});
    }

    async initializeDefaults(): Promise<void> {
        await this.db!.remove({}, {multi: true});

        const defaultTodos: Todo[] = [
            new Todo(null, "Clean the house", 4, new Date(), "House is dirty as fxxk", true),
            new Todo(null, "Grocery shopping", 2, new Date(), "Nomnom, me hungry!", false),
        ];

        for (const todo of defaultTodos) {
            await this.add(todo.title, todo.importance, todo.dueDate, todo.description, todo.finished);
        }
    }
}

export const todoStore = new TodoStore();
