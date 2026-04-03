'use client'

import { useState, useRef } from 'react'
import { createTodo } from '@/app/todos/actions'

export default function AddTodoForm() {
  const [loading, setLoading] = useState(false)
  const [focused, setFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const title = (form.elements.namedItem('title') as HTMLInputElement).value.trim()
    if (!title) return

    setLoading(true)
    await createTodo(title)
    form.reset()
    setLoading(false)
    inputRef.current?.focus()
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className={`flex items-center gap-3 p-2 rounded-2xl bg-white/5 border transition-all duration-300 ${focused ? 'border-[#209dd7] shadow-lg shadow-[#209dd7]/10' : 'border-white/10'}`}>
        {/* Plus icon */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 ${focused ? 'bg-[#209dd7]' : 'bg-white/5'}`}>
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
        </div>

        <input
          ref={inputRef}
          name="title"
          type="text"
          required
          placeholder="Add a new task..."
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="flex-1 bg-transparent text-white placeholder-white/25 focus:outline-none text-sm"
        />

        <button
          type="submit"
          disabled={loading}
          className="flex-shrink-0 px-4 py-2 rounded-xl bg-gradient-to-r from-[#753991] to-[#209dd7] text-white text-sm font-semibold hover:opacity-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-[#753991]/20"
        >
          {loading ? (
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
          ) : (
            'Add'
          )}
        </button>
      </div>
    </form>
  )
}
