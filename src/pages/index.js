import React, { useState } from 'react'
import styled from '@emotion/styled'
import { useTodos } from 'data/todos'
import TodoList from 'components/todo/List'
import NewTodoButton from 'components/ui/NewTodoButton'
import NewTodoPopup from 'components/todo/FormPopup'
import ToastPopup from 'components/ui/ToastPopup'
import { signInWithGoogle, signOut } from '/lib/auth/google'

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
    created_user: 'system',
  })

  const [ isOpen, setIsOpen ] = useState(false)
  const [ message, setMessage ] = useState('')

  const toggleIsPopup = ( isToast, msg ) => {
    if(isPopup){
      setCurrentTodo({
        todo: '',
        memo: '',
        created_user: 'system',
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
      <ToastPopup open={isOpen} setOpen={setIsOpen} message={message}/>

      <button onClick={signInWithGoogle}>구글 로그인</button>
      <button onClick={signOut}>로그아웃</button>
    </Wrapper>
  )
}

export default Index