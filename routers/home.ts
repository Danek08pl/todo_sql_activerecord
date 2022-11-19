import {Router} from "express";
import {TodoRecord} from "../records/todo.record";

export const homeRouter = Router();

homeRouter
    .get('/', async (req, res)=>{
        const todos = await TodoRecord.findAll();
        res.render('home/home', {
            todos
        });

    })