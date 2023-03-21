import styled from '@emotion/styled'
import Image from 'next/image'
import NewButtonImg from 'assets/buttons/new_white.png'

const Button = styled.button`
  border: 0;
  padding: 10px;
  background: transparent;
  width: 50px;
  height: 50px;
  
  img {
    width: 100%;
    height: 100%;
  }
`

const NewButton = (props) => {
  const { onClick, param } = props;

  return (
    <Button onClick={() => onClick(param)}>
      <Image src={NewButtonImg} alt="new button"/>
    </Button>
  )
}

export default NewButton
