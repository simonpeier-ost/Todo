import express from 'express';
import {indexController} from '../controller/index-controller';

const router = express.Router();
//import {staticController} from "../controller/static-controller";
//import {calcController} from "../controller/calc-controller";

//shortcut: here all routes for dispatching to controllers is done in the same file.
// For proper handling each controller should have its own associated route
//router.get("/static/:filename", staticController.showFile.bind(staticController));

//router.get("/calc", calcController.handleCalc.bind(calcController));

router.get("/", indexController.index.bind(indexController));
router.get('/add-todo', indexController.renderAddTodo.bind(indexController));
router.post('/add-todo', indexController.addTodo.bind(indexController));
router.get('/todo/:id', indexController.renderEditTodo.bind(indexController));
router.post('/todo/:id', indexController.editTodo.bind(indexController));

export const indexRoutes = router;
