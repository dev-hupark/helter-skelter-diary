import { useEffect, useState, useCallback } from 'react'
import { useAuth } from 'auth/use-auth'
import { client } from '/lib/supabaseClient'


const useTodos = ( userId ) => {
  const [todos, setTodos] = useState([])
  const { loggedIn } = useAuth()

  useEffect(() => {
    void refresh()
  }, [userId])

  const refresh = useCallback(async () => {
    if( loggedIn ){
      const { data: todos, status } = await client // error
        .from('todos')
        .select('*')
        .eq('created_user', userId)
        .order('status', { ascending: false })
        .order('created_dt', { ascending: false })

      switch (status) {
        case 200:
          setTodos(todos)
          break
      }
    }
  }, [userId])

  return {
    todos,
    refresh: refresh,
    updateTodoStatus: updateTodoStatus,
  }
}

const updateTodoStatus = async (todo, todoStatus) => {
  const { status } = await client // error
    .from('todos')
    .update({ status: todoStatus, completion_dt: todoStatus === 'done' ? 'now()' : null })
    .eq('id', todo.id)

  return status
}

const insertTodo = async (todo) => {
  const { status } = await client // error
    .from('todos')
    .insert(todo)

  return status
}

const updateTodo = async (todo) => {
  const { status } = await client // error
    .from('todos')
    .update(todo)
    .eq('id', todo.id)

  return status
}

const deleteTodo = async (todo) => {
  const { status } = await client // error
    .from('todos')
    .delete()
    .eq('id', todo.id)

  return status
}

export {
  useTodos,
  updateTodoStatus,
  insertTodo,
  updateTodo,
  deleteTodo,
}
