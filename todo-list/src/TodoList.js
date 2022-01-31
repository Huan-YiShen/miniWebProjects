import React from 'react'
import Todo from './todo'

export default function TodoList({todoList, toggleTodo}){
    return(
        todoList.map(todo => {
            return <Todo key={todo} toggleTodo={toggleTodo} todo={todo}/>
        })
    )
}

