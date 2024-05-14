import Datastore from 'nedb-promises'

export class Todo {
    public _id?: string

    constructor(
        id: string | undefined,
        public title: string,
        public importance: number,
        public creationDate: Date,
        public dueDate: Date,
        public description: string,
        public finished: boolean
    ) {
        if (id !== undefined) {
            this._id = id;
        }
    }
}

export class TodoStore {
    private db: Datastore;

    constructor(db?: Datastore) {
        const options = process.env.DB_TYPE === "FILE" ? {filename: './data/todos.db', autoload: true} : {}
        this.db = db || new Datastore(options);
    }

    async add(title: string, importance: number, dueDate: Date, description: string, finished: boolean,): Promise<Todo> {
        const todo = new Todo(undefined, title, Number(importance), new Date(), new Date(dueDate), description, finished);
        return this.db.insert(todo);
    }

    async update(id: string, title: string, importance: number, dueDate: Date, description: string, finished: boolean): Promise<number> {
        importance = Number(importance);
        return this.db.update({_id: id}, {$set: {title, importance, dueDate, description, finished}})
    }

    async get(id: string): Promise<Document> {
        return this.db.findOne({_id: id});
    }

    convertDocumentToTodo(document: Todo): Todo {
        return new Todo(
            document._id ?? undefined,
            document.title,
            document.importance,
            new Date(document.creationDate),
            new Date(document.dueDate),
            document.description,
            document.finished
        );
    }

    async all(orderBy: keyof Todo, order: 1 | -1): Promise<Todo[]> {
        const documents = await this.db
            .find({})
            .sort({[orderBy]: order})
            .exec();

        const todos = documents.map((todo) => this.convertDocumentToTodo(todo as Todo));
        return Promise.resolve(todos);
    }

    async initializeDefaults(): Promise<void> {
        await this.db.remove({}, {multi: true});

        const defaultTodos: Todo[] = [
            new Todo(undefined, "Clean the house", 4, new Date(), new Date("2024-04-20"), "House is dirty as fxxk", true),
            new Todo(undefined, "Grocery shopping", 2, new Date(), new Date("2024-04-18"), "Nomnom, me hungry!", false),
        ];

        for (const todo of defaultTodos) {
            await this.add(todo.title, todo.importance, todo.dueDate, todo.description, todo.finished);
        }
    }
}

export const todoStore = new TodoStore();
