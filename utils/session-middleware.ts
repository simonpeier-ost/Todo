import {Response} from 'express'
import {Todo} from "../services/todo-service";

export interface Settings {
    orderBy: keyof Todo,
    orderDirection: 1 | -1,
    filter: string
    theme: string
}

export const sessionUserSettings = (req: any, res: Response, next: (err?: any) => void): void => {
    const userSettings = req.session?.userSettings || {
        orderBy: 'title',
        orderDirection: -1,
        filter: 'all',
        theme: "dark"
    };
    const {orderBy, orderDirection, filter, theme} = req.query;

    if (theme) {
        userSettings.theme = theme;
    }
    if (orderBy) {
        userSettings.orderBy = orderBy;
    }
    if (orderDirection) {
        console.log(orderDirection)
        userSettings.orderDirection = orderDirection;
    }
    if (filter){
        userSettings.filter = filter;
    }

    req.session.userSettings = userSettings;
    res.locals = req.userSettings; // visible within views

    next();
};