import { useState,useEffect} from "react";
import { TodoProvider } from "./contexts";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

function App() {
  const [todos, settodos] = useState([]); //this is array in which all todos are there
//to add todo
  const addTodo=(todo)=>{
    settodos((prev)=>[{id:Date.now(),...todo},...prev])
  }
//to update todo
const updateTodo=(id,todo)=>{
  settodos((prev)=>prev.map((prevTodo)=>(prevTodo.id===id? todo: prevTodo)))
}
//to delete todo
const deleteTodo=(id)=>{
  settodos((prev)=>prev.filter((todo)=>todo.id !== id))
}
//for togglecomplete
const toggleComplete =(id)=>{
  settodos((prev)=>prev.map((prevTodo)=> prevTodo.id===id? {...prevTodo,completed:!prevTodo.completed} :prevTodo))
}

//local storage
useEffect(() => {
  const todos=JSON.parse(localStorage.getItem("todos"))

  if(todos && todos.length>0){
    settodos(todos)
  }
}, [])

useEffect(() => {
  localStorage.setItem("todos",JSON.stringify(todos))
}, [todos])


  return (
    <>
    <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div></div>
    <TodoProvider value={{todos,addTodo,updateTodo,deleteTodo,toggleComplete}}>
      <div className=" min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 mt-24 text-black bg-[#29b6f72d]">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4 text-white">{/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo)=>(
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
    </>
  )
}

export default App;
