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
      <Link href="/todo">할일</Link>
      <Link href="/schedule">일정</Link>
    </Wrapper>
  )
}

export default Index