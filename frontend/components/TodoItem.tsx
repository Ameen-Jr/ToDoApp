'use client'

import { useState } from 'react'
import { toggleTodo, deleteTodo } from '@/app/todos/actions'

interface Todo {
  id: string
  title: string
  is_complete: boolean
  created_at: string
}

export default function TodoItem({ todo }: { todo: Todo }) {
  const [toggling, setToggling] = useState(false)
  const [deleting, setDeleting] = useState(false)

  async function handleToggle() {
    setToggling(true)
    await toggleTodo(todo.id, !todo.is_complete)
    setToggling(false)
  }

  async function handleDelete() {
    setDeleting(true)
    await deleteTodo(todo.id)
  }

  return (
    <div className={`group flex items-center gap-4 px-5 py-4 rounded-2xl border transition-all duration-300 ${
      todo.is_complete
        ? 'bg-white/2 border-white/5 opacity-60'
        : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/8'
    } ${deleting ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}
    style={{ transition: deleting ? 'all 0.2s ease' : 'all 0.3s ease' }}>

      {/* Custom checkbox */}
      <button
        onClick={handleToggle}
        disabled={toggling}
        aria-label={todo.is_complete ? 'Mark incomplete' : 'Mark complete'}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-transparent ${
          todo.is_complete
            ? 'bg-gradient-to-br from-[#209dd7] to-[#753991] border-transparent shadow-md shadow-[#209dd7]/30 focus:ring-[#209dd7]'
            : 'border-white/20 hover:border-[#209dd7] focus:ring-[#209dd7]'
        } ${toggling ? 'scale-90' : 'scale-100'}`}
      >
        {todo.is_complete && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      {/* Title */}
      <span className={`flex-1 text-sm leading-relaxed transition-all duration-300 ${
        todo.is_complete ? 'line-through text-[#888888]' : 'text-white'
      }`}>
        {todo.title}
      </span>

      {/* Completion badge */}
      {todo.is_complete && (
        <span className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#209dd7]/10 border border-[#209dd7]/20 text-[#209dd7] text-xs font-medium">
          Done
        </span>
      )}

      {/* Delete button */}
      <button
        onClick={handleDelete}
        disabled={deleting}
        aria-label="Delete task"
        className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-white/20 hover:text-red-400 hover:bg-red-400/10 opacity-0 group-hover:opacity-100 transition-all duration-200 focus:outline-none focus:opacity-100 focus:text-red-400"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  )
}
