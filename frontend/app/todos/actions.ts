'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function createTodo(title: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  await supabase.from('todos').insert({ title, user_id: user.id })
  revalidatePath('/')
}

export async function toggleTodo(id: string, is_complete: boolean) {
  const supabase = await createClient()
  await supabase.from('todos').update({ is_complete }).eq('id', id)
  revalidatePath('/')
}

export async function deleteTodo(id: string) {
  const supabase = await createClient()
  await supabase.from('todos').delete().eq('id', id)
  revalidatePath('/')
}
