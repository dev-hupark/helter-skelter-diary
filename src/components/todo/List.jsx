import React, { useState } from 'react'
import styled from '@emotion/styled'
import { format } from 'utils/date'
import { updateTodoStatus, deleteTodo } from 'data/todos'
import ImageButton from 'components/ui/ImageButton'
import ChkGray from 'assets/buttons/chk_gray.png'
import ChkBlue from 'assets/buttons/chk_blue.png'
import EditBtn from 'assets/buttons/edit.png'
import DeleteBtn from 'assets/buttons/delete.png'

const TodoCard = styled.ul`
  ${(props) => props.status === 0 ?
    `
      border: 1px solid #6799FF
    `
      : `
        border: 1px solid #999999;
      `
  };
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
  ${(props) => props.status === 1 ? 'text-decoration: line-through' : ''};
`

const TodoButtonRow = styled.li`
  height: 30px;
`
const TodoWriter = styled.li`
  height: 20px;
  line-height: 20px;
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

const List = ({ todos, refreshTodos, openEditPopup }) => {

  const completeTodo = async (todo) => {
    let state = todo.status === 0 ? 1 : 0
    const status = await updateTodoStatus(todo.id, state)

    switch (status){
      case 204:
        refreshTodos()
        break;
    }
  }

  const editTodo = (todo) => {
    openEditPopup(todo)
  }

  const removeTodo = async (todo) => {
    const status = await deleteTodo(todo)
    console.log(status)
    switch (status){
      case 204:
        refreshTodos()
        break;
    }
  }

  return (
    <>
      {todos?.map((todo) => (
        <TodoCard key={todo.id} status={todo.status}>
          {/*<TodoWriter>
            <Description>{obj.created_user}</Description>
          </TodoWriter>*/}
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
              <ImageButton src={todo.status === 0 ? ChkBlue : ChkGray}
                           onClick={completeTodo} param={todo}
              />
              {todo.status === 0 &&
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

export default List