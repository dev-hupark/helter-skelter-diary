import styled from '@emotion/styled'
import Link from 'next/link'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const Index = () => {
  return (
    <Wrapper>
      <h1>Main 화면 pr test</h1>
      <Link href="/todo">할 일 목록 보러 가기</Link>
    </Wrapper>
  )
}

export default Index