import React,{useState} from 'react'
import { TodoForm } from './TodoForm'
import {Todo} from './Todo'
import { EditTodoForm } from './EditTodoForm'
import {v4 as uuidv4} from 'uuid'
export const TodoWrapper = () => {
    const [todos, setTodos]=useState([])

    const addTodo=todo=>{
        setTodos([...todos,{id: uuidv4(),task:todo,
        completed:false, isEditing:false}])
        console.log(todos)
    }

    {/*to get a strike through when we click on an item that's completed*/}
    const toggleComplete=id=>{
        setTodos(todos.map(todo=>todo.id===id?{
            ...todo, completed:!todo.completed}:todo))
    }

    {/*to delete a todo item from list */}
    const deleteTodo=(id)=>{
        setTodos(todos.filter((todo)=>todo.id!==id))
    }

     {/*to edit a todo in the list */}
    const editTodo=id=>{
        setTodos(todos.map(todo=>todo.id===id?
            {...todo,isEditing:!todo.isEditing}:todo))
    }

    const editTask=(task,id)=>{
        setTodos(todos.map(todo=>todo.id===id?{...todo,
        task,isEditing:!todo.isEditing}:todo))
    }
  return (
    <div className='TodoWrapper'>
        <h1> Get things done!</h1>
        <TodoForm addTodo={addTodo}/>
        {/* to add the values in the list */}
        {todos.map((todo,index)=>(
            todo.isEditing?(
                <EditTodoForm editTodo={editTask} task={todo}/>
            ):(
            <Todo task={todo} key={index}
            toggleComplete={toggleComplete} deleteTodo={deleteTodo}
            editTodo={editTodo}/>)
        ))}
    </div>
  )
}
