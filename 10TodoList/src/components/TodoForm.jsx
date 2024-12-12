import React from 'react'
import { useTodo } from '../contexts/TodoContexts';
import { useState } from 'react';
function TodoForm() {
    const [todo, settodo] = useState("")
    const {addTodo}= useTodo()

    const add =(e)=>{
        e.preventDefault()
        if(!todo) return

        addTodo({todo,completed:false})
        settodo("")
    }

    return (
        <form onSubmit={add} className="flex">
            <input
                type="text"
                placeholder="Write Todo..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-[#37371F] py-1.5"
                value={todo}
                onChange={(e)=>settodo(e.target.value)}
            />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-[#90BE6D] text-white shrink-0">
                Add
            </button>
        </form>
    );
}

export default TodoForm;


