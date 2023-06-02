import React, { useState } from 'react'
import styled from '@emotion/styled'
import { useAuth } from 'auth/use-auth'
import { useTodos } from 'data/todos'
import List from 'components/todo/List'
import NewTodoButton from 'components/ui/NewTodoButton'
import NewTodoPopup from 'components/todo/FormPopup'
import ToastPopup from 'components/ui/ToastPopup'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const Index = () => {
  const { user } = useAuth()
  const { todos, refresh: refreshTodos } = useTodos(user.id)
  const [ isPopup, setIsPopup ] = useState(false)
  const [ currentTodo, setCurrentTodo ] = useState({
    todo: '',
    memo: '',
    created_user: user.id,
  })

  const [ isOpen, setIsOpen ] = useState(false)
  const [ message, setMessage ] = useState('')

  const toggleIsPopup = ( isToast, msg ) => {
    if(isPopup){
      setCurrentTodo({
        todo: '',
        memo: '',
        created_user: user.id,
      })
    }
    if(isToast){
      setIsOpen(isToast)
      setMessage(msg)
    }

    setIsPopup(!isPopup)
  }

  const openEditPopup = (todo) => {
    setCurrentTodo(todo)
    toggleIsPopup()
  }

  return (
    <Wrapper>
      <List todos={todos}
        refreshTodos={refreshTodos}
        openEditPopup={openEditPopup}
        user={user}
      />
      <NewTodoButton onClick={toggleIsPopup}
        user={user}
      />
      { isPopup &&
        <NewTodoPopup closePopup={toggleIsPopup}
          refreshTodos={refreshTodos}
          currentTodo={currentTodo}
        />
      }
      <ToastPopup open={isOpen} setOpen={setIsOpen} message={message}/>
    </Wrapper>
  )
}

export default Index