import * as express from "express";
import 'express-async-errors';
import * as methodOverride from "method-override";
import {static as eStatic, urlencoded} from "express";
import {engine} from "express-handlebars";
import {homeRouter } from "./routers/home";
import {addRouter} from "./routers/add-todo";

import {handleError} from "./utils/errors";
import './utils/db';
import {TodoRecord} from "./records/todo.record";
import {deleteRouter} from "./routers/delete-todo";




const app = express();
app.use(methodOverride('_method'));
app.use(urlencoded({
    extended: true,
}));
app.use(eStatic('public'));

app.engine('.hbs', engine({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');


app.use('/', homeRouter);
app.use('/todo', addRouter);
app.use('/delete', deleteRouter);

app.use(handleError);

app.listen(3000, '0.0.0.0', () => {
    console.log('Listening on http://localhost:3000');
});
