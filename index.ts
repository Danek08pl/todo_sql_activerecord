import {pool} from "./utils/db";
import {TodoRecord} from "./records/todo.record";

(async()=>{

       const todo = await new TodoRecord({
           title: 'dsfsaf'
       })

    // const todoId = await  TodoRecord.find('76f2abd7-ab3f-4b36-8b50-272681effeee')
    // console.log(todoId);
    // await todoId.delete()

    // const todoId = await TodoRecord.find('cde60f56-57d9-4fcd-8fbb-fa3d672c5292');
    // todoId.title = 'Jednak zostanę w domu bo pada!';
    // await todoId.update();
    // console.log(todoId)

    pool.end();

})()