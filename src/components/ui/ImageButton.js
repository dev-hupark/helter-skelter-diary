import styled from '@emotion/styled'
import Image from 'next/image'

const Button = styled.button`
  border: 0;
  padding: 5px;
  background: transparent;
  width: 30px;
  height: 30px;
  
  img {
    width: 100%;
    height: 100%;
  }
`

const ImageButton = (props) => {
  const { onClick, param } = props;

  return (
  <Button onClick={onClick ? () => onClick(param) : undefined}>
    <Image src={props.src} alt="button"/>
  </Button>
  )
}

export default ImageButton
