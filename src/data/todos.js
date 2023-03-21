import { useEffect, useState, useCallback } from 'react'
import { client } from '/lib/supabaseClient'

const useTodos = () => {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    refresh()
  }, [])

  const refresh = useCallback(async () => {
    const { data: todos, error, status } = await client
      .from('todos')
      .select('*')
      .order('status', { ascending: true })
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

const updateTodoStatus = async (id, todoStatus) => {
  let completionDt = null;

  if(todoStatus === 1){
    completionDt = 'now()'
  }

  const { error, status } = await client
    .from('todos')
    .update({ status: todoStatus, completion_dt: completionDt })
    .eq('id', id)

  return status
}

const insertTodo = async (todo) => {
  const { error, status } = await client
    .from('todos')
    .insert(todo)

  return status
}

const updateTodo = async (todo) => {
  const { error, status } = await client
    .from('todos')
    .update(todo)
    .eq('id', todo.id)

  return status
}

const deleteTodo = async (todo) => {
  const { error, status } = await client
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
