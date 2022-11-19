import {Router} from 'express';
import {TodoRecord} from "../records/todo.record";

export const addRouter = Router();

addRouter
    .get('/add-todo', async (req, res)=>{

        res.render('add/add-todo')
    })
    .post('/added', async (req, res)=>{
        const {title} = req.body;
        const todo = await new TodoRecord({
            title,
        });
        await todo.insert();
        res.render('add/added');
    })