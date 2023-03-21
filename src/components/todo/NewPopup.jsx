import React, { useState } from 'react'
import styled from '@emotion/styled'
import { insertTodo, updateTodo } from 'data/todos'
import Close from 'assets/buttons/close.png'
import ImageButton from 'components/ui/ImageButton'
import { ActiveButton } from 'components/ui/TextButton'

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`

const Popup = styled.ul`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 350px;
  padding: 20px;
  background-color: white;
  z-index: 1000;
`

const PopupTitle = styled.li`
  display: flex;
  align-items: center;
  
  button{
    margin-left: auto;
  }
`

const InputForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px 0;
`
const InputTodo = styled.input`
  border: 0;
  border-bottom: 1px solid #BDBDBD;
  height: 30px;
`

const InputButtonForm = styled.div`
  display: flex;
  justify-content: center;
`

const NewPopup = ({ closePopup, refreshTodos, currentTodo }) => {
  const [ todo, setTodo ] = useState(currentTodo)

  const updateTodoObj = (name, value) => {
    setTodo(prevState => ({ ...prevState, [name]: value }));
  }

  const saveTodo = async (todo) => {
    const status = await insertTodo(todo)
    switch (status){
      case 201:
        refreshTodos()
        closePopup()
        break;
    }
  }

  const editTodo = async (todo) => {
    const status = await updateTodo(todo)
    switch (status){
      case 204:
        refreshTodos()
        closePopup()
        break;
    }
  }

  return (
    <Wrapper>
      <Popup onClick={(e) => e.stopPropagation()}>
        <PopupTitle>
          <h3>새 일정 등록</h3>
          <ImageButton src={Close} onClick={closePopup}/>
        </PopupTitle>
        <InputForm>
          <InputTodo placeholder="일정 제목"
                     value={todo.todo}
                     onChange={e => updateTodoObj('todo', e.target.value)} />
          <InputTodo placeholder="설명 추가"
                     value={todo.memo}
                     onChange={e => updateTodoObj('memo', e.target.value)} />
        </InputForm>
        <InputButtonForm>
          {todo.id !== undefined ?
            <ActiveButton onClick={() => editTodo(todo)}>수정</ActiveButton>
            : <ActiveButton onClick={() => saveTodo(todo)}>등록</ActiveButton>
          }

        </InputButtonForm>
      </Popup>
    </Wrapper>
  )
}

export default NewPopup