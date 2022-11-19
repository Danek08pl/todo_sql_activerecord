import {ValidationError} from "../utills/errors";
import {pool} from "../utils/db";
import {v4 as uuid} from 'uuid';
import {FieldPacket} from "mysql2";

type TodoRecordResults = [TodoRecord[], FieldPacket[]];

interface Todo {
    id?: string,
    title: string,
}


export class TodoRecord implements Todo{
    id?: string;
    title: string;


    constructor(obj: Omit<TodoRecord, 'insert' | 'update' | 'delete'>) {
        const {id, title} = obj;
        if(!title){
            throw new ValidationError('Podaj nazwę zadania!')
        }

        if(title.length > 150){
            throw new Error('Za długi wpis!')
        }

            this.id = id ?? uuid();
            this.title = title;
    }

   async insert(): Promise<string>{
        await pool.execute('INSERT INTO `todos` VALUES(:id, :title)', {

            id: this.id,
            title: this.title,

        })
    return this.id;

    }

    async delete(): Promise<string>{
        if(!this.id){
            throw new ValidationError('Zadanie nie ma ID')
        }
        await pool.execute('DELETE FROM `todos` WHERE `id` = :id',{
            id: this.id,
        })

        return this.id;
    }

    async update(): Promise<string>{
        await pool.execute('UPDATE `todos` SET `title` = :title WHERE `id` = :id', {

            id: this.id,
            title: this.title,

        })
        return this.id;

    }

    static async find(id: string): Promise<TodoRecord | null>{

        const [results] = await pool.execute('SELECT * FROM `todos` WHERE `id` =:id', {
            id,
        }) as TodoRecordResults;

        return results.length === 0 ? null : new TodoRecord(results[0]);

    }

    static async findAll(): Promise<TodoRecord[] | null>{

        const [results] = await pool.execute('SELECT * FROM `todos`') as TodoRecordResults;

        return results.map(result => new TodoRecord(result));

    }

}