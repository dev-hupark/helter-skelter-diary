import { useEffect, useState, useCallback } from 'react'
import { client } from '/lib/supabaseClient'

const useTodos = () => {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    void refresh()
  }, [])

  const refresh = useCallback(async () => {
    const { data: todos, status } = await client // error
      .from('todos')
      .select('*')
      .order('status', { ascending: false })
      .order('created_dt', { ascending: false })

    switch (status) {
      case 200:
        setTodos(todos)
        break
    }
  }, [])

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
