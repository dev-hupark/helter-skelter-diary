import { client } from '/lib/supabaseClient'

const insertTodosHistory = async (state, todo) => {
  const { status } = await client
    .from('todos_history')
    .insert({
      todo_id: todo.id,
      state: state,
      req_param: JSON.stringify(todo),
      created_user: todo.created_user
    })

  return status
}

export {
  insertTodosHistory,
}
