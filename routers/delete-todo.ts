import {Router} from "express";
import {TodoRecord} from "../records/todo.record";
import {ValidationError} from "../utils/errors";

export const deleteRouter = Router();

deleteRouter
    .get('/', async (req, res)=>{
        const todos = await TodoRecord.findAll();
        res.render('delete/delete', {
            todos
        })
    })
    .delete('/:id', async (req, res)=>{
        const {id} = req.params;
        const findTodo = await TodoRecord.find(id);
        await findTodo.delete();
        res.render('delete/deleted', {
            id
        })
    })