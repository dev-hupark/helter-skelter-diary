import styled from '@emotion/styled'
import PropTypes from 'prop-types'

const Button = styled.button`
  border-radius: 5px;
  width: 100px;
  height: 35px;
  padding: 5px 10px;
  color: #fff;
  background: #fff;
`

const Active = styled(Button)`
  border: 1px solid #6799FF;
  background: #6799FF;
`

const InActive = styled(Button)`
  border: 1px solid #999999;
  color: #999999;
`

const Cancel = styled(Button)`
  border: 1px solid #FF3131;
  color: #FF3131;
`

const TextButton = (props) => {
  const { onClick, param, kind } = props

  switch (kind) {
    case 'inActive':
      return (
        <InActive onClick={onClick ? () => onClick(param) : undefined}>
          {props.children}
        </InActive>
      )
    case 'cancel':
      return (
        <Cancel onClick={onClick ? () => onClick(param) : undefined}>
          {props.children}
        </Cancel>
      )
    default:
      return(
        <Active onClick={onClick ? () => onClick(param) : undefined}>
          {props.children}
        </Active>
      )
  }
}

TextButton.propTypes = {
  onClick: PropTypes.func,
  param: PropTypes.object,
  kind: PropTypes.string,
  children: PropTypes.node,
}

export default TextButton
