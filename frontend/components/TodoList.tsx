import TodoItem from './TodoItem'

interface Todo {
  id: string
  title: string
  is_complete: boolean
  created_at: string
}

export default function TodoList({ todos }: { todos: Todo[] }) {
  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-5">
          <svg className="w-9 h-9 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <p className="text-white/40 text-sm font-medium">No tasks yet</p>
        <p className="text-white/20 text-xs mt-1">Add your first task above to get started</p>
      </div>
    )
  }

  const pending = todos.filter(t => !t.is_complete)
  const completed = todos.filter(t => t.is_complete)

  return (
    <div className="space-y-6">
      {pending.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-[#888888] uppercase tracking-widest px-1">
            Tasks — {pending.length}
          </p>
          <div className="space-y-2">
            {pending.map(todo => <TodoItem key={todo.id} todo={todo} />)}
          </div>
        </div>
      )}

      {completed.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-[#888888] uppercase tracking-widest px-1">
            Completed — {completed.length}
          </p>
          <div className="space-y-2">
            {completed.map(todo => <TodoItem key={todo.id} todo={todo} />)}
          </div>
        </div>
      )}
    </div>
  )
}
