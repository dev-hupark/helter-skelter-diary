import React, { useState } from 'react';
import styled from '@emotion/styled'
import { useTodos } from 'data/todos'
import TodoList from 'components/todo/List'
import NewTodoButton from 'components/ui/NewTodoButton'
import NewTodoPopup from 'components/todo/NewPopup'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const Index = () => {
  const { todos, refresh: refreshTodos } = useTodos()
  const [ isPopup, setIsPopup ] = useState(false)
  const [ currentTodo, setCurrentTodo ] = useState({
    todo: '',
    memo: '',
    created_user: 'hupark',
  })

  const toggleIsPopup = () => {
    if(isPopup){
      setCurrentTodo({
        todo: '',
        memo: '',
        created_user: 'hupark',
      })
    }

    setIsPopup(!isPopup)
  }

  const openEditPopup = (todo) => {
    setCurrentTodo(todo)
    toggleIsPopup()
  }

  return (
    <Wrapper>
      <TodoList todos={todos}
                refreshTodos={refreshTodos}
                openEditPopup={openEditPopup}
      />
      <NewTodoButton onClick={toggleIsPopup} />
      { isPopup &&
        <NewTodoPopup closePopup={toggleIsPopup}
                      refreshTodos={refreshTodos}
                      currentTodo={currentTodo}
        />
      }
    </Wrapper>
  )
}

export default Index;