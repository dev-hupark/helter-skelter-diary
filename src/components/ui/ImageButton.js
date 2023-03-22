import styled from '@emotion/styled'
import Image from 'next/image'
import PropTypes from 'prop-types'

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
  const { onClick, param, src } = props

  return (
    <Button onClick={onClick ? () => onClick(param) : undefined}>
      <Image src={src} alt="button"/>
    </Button>
  )
}

ImageButton.propTypes = {
  onClick: PropTypes.func,
  param: PropTypes.object,
  src: PropTypes.object,
}

export default ImageButton
