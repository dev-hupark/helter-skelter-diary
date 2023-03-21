import styled from '@emotion/styled'

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

const ActiveButton = (props) => {
  const { onClick, param } = props;

  return (
    <Active onClick={onClick ? () => onClick(param) : undefined}>
      {props.children}
    </Active>
  )
}

const InActiveButton = (props) => {
  const { onClick, param } = props;

  return (
    <InActive onClick={onClick ? () => onClick(param) : undefined}>
      {props.children}
    </InActive>
  )
}

const CanCelButton = (props) => {
  const { onClick, param } = props;

  return (
    <Cancel onClick={onClick ? () => onClick(param) : undefined}>
      {props.children}
    </Cancel>
  )
}


export {
  ActiveButton,
  InActiveButton,
  CanCelButton,
}
