import styled from '@emotion/styled'
import Image from 'next/image'
import NewButtonImg from 'assets/buttons/new_white.png'
import PropTypes from 'prop-types'

const Button = styled.button`
  border: 0;
  border-radius: 25px;
  padding: 10px;
  background: #F15F5F;
  width: 50px;
  height: 50px;
  position: fixed;
  bottom: 20px;
  right: 20px;
  img {
    width: 100%;
    height: 100%;
  }
`

const NewTodoButton = (props) => {
  const { onClick, param } = props

  return (
    <Button onClick={() => onClick(param)}>
      <Image src={NewButtonImg} alt="new button"/>
    </Button>
  )
}

NewTodoButton.propTypes = {
  onClick: PropTypes.func,
  param: PropTypes.object,
}

export default NewTodoButton
