import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { format } from 'utils/date'
import { updateTodoStatus, deleteTodo } from 'data/todos'
import ImageButton from 'components/ui/ImageButton'
import ChkGray from 'assets/buttons/chk_gray.png'
import ChkBlue from 'assets/buttons/chk_blue.png'
import EditBtn from 'assets/buttons/edit.png'
import DeleteBtn from 'assets/buttons/delete.png'

const TodoCard = styled.ul`
  ${(props) => props.status === 'undone' ?
    `
      border: 1px solid #6799FF
    `
    : `
        border: 1px solid #999999;
      `};
  width: 100%;
  background-color: #fff; 
  border-radius: 10px;
  padding: 10px;
  margin: 0 auto;
  
  li {
    display: flex;
    gap: 10px;
    align-items: center;

    div {
      margin-left: auto;
      display: flex;
      gap: 5px;
    }
  }
`

const TodoRow = styled.li`
  height: 25px;
  ${(props) => props.status === 'done' ? 'text-decoration: line-through' : ''};
`

const TodoButtonRow = styled.li`
  height: 30px;
`

const Todo = styled.p`
  font-size: 16px;
  font-weight: bold;
`

const Memo = styled.span`
  font-size: 14px;
  color: #999999;
`

const Description = styled.p`
  font-size: 13px;
  color: #A6A6A6;
  
`

const List = ({ todos, refreshTodos, openEditPopup, user }) => {
  const completeTodo = async (todo) => {
    let state = todo.status === 'undone' ? 'done' : 'undone'

    const status = await updateTodoStatus(todo, state)

    switch (status){
      case 204:
        refreshTodos(user.id)
        break
    }
  }

  const editTodo = (todo) => {
    openEditPopup(todo)
  }

  const removeTodo = async (todo) => {
    const status = await deleteTodo(todo)
    switch (status){
      case 204:
        refreshTodos()
        break
    }
  }

  return (
    <>
      {todos?.map((todo) => (
        <TodoCard key={todo.id} status={todo.status}>
          <TodoRow status={todo.status}>
            <Todo>{todo.todo}</Todo>
          </TodoRow>
          <TodoRow status={todo.status}>
            <Memo>{todo.memo}</Memo>
          </TodoRow>
          <TodoButtonRow>
            {todo.completion_dt &&
              <Description>{format('YYYY-MM-DD HH:mm:ss', todo.completion_dt)}</Description>
            }
            <div>
              <ImageButton src={todo.status === 'undone' ? ChkBlue : ChkGray}
                onClick={completeTodo} param={todo}
              />
              {todo.status === 'undone' &&
                <ImageButton src={EditBtn}
                  onClick={editTodo}
                  param={todo}
                />
              }
              <ImageButton src={DeleteBtn}
                onClick={removeTodo}
                param={todo} />
            </div>
          </TodoButtonRow>
        </TodoCard>
      ))}
    </>
  )
}

List.propTypes = {
  todos: PropTypes.array.isRequired,
  refreshTodos: PropTypes.func,
  openEditPopup: PropTypes.func,
}

export default List