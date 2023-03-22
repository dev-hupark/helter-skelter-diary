import Container from 'components/layout/Container'
import { signOut, useSession } from '/lib/auth/login'
import styled from '@emotion/styled'
import Link from 'next/link'

const Wrapper = styled.div`
  display: flex;
  
  button {
    margin-left: auto;
  }
`
const Header = () => {
  const session = useSession()

  return (
    <Container>
      <Wrapper>
        <h1>Header</h1>
        {session === null ?
          <button>
            <Link href="/signin">
              로그인
            </Link>
          </button>
          : <button onClick={signOut}>logout</button>}
      </Wrapper>
    </Container>
  )
}

export default Header
