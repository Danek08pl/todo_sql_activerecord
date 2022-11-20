import {Router} from "express";
import {TodoRecord} from "../records/todo.record";
import {ValidationError} from "../utils/errors";

export const homeRouter = Router();

homeRouter
    .get('/', async (req, res)=>{
        const todos = await TodoRecord.findAll();
        res.render('home/home', {
            todos
        });

    })
    .put('/:id', async (req, res)=>{
        const {id} = req.params;
        const {update_title} = req.body

        if(!update_title){
            throw new ValidationError('Podaj nazwę zaktualizowanego zadania!')
        }

        const findTodo = await TodoRecord.find(id);
        findTodo.title = update_title;
        await findTodo.update();
        res.render('update/update', {
            id
        })
    })