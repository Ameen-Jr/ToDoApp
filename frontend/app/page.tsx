import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { signOut } from '@/app/auth/actions'
import AddTodoForm from '@/components/AddTodoForm'
import TodoList from '@/components/TodoList'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: todos } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: false })

  const allTodos = todos ?? []
  const total = allTodos.length
  const done = allTodos.filter(t => t.is_complete).length
  const progress = total > 0 ? Math.round((done / total) * 100) : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#032147] via-[#0a3060] to-[#032147]">
      {/* Background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-60 -right-60 w-[500px] h-[500px] bg-[#209dd7] rounded-full opacity-[0.08] blur-3xl" />
        <div className="absolute -bottom-60 -left-60 w-[500px] h-[500px] bg-[#753991] rounded-full opacity-[0.08] blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#ecad0a] rounded-full opacity-[0.03] blur-3xl" />
      </div>

      <div className="relative max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#209dd7] to-[#753991] flex items-center justify-center shadow-lg shadow-[#209dd7]/20">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <div>
              <h1 className="text-white font-bold text-lg leading-none">My Tasks</h1>
              <p className="text-[#888888] text-xs mt-0.5 truncate max-w-[180px]">{user.email}</p>
            </div>
          </div>

          <form action={signOut}>
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[#888888] hover:text-white hover:border-white/20 text-sm transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-white/20"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign out
            </button>
          </form>
        </header>

        {/* Progress card */}
        {total > 0 && (
          <div className="mb-6 p-5 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-[#888888]">Overall progress</span>
              <span className="text-sm font-semibold text-white">{done}/{total} done</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#209dd7] to-[#753991] rounded-full transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>
            {progress === 100 && (
              <p className="text-center text-xs text-[#ecad0a] mt-3 font-medium tracking-wide">
                All tasks complete — great work!
              </p>
            )}
          </div>
        )}

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: 'Total', value: total, color: 'text-white' },
            { label: 'Pending', value: total - done, color: 'text-[#ecad0a]' },
            { label: 'Done', value: done, color: 'text-[#209dd7]' },
          ].map(stat => (
            <div key={stat.label} className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-[#888888] text-xs mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Add todo */}
        <div className="mb-6">
          <AddTodoForm />
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-white/5" />
          <div className="h-px w-12 bg-gradient-to-r from-[#ecad0a]/50 to-[#209dd7]/50" />
          <div className="flex-1 h-px bg-white/5" />
        </div>

        {/* Todo list */}
        <TodoList todos={allTodos} />
      </div>
    </div>
  )
}
