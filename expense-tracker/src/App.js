import './App.css';
import React, {useState, useRef, useEffect} from 'react';
import TodoList from './TodoList'
// import uuidv4 from 'uuid/v4'

const LOCAL_STORAGE_KEY = "todoApp.todos"

function App() {
  //initiate the list
  const [todos, setTodos] = useState([])
  //setup reference hook to get text input to the handleAddtodo
  const todoNameRef = useRef()

  // SAVING
  //load stored todo list back to setTodos
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  },[])
  //store todo list to LOCAL_STORAGE_KEY
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  //on or off
  function toggleTodo(id){
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = (!todo.complete)
    setTodos(newTodos)
  }

  //action handler for adding a todo to the list 
  function handleAddtodo(e){
    const name = todoNameRef.current.value

    if (name === '') return
    
    setTodos(prevTodos => {
      return[...prevTodos, {id:(Math.random()*Math.random()*Math.random()*Math.random()), name: name, complete: false}]
    })
    todoNameRef.current.value = null    
  }
  //action handler for removing all todos
  function clearAll(e){
    setTodos([]) 
  }
  //action handler for remove completed todos
  function clearCompleted(e){
    const newTodos =todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
      <h2><center>TO DO LIST</center></h2>
      <TodoList todoList = {todos} toggleTodo = {toggleTodo}/ >
      <input ref = {todoNameRef} type = "text"/>
      <button onClick = {handleAddtodo}>Add Todo</button>
      <button onClick = {clearAll}>Clear ALL</button>
      <button onClick = {clearCompleted}>Clear Completed Todos</button>
      <div><center> {todos.filter(todo => !todo.complete).length} left to do </center></div>
    </>
  );
}

export default App;
