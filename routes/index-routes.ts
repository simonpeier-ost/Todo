import express from 'express';
import {indexController} from '../controller/index-controller';

const router = express.Router();

router.get("/", indexController.index.bind(indexController));
router.get('/add-todo', indexController.renderAddTodo.bind(indexController));
router.post('/add-todo', indexController.addTodo.bind(indexController));
router.get('/todo/:id', indexController.renderEditTodo.bind(indexController));
router.post('/todo/:id', indexController.editTodo.bind(indexController));

export const indexRoutes = router;
