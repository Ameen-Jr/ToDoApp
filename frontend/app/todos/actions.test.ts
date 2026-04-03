import { describe, it, expect, vi, beforeEach } from 'vitest'

const { mockInsert, mockEqUpdate, mockEqDelete, mockFrom, mockGetUser } = vi.hoisted(() => {
  const mockInsert = vi.fn().mockResolvedValue({ error: null })
  const mockEqUpdate = vi.fn().mockResolvedValue({ error: null })
  const mockEqDelete = vi.fn().mockResolvedValue({ error: null })
  const mockFrom = vi.fn((_table: string) => ({
    insert: mockInsert,
    update: (_data: unknown) => ({ eq: mockEqUpdate }),
    delete: () => ({ eq: mockEqDelete }),
  }))
  const mockGetUser = vi.fn().mockResolvedValue({
    data: { user: { id: 'user-123', email: 'test@example.com' } },
  })
  return { mockInsert, mockEqUpdate, mockEqDelete, mockFrom, mockGetUser }
})

vi.mock('next/cache', () => ({ revalidatePath: vi.fn() }))
vi.mock('next/navigation', () => ({ redirect: vi.fn() }))
vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn().mockResolvedValue({
    auth: { getUser: mockGetUser },
    from: mockFrom,
  }),
}))

import { createTodo, toggleTodo, deleteTodo } from './actions'
import { revalidatePath } from 'next/cache'

describe('createTodo', () => {
  beforeEach(() => vi.clearAllMocks())

  it('inserts a todo and revalidates', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: 'user-123' } } })
    await createTodo('Buy groceries')
    expect(mockFrom).toHaveBeenCalledWith('todos')
    expect(mockInsert).toHaveBeenCalledWith({ title: 'Buy groceries', user_id: 'user-123' })
    expect(revalidatePath).toHaveBeenCalledWith('/')
  })
})

describe('toggleTodo', () => {
  beforeEach(() => vi.clearAllMocks())

  it('updates is_complete and revalidates', async () => {
    await toggleTodo('todo-abc', true)
    expect(mockFrom).toHaveBeenCalledWith('todos')
    expect(mockEqUpdate).toHaveBeenCalledWith('id', 'todo-abc')
    expect(revalidatePath).toHaveBeenCalledWith('/')
  })
})

describe('deleteTodo', () => {
  beforeEach(() => vi.clearAllMocks())

  it('deletes by id and revalidates', async () => {
    await deleteTodo('todo-abc')
    expect(mockFrom).toHaveBeenCalledWith('todos')
    expect(mockEqDelete).toHaveBeenCalledWith('id', 'todo-abc')
    expect(revalidatePath).toHaveBeenCalledWith('/')
  })
})
