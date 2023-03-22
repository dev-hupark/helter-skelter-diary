import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { insertTodo, updateTodo } from 'data/todos'
import Close from 'assets/buttons/close.png'
import ImageButton from 'components/ui/ImageButton'
import TextButton from 'components/ui/TextButton'

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

const FormPopup = ({ closePopup, refreshTodos, currentTodo }) => {
  const [ todo, setTodo ] = useState(currentTodo)

  const updateTodoObj = (name, value) => {
    setTodo(prevState => ({ ...prevState, [name]: value }))
  }

  const saveTodo = async (todo) => {
    const status = await insertTodo(todo)
    switch (status){
      case 201:
        refreshTodos()
        closePopup(true, '일정 등록이 완료 되었습니다.')
        break
    }
  }

  const editTodo = async (todo) => {
    const status = await updateTodo(todo)
    switch (status){
      case 204:
        refreshTodos()
        closePopup(true, '일정 수정이 완료 되었습니다.')
        break
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
            <TextButton onClick={() => editTodo(todo)}>수정</TextButton>
            : <TextButton onClick={() => saveTodo(todo)}>등록</TextButton>
          }
        </InputButtonForm>
      </Popup>
    </Wrapper>
  )
}

FormPopup.propTypes = {
  closePopup: PropTypes.func,
  refreshTodos: PropTypes.func,
  currentTodo: PropTypes.object,
}

export default FormPopup